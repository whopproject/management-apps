<?php

namespace App\Http\Controllers\Api\Transaksi;

use App\Http\Controllers\Controller;
use App\Models\Master\MasterKategoriProduk;
use App\Models\Master\MasterProduk;
use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    public function index()
    {
        $paginate = request('paginate', 8);
        $search_value = request('q', '');
        $id_kategori = request('kategori');
        $produk = MasterProduk::with('dataKategoriProduk', 'dataDiskon')
            ->orderBy('created_at', 'desc')
            ->when($id_kategori, function ($query) use ($id_kategori) {
                $query->where('id_kategori', $id_kategori);
            })
            ->search(trim($search_value))
            ->paginate($paginate);
        return response(json_encode($produk), 200);
    }

    public function kategori()
    {
        $data = MasterKategoriProduk::get();
        return response(json_encode($data), 200);
    }
}
