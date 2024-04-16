<?php

namespace App\Models\Master;

use App\Models\Transaksi\Transaksi;
use App\Traits\HashId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterDiskon extends Model
{
    use HasFactory;
    use HashId;

    protected $table = 'master_diskon';
    protected $fillable = ['nama', 'jenis', 'tanggal_mulai', 'tanggal_selesai', 'potongan_harga', 'status'];
    protected $primaryKey = 'id';

    protected $casts = [
        'potongan_harga' => 'integer',
    ];

    public function scopeSearch($query, $term)
    {
        $term = "%$term%";

        $query->where(function ($query) use ($term) {
            $query->where('nama', 'like', $term);
        });
    }

    public function dataDiskonTransaksi()
    {
        return $this->hasMany(Transaksi::class, 'id_diskon', 'id');
    }

    public function dataProduk()
    {
        return $this->hasMany(MasterProduk::class, 'id_diskon', 'id');
    }
}
