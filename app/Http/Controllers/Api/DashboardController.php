<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaksi\Transaksi;
use App\Models\Transaksi\TransaksiItem;
use App\Models\Transaksi\TransaksiPembelian;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $transaksiday = Transaksi::where('tanggal', Carbon::now())->count();
        $pembelianday = TransaksiPembelian::where('tanggal', Carbon::now())->count();
        $produkterjualday = TransaksiItem::distinct('id_produk')->whereHas('dataTransaksi', function ($q) {
            $q->where('tanggal', Carbon::now());
        })->count();

        return response()->json(compact('transaksiday', 'pembelianday', 'produkterjualday'), 200);
    }

    public function grafik_penjualan(Request $request)
    {
        $filterbulan = $request->filterbulan;
        if ($filterbulan == '12') {
            $data = Transaksi::select('month', 'year', 'total')
                ->whereDate('tanggal', '>=', Carbon::now()->subMonth(12))
                ->selectRaw('year(tanggal) tahun, month(tanggal) month, monthname(tanggal) as bulan, SUM(pembayaran) as total')
                ->groupBy('year', 'month')
                ->orderBy('year', 'desc')
                ->orderBy('month', 'desc')
                ->get();

            $pemasukanbersih = Transaksi::whereDate('tanggal', '>', Carbon::now()->subMonth(12))
                ->sum('pembayaran');

            $pembelian = TransaksiPembelian::whereDate('tanggal', '>=', Carbon::now()->subMonth(12))->sum('total_harga');
            $pemasukankotor = $pemasukanbersih - $pembelian;
        } else if ($filterbulan == '3') {
            $data = Transaksi::select('month', 'year', 'total')
                ->whereDate('tanggal', '>=', Carbon::now()->subMonth(3))
                ->selectRaw('year(tanggal) tahun, month(tanggal) month, monthname(tanggal) as bulan, SUM(pembayaran) as total')
                ->groupBy('year', 'month')
                ->orderBy('year', 'desc')
                ->orderBy('month', 'desc')
                ->get();

            $pemasukanbersih = Transaksi::whereDate('tanggal', '>=', Carbon::now()->subMonth(3))
                ->sum('pembayaran');

            $pembelian = TransaksiPembelian::whereDate('tanggal', '>=', Carbon::now()->subMonth(3))->sum('total_harga');
            $pemasukankotor = $pemasukanbersih - $pembelian;
        } else if ($filterbulan == '1') {
            $data = Transaksi::select('hari', 'total')
                ->whereDate('tanggal', '>=', Carbon::now()->subMonth(1))
                ->selectRaw('Date(tanggal) hari, SUM(pembayaran) as total',)
                ->groupBy('hari')
                ->orderBy('hari', 'desc')
                ->get();

            $pemasukanbersih = Transaksi::whereDate('tanggal', '>=', Carbon::now()->subMonth(1))
                ->sum('pembayaran');

            $pembelian = TransaksiPembelian::whereDate('tanggal', '>=', Carbon::now()->subMonth(1))->sum('total_harga');
            $pemasukankotor = $pemasukanbersih - $pembelian;
        } else if ($filterbulan == '7') {
            $data = Transaksi::select('hari', 'total')
                ->whereDate('tanggal', '>=', Carbon::now()->subDay(7))
                ->selectRaw('Date(tanggal) hari, SUM(pembayaran) as total')
                ->groupBy('hari')
                ->orderBy('hari', 'desc')
                ->get();

            $pemasukanbersih = Transaksi::whereDate('tanggal', '>=', Carbon::now()->subDay(7))
                ->sum('pembayaran');

            $pembelian = TransaksiPembelian::whereDate('tanggal', '>=', Carbon::now()->subDay(7))->sum('total_harga');
            $pemasukankotor = $pemasukanbersih - $pembelian;
        }

        return response()->json(compact('data', 'pemasukanbersih', 'pemasukankotor'), 200);
    }

    public function produk_terlaris(Request $request)
    {
        $filterbulan = $request->filterbulan;
        if ($filterbulan == '12') {
            $data = TransaksiItem::select('transaksi_transaksi.*', 'master_produk.nama as nama_produk', 'total_terjual')
                ->whereDate('tanggal', '>=', Carbon::now()->subMonth(12))
                ->selectRaw('COUNT(id_produk) as total_terjual')
                ->join('master_produk', 'master_produk.id', '=', 'transaksi_transaksi.id_produk')
                ->groupBy('id_produk')
                ->orderBy('total_terjual', 'desc')
                ->get();
        } else if ($filterbulan == '3') {
            $data = TransaksiItem::select('transaksi_transaksi.*', 'master_produk.nama as nama_produk', 'total_terjual')
                ->whereDate('tanggal', '>=', Carbon::now()->subMonth(3))
                ->selectRaw('COUNT(id_produk) as total_terjual')
                ->join('master_produk', 'master_produk.id', '=', 'transaksi_transaksi.id_produk')
                ->groupBy('id_produk')
                ->orderBy('total_terjual', 'desc')
                ->get();
        } else if ($filterbulan == '1') {
            $data = TransaksiItem::select('transaksi_transaksi.*', 'master_produk.nama as nama_produk', 'total_terjual')
                ->whereDate('tanggal', '>=', Carbon::now()->subMonth(3))
                ->selectRaw('COUNT(id_produk) as total_terjual')
                ->join('master_produk', 'master_produk.id', '=', 'transaksi_transaksi.id_produk')
                ->groupBy('id_produk')
                ->orderBy('total_terjual', 'desc')
                ->get();
        } else if ($filterbulan == '7') {
            $data = TransaksiItem::select('transaksi_transaksi.*', 'master_produk.nama as nama_produk', 'total_terjual')
                ->whereDate('tanggal', '>=', Carbon::now()->subDay(7))
                ->selectRaw('COUNT(id_produk) as total_terjual')
                ->join('master_produk', 'master_produk.id', '=', 'transaksi_transaksi.id_produk')
                ->groupBy('id_produk')
                ->orderBy('total_terjual', 'desc')
                ->get();
        }

        return response()->json(compact('data'), 200);
    }
}
