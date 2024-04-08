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

    protected $casts = [
        // 'tanggal' => 'immutable_date',
        'total_item' => 'integer',
        'total_harga' => 'integer',
    ];

    public function scopeSearch($query, $term)
    {
        $term = "%$term%";

        $query->where(function ($query) use ($term) {
            $query->where('nama', 'like', $term);
        });
    }
}
