<?php

namespace App\Http\Controllers\Api\Transaksi;

use App\Http\Controllers\Controller;
use App\Models\Master\MasterDiskon;
use App\Models\Master\MasterKategoriProduk;
use App\Models\Master\MasterProduk;
use App\Models\Transaksi\DiskonTransaksi;
use App\Models\Transaksi\Transaksi;
use App\Models\Transaksi\TransaksiItem;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    public function index()
    {
        $paginate = request('paginate', 8);
        $search_value = request('q', '');
        $id_kategori = request('kategori');
        $produk = MasterProduk::with('dataKategoriProduk')
            ->where('stok', '>', 0)
            ->with('dataDiskon', function ($q) {
                $q->where('status', 'Published')
                    ->where('jenis', 'Produk')
                    ->where('tanggal_selesai', '>=', Carbon::now()->format('Y-m-d'));
            })
            ->orderBy('created_at', 'desc')
            ->when($id_kategori, function ($query) use ($id_kategori) {
                $query->where('id_kategori', $id_kategori);
            })
            ->search(trim($search_value))
            ->paginate($paginate);
        return response(json_encode($produk), 200);
    }

    public function create()
    {
        $kategori = MasterKategoriProduk::get();
        $diskon = MasterDiskon::where('status', 'Published')
            ->where('tanggal_selesai', '>=', Carbon::now()->format('Y-m-d'))
            ->where('jenis', 'Transaksi')
            ->get();
        return response(compact('kategori', 'diskon'), 200);
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $cart = $request->cart;
            $diskon = $request->diskon;
            $total_harga = 0;
            $total_item = 0;
            $total_diskon = 0;

            $newtransaksi = new Transaksi();
            $newtransaksi->no_invoice = date('Y-m-d-His') . '-' . substr(str_shuffle(str_repeat("0123456789ABCDEFGHIJKLMNOPQRSTVWXYZ", 4)), 0, 4);;
            $newtransaksi->status = 'Selesai';
            $newtransaksi->tanggal = Carbon::now();
            $newtransaksi->total_harga = $total_harga;
            $newtransaksi->total_item = $total_item;
            $newtransaksi->pembayaran = 0;
            $newtransaksi->invoice = 'Ada';
            $newtransaksi->save();

            foreach ($cart as $keranjang) {
                $newtransaksiitem = new TransaksiItem();
                $newtransaksiitem->id_transaksi = $newtransaksi->id;
                $newtransaksiitem->id_produk = $keranjang['id'];
                $newtransaksiitem->qty = $keranjang['qty'];
                if ($keranjang['data_diskon'] !== null) {
                    $newtransaksiitem->id_diskon = $keranjang['data_diskon']['id'];
                }
                $newtransaksiitem->subtotal = $keranjang['harga'];
                $newtransaksiitem->save();

                $masterproduk = MasterProduk::find($keranjang['id']);
                $masterproduk->stok = $masterproduk->stok - $keranjang['qty'];
                $masterproduk->save();

                $total_harga = $total_harga += $keranjang['harga'];
                $total_item = $total_item += $keranjang['qty'];
            }

            if (isset($diskon)) {
                foreach ($diskon as $diskontransaksi) {
                    $newdiskontransaksi = new DiskonTransaksi();
                    $newdiskontransaksi->id_transaksi = $newtransaksi->id;
                    $newdiskontransaksi->id_diskon = $diskontransaksi['id'];
                    $newdiskontransaksi->save();

                    $total_diskon = $total_diskon += $diskontransaksi['potongan_harga'];
                }
            }

            $newtransaksi->total_harga = $total_harga;
            $newtransaksi->total_item = $total_item;
            $newtransaksi->pembayaran = $total_harga - $total_diskon;

            $data = [
                [
                    'item' => $cart,
                    'transaksi' => $newtransaksi,
                    'diskon' => $total_diskon
                ]
            ];

            $pdf = PDF::loadview('invoice', ['data' => $data]);
            $filename = $newtransaksi->no_invoice . '-' . 'invoice' . '.pdf';
            Storage::put('public/Transaksi/Invoice/' . $filename, $pdf->download()->getOriginalContent());

            $filepath = url('/') . '/storage/Transaksi/Invoice/' . $filename;

            $newtransaksi->invoice = $filepath;
            $newtransaksi->save();

            DB::commit();
            return response()->json(['invoice' => $newtransaksi->invoice], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }
}
