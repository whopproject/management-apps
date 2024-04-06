<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Master\MasterDiskonController;
use App\Http\Controllers\Api\Master\MasterKategoriProdukController;
use App\Http\Controllers\Api\Master\MasterProdukController;
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
            Route::get('/test/{id}', [MasterProdukController::class, 'test']);
            Route::post('/store', [MasterProdukController::class, 'store']);
            Route::get('/edit/{id}', [MasterProdukController::class, 'edit']);
            Route::post('/update', [MasterProdukController::class, 'update']);
            Route::delete('/delete/{id}', [MasterProdukController::class, 'delete']);
        });

        Route::group(['prefix' => 'diskon'], function () {
            Route::get('/draft', [MasterDiskonController::class, 'index_draft']);
            Route::get('/archived', [MasterDiskonController::class, 'index_archived']);
            Route::get('/published', [MasterDiskonController::class, 'index_published']);
            Route::post('/store', [MasterDiskonController::class, 'store']);
            Route::put('/update/{id}', [MasterDiskonController::class, 'update']);
            Route::delete('/delete/{id}', [MasterDiskonController::class, 'destroy']);
        });
    });
});
