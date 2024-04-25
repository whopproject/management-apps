<?php

namespace App\Models\Transaksi;

use App\Models\Master\MasterDiskon;
use App\Models\Master\MasterProduk;
use App\Models\Master\Produk;
use App\Traits\HashId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiItem extends Model
{
    use HasFactory;
    use HashId;

    protected $table = 'transaksi_transaksi_item';
    protected $fillable = ['id_transaksi', 'id_produk', 'qty', 'subtotal', 'id_diskon', 'harga_satuan', 'potongan_diskon'];
    protected $primaryKey = 'id';

    public function dataTransaksi()
    {
        return $this->belongsTo(Transaksi::class, 'id_transaksi', 'id');
    }

    public function dataProduk()
    {
        return $this->belongsTo(MasterProduk::class, 'id_produk', 'id');
    }

    public function dataDiskon()
    {
        return $this->belongsTo(MasterDiskon::class, 'id_diskon', 'id');
    }

    public function scopeSearch($query, $term)
    {
        $term = "%$term%";

        $query->where(function ($query) use ($term) {
            $query->whereHas('dataProduk', function ($q) use ($term) {
                $q->where('nama', 'like', $term);
            })->orWhereHas('dataTransaksi', function ($w) use ($term) {
                $w->where('no_invoice', 'like', $term);
            });
        });
    }
}
