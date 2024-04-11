<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\Master\MasterDiskonController;
use App\Http\Controllers\Api\Master\MasterKategoriProdukController;
use App\Http\Controllers\Api\Master\MasterProdukController;
use App\Http\Controllers\Api\Transaksi\TransaksiController;
use App\Http\Controllers\Api\Transaksi\TransaksiPembelianController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', [AuthController::class, 'login']);

Route::middleware(('jwt'))->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::group(['prefix' => 'data-master'], function () {
        Route::group(['prefix' => 'kategori'], function () {
            Route::get('/', [MasterKategoriProdukController::class, 'index']);
            Route::post('/store', [MasterKategoriProdukController::class, 'store']);
            Route::get('/edit/{id}', [MasterKategoriProdukController::class, 'edit']);
            Route::post('/update', [MasterKategoriProdukController::class, 'update']);
            Route::delete('/delete/{id}', [MasterKategoriProdukController::class, 'delete']);
        });

        Route::group(['prefix' => 'produk'], function () {
            Route::get('/', [MasterProdukController::class, 'index']);
            Route::get('/create', [MasterProdukController::class, 'create']);
            // Route::get('/test', [MasterProdukController::class, 'test']);
            Route::post('/store', [MasterProdukController::class, 'store']);
            Route::get('/edit/{id}', [MasterProdukController::class, 'edit']);
            Route::post('/update', [MasterProdukController::class, 'update']);
            Route::delete('/delete/{id}', [MasterProdukController::class, 'delete']);
        });

        Route::group(['prefix' => 'diskon'], function () {
            Route::get('/', [MasterDiskonController::class, 'index']);
            Route::post('/store', [MasterDiskonController::class, 'store']);
            Route::get('/edit/{id}', [MasterDiskonController::class, 'edit']);
            Route::post('/update', [MasterDiskonController::class, 'update']);
            Route::delete('/delete/{id}', [MasterDiskonController::class, 'destroy']);
        });
    });

    Route::group(['prefix' => 'transaksi'], function () {
        Route::get('/produk', [TransaksiController::class, 'index']);
        Route::get('/kategori', [TransaksiController::class, 'kategori']);

        Route::group(['prefix' => 'pembelian'], function () {
            Route::get('/', [TransaksiPembelianController::class, 'index']);
            Route::post('/store', [TransaksiPembelianController::class, 'store']);
            Route::get('/edit/{id}', [TransaksiPembelianController::class, 'edit']);
            Route::post('/update', [TransaksiPembelianController::class, 'update']);
            Route::delete('/delete/{id}', [TransaksiPembelianController::class, 'delete']);
        });
    });
});
