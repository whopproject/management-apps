<?php

namespace App\Http\Controllers\Api\Transaksi;

use App\Http\Controllers\Controller;
use App\Models\Transaksi\TransaksiItem;
use Illuminate\Http\Request;

class TransaksiItemController extends Controller
{
    public function index()
    {
        $paginate = request('paginate', 8);
        $search_value = request('q', '');
        $formdate = request('daritanggal', '');
        $formke = request('ketanggal', '');
        $transaksi = TransaksiItem::select('transaksi_transaksi_item.*', 'transaksi_transaksi.tanggal as tanggal', 'transaksi_transaksi.status as status', 'transaksi_transaksi.no_invoice as no_invoice')
            ->with('dataProduk', 'dataDiskon')
            ->leftJoin('transaksi_transaksi', 'transaksi_transaksi.id', '=', 'transaksi_transaksi_item.id_transaksi')
            ->when($formdate && $formke, function ($q) use ($formdate, $formke) {
                $q->whereBetween('tanggal', [$formdate, $formke]);
            })
            ->orderBy('tanggal', 'desc')
            ->search(trim($search_value))
            ->paginate($paginate);
        return response(json_encode($transaksi), 200);
    }

    public function show($id_transaksi_item)
    {
        $transaksi = TransaksiItem::with('dataTransaksi', 'dataProduk.dataKategoriProduk', 'dataDiskon')->findOrFail($id_transaksi_item);
        return response(json_encode($transaksi), 200);
    }
}
