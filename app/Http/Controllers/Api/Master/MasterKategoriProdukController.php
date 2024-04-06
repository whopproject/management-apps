<?php

namespace App\Http\Controllers\Api\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\KategoriProduk;
use App\Models\Master\MasterKategoriProduk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class MasterKategoriProdukController extends Controller
{
    public function index()
    {
        $paginate = request('paginate', 10);
        $search_value = request('q', '');
        $kategori = MasterKategoriProduk::orderBy('created_at', 'desc')
            ->search(trim($search_value))
            ->paginate($paginate);
        return response(json_encode($kategori), 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        try {
            DB::beginTransaction();

            $cek = MasterKategoriProduk::where('nama', $request->nama)
                ->first();

            if (isset($cek)) {
                return response()->json(['error' => 'Data Sudah Ada'], 422);
            }

            $new = new MasterKategoriProduk();
            $new->nama = $request->nama;
            $new->save();

            DB::commit();
            return response()->json(['success' => 'Berhasil Menambahkan Data'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        try {
            DB::beginTransaction();

            $cek = MasterKategoriProduk::where('id', '!=', $request->id)
                ->where('nama', $request->nama)
                ->first();

            if (isset($cek)) {
                return response()->json(['error' => 'Data Sudah Ada'], 422);
            }

            $data = MasterKategoriProduk::findOrFail($request->id);

            $data->nama = $request->nama;
            $data->save();

            DB::commit();
            return response()->json(['success' => 'Berhasil Mengupdate']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    public function edit($id)
    {
        $data = MasterKategoriProduk::findOrFail($id);
        return response(json_encode($data), 200);
    }

    public function delete($id)
    {
        DB::beginTransaction();
        try {
            $data = MasterKategoriProduk::findOrFail($id);
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
