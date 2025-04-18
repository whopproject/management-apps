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
        $startday = Carbon::now()->startOfDay();
        $endday = Carbon::now()->endOfDay();
        $transaksiday = Transaksi::whereBetween('tanggal', [$startday, $endday])->sum('pembayaran');
        $pembelianday = TransaksiPembelian::whereBetween('tanggal', [$startday, $endday])->sum('total_harga');
        $produkterjualday = TransaksiItem::distinct('id_produk')->whereHas('dataTransaksi', function ($q) use ($startday, $endday) {
            $q->whereBetween('tanggal', [$startday, $endday]);
        })->count();

        return response()->json(compact('transaksiday', 'pembelianday', 'produkterjualday'), 200);
    }

    public function grafik_penjualan(Request $request)
    {
        $filterbulan = $request->filterbulan;
        if ($filterbulan == '12') {
            $label = Carbon::now()->firstOfMonth()->subMonth(11)->addDay(1)->monthsUntil(now());

            $pemasukankotor = Transaksi::whereDate('tanggal', '>', Carbon::now()->subMonth(12))
                ->sum('pembayaran');

            $pembelian = TransaksiPembelian::whereDate('tanggal', '>', Carbon::now()->subMonth(12))
                ->sum('total_harga');
            $pemasukanbersih = $pemasukankotor - $pembelian;

            $data = Transaksi::whereDate('tanggal', '>', Carbon::now()->firstOfMonth()->subMonth(12))
                ->selectRaw('year(tanggal) as tahun, month(tanggal) as month, SUM(pembayaran) as pemasukan_kotor, SUM(pembayaran) - ' . $pembelian . ' as pemasukan_bersih')
                ->groupBy('tahun', 'month')
                ->orderBy('tahun', 'desc')
                ->orderBy('month', 'desc')
                ->get();
        } else if ($filterbulan == '3') {
            $label = Carbon::now()->firstOfMonth()->subMonth(2)->addDay(1)->monthsUntil(now());
            $pembelian = TransaksiPembelian::whereDate('tanggal', '>', Carbon::now()->subMonth(3))
                ->sum('total_harga');
            $pemasukankotor = Transaksi::whereDate('tanggal', '>', Carbon::now()->subMonth(3))
                ->sum('pembayaran');
            $pemasukanbersih = $pemasukankotor - $pembelian;
            $data = Transaksi::whereDate('tanggal', '>', Carbon::now()->firstOfMonth()->subMonth(3))
                ->selectRaw('year(tanggal) as tahun, month(tanggal) as month, SUM(pembayaran) as pemasukan_kotor, SUM(pembayaran) - ' . $pembelian . ' as pemasukan_bersih')
                ->groupBy('tahun', 'month')
                ->orderBy('tahun', 'desc')
                ->orderBy('month', 'desc')
                ->get();
        } else if ($filterbulan == '1') {
            $start = Carbon::parse(Carbon::now())->firstOfMonth()->subSecond(1)->addDay(1);
            $end = Carbon::parse(Carbon::now())->endOfMonth();

            while ($start->lte($end)) {
                $label[] = $start->copy();
                $start->addDay();
            }

            $pemasukankotor = Transaksi::whereMonth('tanggal', Carbon::now()->month)
                ->sum('pembayaran');

            $pembelian = TransaksiPembelian::whereMonth('tanggal', Carbon::now()->month)
                ->sum('total_harga');
            $pemasukanbersih = $pemasukankotor - $pembelian;

            $data = Transaksi::whereMonth('tanggal', Carbon::now()->month)
                ->selectRaw('Date(tanggal) hari, SUM(pembayaran) as pemasukan_kotor, SUM(pembayaran) - ' . $pembelian . ' as pemasukan_bersih')
                ->groupBy('hari')
                ->orderBy('hari', 'desc')
                ->get();
        } else if ($filterbulan == '15') {
            $label = Carbon::now()->startOfDay()->subDay(14)->subSecond(1)->addDay(1)->daysUntil(now()->addDay(1));

            $pemasukankotor = Transaksi::whereDate('tanggal', '>', Carbon::now()->subDay(15))
                ->sum('pembayaran');

            $pembelian = TransaksiPembelian::whereDate('tanggal', '>', Carbon::now()->subDay(15))->sum('total_harga');
            $pemasukanbersih = $pemasukankotor - $pembelian;

            $data = Transaksi::whereDate('tanggal', '>', Carbon::now()->subDay(15))
                ->selectRaw('Date(tanggal) hari, SUM(pembayaran) as pemasukan_kotor, SUM(pembayaran) - ' . $pembelian . ' as pemasukan_bersih')
                ->groupBy('hari')
                ->orderBy('hari', 'desc')
                ->get();
        } else if ($filterbulan == '7') {
            $label = Carbon::now()->startOfDay()->subDay(6)->subSecond(1)->addDay(1)->daysUntil(now()->addDay(1));

            $pemasukankotor = Transaksi::whereDate('tanggal', '>', Carbon::now()->subDay(7))
                ->sum('pembayaran');

            $pembelian = TransaksiPembelian::whereDate('tanggal', '>', Carbon::now()->subDay(7))->sum('total_harga');
            $pemasukanbersih = $pemasukankotor - $pembelian;

            $data = Transaksi::whereDate('tanggal', '>', Carbon::now()->subDay(7))
                ->selectRaw('Date(tanggal) hari, SUM(pembayaran) as pemasukan_kotor, SUM(pembayaran) - ' . $pembelian . ' as pemasukan_bersih')
                ->groupBy('hari')
                ->orderBy('hari', 'desc')
                ->get();
        }

        return response()->json(compact('data', 'pemasukanbersih', 'pemasukankotor', 'label'), 200);
    }

    public function produk_terlaris(Request $request)
    {
        $filterbulan = $request->filterbulan;
        if ($filterbulan == '12') {
            $data = TransaksiItem::select('master_produk.nama as nama_produk')
                ->whereHas('dataTransaksi', function ($q) {
                    $q->whereDate('tanggal', '>', Carbon::now()->firstOfMonth()->subMonth(12));
                })
                ->selectRaw('COUNT(qty) as total_terjual')
                ->leftJoin('master_produk', 'master_produk.id', '=', 'transaksi_transaksi_item.id_produk')
                ->groupBy('id_produk')
                ->orderBy('total_terjual', 'desc')
                ->limit(15)
                ->get();
        } else if ($filterbulan == '3') {
            $data = TransaksiItem::select('master_produk.nama as nama_produk')
                ->whereHas('dataTransaksi', function ($q) {
                    $q->whereDate('tanggal', '>', Carbon::now()->firstOfMonth()->subMonth(3));
                })
                ->selectRaw('COUNT(qty) as total_terjual')
                ->leftJoin('master_produk', 'master_produk.id', '=', 'transaksi_transaksi_item.id_produk')
                ->groupBy('id_produk')
                ->orderBy('total_terjual', 'desc')
                ->limit(15)
                ->get();
        } else if ($filterbulan == '1') {
            $data = TransaksiItem::select('master_produk.nama as nama_produk')
                ->whereHas('dataTransaksi', function ($q) {
                    $q->whereMonth('tanggal', Carbon::now()->month);
                })
                ->selectRaw('COUNT(qty) as total_terjual')
                ->leftJoin('master_produk', 'master_produk.id', '=', 'transaksi_transaksi_item.id_produk')
                ->groupBy('id_produk')
                ->orderBy('total_terjual', 'desc')
                ->limit(15)
                ->get();
        } else if ($filterbulan == '15') {
            $data = TransaksiItem::select('master_produk.nama as nama_produk')
                ->whereHas('dataTransaksi', function ($q) {
                    $q->whereDate('tanggal', '>', Carbon::now()->subDay(15));
                })
                ->selectRaw('COUNT(qty) as total_terjual')
                ->leftJoin('master_produk', 'master_produk.id', '=', 'transaksi_transaksi_item.id_produk')
                ->groupBy('id_produk')
                ->orderBy('total_terjual', 'desc')
                ->limit(15)
                ->get();
        } else if ($filterbulan == '7') {
            $data = TransaksiItem::select('master_produk.nama as nama_produk')
                ->whereHas('dataTransaksi', function ($q) {
                    $q->whereDate('tanggal', '>', Carbon::now()->subDay(7));
                })
                ->selectRaw('COUNT(qty) as total_terjual')
                ->leftJoin('master_produk', 'master_produk.id', '=', 'transaksi_transaksi_item.id_produk')
                ->groupBy('id_produk')
                ->orderBy('total_terjual', 'desc')
                ->limit(15)
                ->get();
        }

        return response($data, 200);
    }
}
