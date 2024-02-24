<?php

namespace App\Models\Transaksi;

use App\Models\Master\Diskon;
use App\Traits\HashId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;
    use HashId;

    protected $table = 'transaksi_transaksi';
    protected $fillable = ['invoice', 'tanggal', 'status', 'total_item', 'total_harga', 'id_diskon'];
    protected $primaryKey = 'id';

    public function dataDiskon()
    {
        return $this->belongsTo(Diskon::class, 'id_transaksi', 'id');
    }
}
