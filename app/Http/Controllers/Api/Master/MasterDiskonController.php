<?php

namespace App\Http\Controllers\Api\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\Diskon;
use App\Models\Master\MasterDiskon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class MasterDiskonController extends Controller
{
    public function index_draft()
    {
        $paginate = request('paginate', 10);
        $search_value = request('q', '');
        $diskon = MasterDiskon::with('dataProduk')
            ->where('status', 'Draft')
            ->orderBy('created_at', 'desc')
            ->search(trim($search_value))
            ->paginate($paginate);
        return response()->json(['data' => $diskon], 200);
    }

    public function index_archived()
    {
        $paginate = request('paginate', 10);
        $search_value = request('q', '');
        $diskon = MasterDiskon::with('dataProduk')
            ->where('status', 'Archived')
            ->orderBy('created_at', 'desc')
            ->search(trim($search_value))
            ->paginate($paginate);
        return response()->json(['data' => $diskon], 200);
    }

    public function index_published()
    {
        $paginate = request('paginate', 10);
        $search_value = request('q', '');
        $diskon = MasterDiskon::with('dataProduk')
            ->where('status', 'Published')
            ->orderBy('created_at', 'desc')
            ->search(trim($search_value))
            ->paginate($paginate);
        return response()->json(['data' => $diskon], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'jenis' => 'required',
            'potongan_harga' => 'required|numeric',
            'tanggal_mulai' => 'required',
            'tanggal_selesai' => 'required',
            'status' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        try {
            DB::beginTransaction();

            $masterdiskon = new MasterDiskon();
            $masterdiskon->nama = $request->nama;
            $masterdiskon->jenis = $request->jenis;
            $masterdiskon->potongan_harga = $request->potongan_harga;
            $masterdiskon->tanggal_mulai = $request->tanggal_mulai;
            $masterdiskon->tanggal_selesai = $request->tanggal_selesai;
            $masterdiskon->status = $request->status;
            $masterdiskon->save();

            DB::commit();
            return response()->json(['success' => 'Berhasil Menambahkan Data Diskon'], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'jenis' => 'required',
            'potongan_harga' => 'required|numeric',
            'tanggal_mulai' => 'required',
            'tanggal_selesai' => 'required',
            'status' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        try {
            DB::beginTransaction();

            $masterdiskon = MasterDiskon::findOrFail($id);
            $masterdiskon->nama = $request->nama;
            $masterdiskon->jenis = $request->jenis;
            $masterdiskon->potongan_harga = $request->potongan_harga;
            $masterdiskon->tanggal_mulai = $request->tanggal_mulai;
            $masterdiskon->tanggal_selesai = $request->tanggal_selesai;
            $masterdiskon->status = $request->status;
            $masterdiskon->save();

            DB::commit();
            return response()->json(['success' => 'Berhasil Menambahkan Data Diskon'], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function destroy(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $diskon = MasterDiskon::findOrFail($id);
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
