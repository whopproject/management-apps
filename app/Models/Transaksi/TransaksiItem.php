<?php

namespace App\Models\Transaksi;

use App\Models\Master\Produk;
use App\Traits\HashId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiItem extends Model
{
    use HasFactory;
    use HashId;

    protected $table = 'transaksi_transaksi_item';
    protected $fillable = ['id_transaksi', 'id_produk', 'qty', 'subtotal'];
    protected $primaryKey = 'id';

    public function dataTransaksi()
    {
        return $this->belongsTo(Transaksi::class, 'id_transaksi', 'id');
    }

    public function dataProduk()
    {
        return $this->belongsTo(Produk::class, 'id_produk', 'id');
    }
}
