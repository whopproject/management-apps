<?php

namespace App\Http\Controllers\Api\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\MasterDiskon;
use App\Models\Master\MasterKategoriProduk;
use App\Models\Master\MasterProduk;
use App\Models\Master\Produk;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Spatie\Image\Image;

class MasterProdukController extends Controller
{
    public function index()
    {
        $paginate = request('paginate', 10);
        $search_value = request('q', '');
        $id_kategori = request('kategori');
        $diskon = request('diskon', '');
        $stok = request('stok', '');
        $produk = MasterProduk::with('dataKategoriProduk', 'dataDiskon')
            ->orderBy('created_at', 'desc')
            ->when($id_kategori, function ($query) use ($id_kategori) {
                $query->where('id_kategori', $id_kategori);
            })
            ->when($diskon == 'Aktif', function ($q) {
                $q->whereHas('dataDiskon', function ($q) {
                    $q->where('status', 'Published')
                        ->where('jenis', 'Produk')
                        ->where('tanggal_selesai', '>=', Carbon::now());
                });
            })
            ->when($diskon == 'Tidak Aktif', function ($q) {
                $q->doesntHave('dataDiskon', 'or')->orWhereHas('dataDiskon', function ($q) {
                    $q->where('jenis', 'Produk')->where(function ($w) {
                        $w->where('status', '!=', 'Published')
                            ->orWhere('tanggal_selesai', '<', Carbon::now());
                    });
                });
            })
            ->search(trim($search_value));

        if ($stok !== '') {
            if (str_contains($stok, '-')) {
                $parsestok = explode('-', $stok);
                $produk = $produk->whereBetween('stok', $parsestok);
            } else {
                $produk = $produk->where('stok', '>=', $stok);
            }
        }

        $produk = $produk->paginate($paginate);
        return response(json_encode($produk), 200);
    }
    public function create()
    {
        $kategori = MasterKategoriProduk::get();
        $diskon = MasterDiskon::where('status', 'Published')
            ->where('tanggal_selesai', '>', Carbon::now())
            ->where('jenis', 'Produk')
            ->get();
        return response()->json(compact('kategori', 'diskon'), 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
            'harga' => 'required',
            'gambar' => 'required|mimes:png,jpg,jpeg|max:5000',
            'stok' => 'required',
            'id_kategori' => 'required',
            'id_diskon' => 'nullable'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        try {
            DB::beginTransaction();

            $cek = MasterProduk::where('nama', $request->nama)
                ->first();

            if (isset($cek)) {
                return response()->json(['error' => 'Data Sudah Ada'], 422);
            }

            $new = new MasterProduk();
            $new->nama = $request->nama;
            $new->harga = $request->harga;

            $file = $request->file('gambar');
            Image::load($file)->optimize()->save();
            $filename = date('Y-m-d_His') . '_' . str_replace(' ', '_', $file->getClientOriginalName());
            $file->storeAs('public/Master/Produk/', $filename);
            $urlname = url('/') .  '/storage/Master/Produk/' . $filename;

            $new->gambar = $urlname;
            $new->stok = $request->stok;
            $new->id_kategori = $request->id_kategori;
            $new->id_diskon = $request->id_diskon;
            $new->save();

            DB::commit();
            return response()->json(['success' => 'Berhasil Menambahkan Data'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    // public function test(Request $request)
    // {
    //     $master = MasterProduk::get();
    //     $data = $request->stok;
    //     $filename = explode('-', $data);
    //     $master = $master->whereBetween('stok', $filename);
    //     dd($master);
    // }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
            'harga' => 'required',
            'stok' => 'required',
            'id_kategori' => 'required',
            'id_diskon' => 'nullable'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        try {
            DB::beginTransaction();

            if ($request->gambar !== null) {
                $validator = Validator::make($request->all(), [
                    'gambar' => 'required|mimes:png,jpg,jpeg|max:5000',
                ]);

                if ($validator->fails()) {
                    return response()->json(['error' => $validator->errors()->first()], 422);
                }
            }

            $cek = MasterProduk::where('id', '!=', $request->id)
                ->where('nama', $request->nama)
                ->first();

            if (isset($cek)) {
                return response()->json(['error' => 'Data Sudah Ada'], 422);
            }

            $data = MasterProduk::findOrFail($request->id);

            $data->nama = $request->nama;
            $data->harga = $request->harga;

            if ($request->gambar !== null) {
                $oldfile = explode('/', $data->gambar);
                Storage::delete('public/Master/Produk/' . end($oldfile));
                $file = $request->file('gambar');
                Image::load($file)->optimize()->save();
                $filename = date('Y-m-d_His') . '_' . str_replace(' ', '_', $file->getClientOriginalName());
                $file->storeAs('public/Master/Produk/', $filename);
                $urlname = url('/') . '/storage/Master/Produk/' . $filename;
                $data->gambar = $urlname;
            }

            $data->stok = $request->stok;
            $data->id_kategori = $request->id_kategori;
            $data->id_diskon = $request->id_diskon;
            $data->save();

            DB::commit();
            return response()->json(['success' => 'Berhasil Mengupdate']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    public function edit($id)
    {
        $data = MasterProduk::findOrFail($id);
        return response(json_encode($data), 200);
    }

    public function delete($id)
    {
        DB::beginTransaction();
        try {
            $data = MasterProduk::findOrFail($id);
            $oldfile = explode('/', $data->gambar);
            Storage::delete('public/Master/Produk/' . end($oldfile));
            $data->delete();
            DB::commit();
            return response()->json(['success' => 'Berhasil Menghapus Data'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            if ($e->getCode() == "23000") {
                return response()->json(['error' => 'Data Sedang Digunakan'], 422);
            } else {
                return response()->json(['error' => $e->getMessage()], 422);
            }
        }
    }
}
