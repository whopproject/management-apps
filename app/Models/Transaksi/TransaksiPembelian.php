<?php

namespace App\Models\Transaksi;

use App\Traits\HashId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiPembelian extends Model
{
    use HasFactory;
    use HashId;

    protected $table = 'transaksi_pembelian';
    protected $fillable = ['nama', 'tanggal', 'jenis', 'total_item', 'total_harga'];
    protected $primaryKey = 'id';
}
