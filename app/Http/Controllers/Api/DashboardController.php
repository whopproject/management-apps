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

        $test = Carbon::now();

        return response()->json(compact('transaksiday', 'pembelianday', 'produkterjualday', 'test'));
    }

    public function create()
    {
        $transaksiday = Transaksi::where('tanggal', Carbon::now())->count();
        $pembelianday = TransaksiPembelian::where('tanggal', Carbon::now())->count();
        $produkterjualday = TransaksiItem::distinct('id_produk')->whereHas('dataTransaksi', function ($q) {
            $q->where('tanggal', Carbon::now());
        })->count();

        return response()->json(compact('transaksiday', 'pembelianday', 'produkterjualday'));
    }
}
