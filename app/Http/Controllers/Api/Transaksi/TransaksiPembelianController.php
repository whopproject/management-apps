<?php

namespace App\Http\Controllers\Api\Transaksi;

use App\Http\Controllers\Controller;
use App\Models\Transaksi\TransaksiPembelian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class TransaksiPembelianController extends Controller
{
    public function index()
    {
        $paginate = request('paginate', 8);
        $search_value = request('q', '');
        $formdate = request('daritanggal', '');
        $formke = request('ketanggal', '');
        $jenis = request('jenis');
        $pembelian = TransaksiPembelian::orderBy('created_at', 'desc')
            ->search(trim($search_value))
            ->when($jenis, function ($query) use ($jenis) {
                $query->where('jenis', $jenis);
            })
            ->when($formdate && $formke, function ($q) use ($formdate, $formke) {
                $q->whereBetween('tanggal', [$formdate, $formke]);
            })
            ->paginate($paginate);
        return response(json_encode($pembelian), 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'jenis' => 'required',
            'total_harga' => 'required',
            'tanggal' => 'required',
            'total_item' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        try {
            DB::beginTransaction();

            $new = new TransaksiPembelian();
            $new->nama = $request->nama;
            $new->jenis = $request->jenis;
            $new->total_harga = $request->total_harga;
            $new->tanggal = $request->tanggal;
            $new->total_item = $request->total_item;
            $new->save();

            DB::commit();
            return response()->json(['success' => 'Berhasil Menambahkan Data Pembelian'], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'jenis' => 'required',
            'total_harga' => 'required',
            'tanggal' => 'required',
            'total_item' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        try {
            DB::beginTransaction();

            $data = TransaksiPembelian::findOrFail($request->id);

            $data->nama = $request->nama;
            $data->jenis = $request->jenis;
            $data->total_harga = $request->total_harga;
            $data->tanggal = $request->tanggal;
            $data->total_item = $request->total_item;
            $data->save();

            DB::commit();
            return response()->json(['success' => 'Berhasil Mengedit Data Pembelian'], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function edit($id)
    {
        $data = TransaksiPembelian::findOrFail($id);
        return response(json_encode($data), 200);
    }

    public function delete($id)
    {
        DB::beginTransaction();
        try {
            $diskon = TransaksiPembelian::findOrFail($id);
            $diskon->delete();

            DB::commit();
            return response()->json(['success' => 'Berhasil Menghapus Data Diskon'], 201);
        } catch (\Throwable $e) {
            DB::rollBack();

            if ($e->getCode() == "23000") {
                return response()->json(['error' => 'Data Sedang Digunakan'], 400);
            } else {
                return response()->json(['error' => $e->getMessage()], 400);
            }
        }
    }
}
