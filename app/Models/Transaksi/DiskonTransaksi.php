<?php

namespace App\Models\Transaksi;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HashId;

class DiskonTransaksi extends Model
{
    use HasFactory;
    use HashId;

    protected $table = 'transaksi_diskon_transaksi';
    protected $fillable = ['id_diskon', 'id_transaksi', 'potongan_diskon'];
    protected $primaryKey = 'id';

    public function dataTransaksiItem()
    {
        return $this->hasMany(TransaksiItem::class, 'id_transaksi', 'id');
    }

    public function dataDiskonTransaksi()
    {
        return $this->hasMany(DiskonTransaksi::class, 'id_transaksi', 'id');
    }
}
