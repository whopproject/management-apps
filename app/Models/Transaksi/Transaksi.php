<?php

namespace App\Models\Transaksi;

use App\Models\Master\Diskon;
use App\Models\Master\MasterDiskon;
use App\Traits\HashId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;
    use HashId;

    protected $table = 'transaksi_transaksi';
    protected $fillable = ['no_invoice', 'invoice', 'tanggal', 'status', 'total_item', 'total_harga', 'pembayaran', 'id_diskon'];
    protected $primaryKey = 'id';

    public function dataTransaksiItem()
    {
        return $this->hasMany(TransaksiItem::class, 'id_transaksi', 'id');
    }

    public function dataDiskonTransaksi()
    {
        return $this->hasMany(DiskonTransaksi::class, 'id_transaksi', 'id');
    }

    public function scopeSearch($query, $term)
    {
        $term = "%$term%";

        $query->where(function ($query) use ($term) {
            $query->where('no_invoice', 'like', $term)
                ->orWhere('tanggal', 'like', $term);
        });
    }
}
