<?php

namespace App\Models\Master;

use App\Models\Transaksi\Transaksi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use App\Traits\HashId;

class Diskon extends Model
{
    use HasFactory;
    // use Sluggable;
    use HashId;

    protected $table = 'master_diskon';
    protected $fillable = ['nama', 'jenis', 'tanggal_mulai', 'tanggal_selesai', 'potongan_harga', 'status'];
    protected $primaryKey = 'id';

    public function scopeSearch($query, $term)
    {
        $term = "%$term%";

        $query->where(function ($query) use ($term) {
            $query->where('nama', 'like', $term);
        });
    }

    public function dataTransaksi()
    {
        return $this->hasMany(Transaksi::class, 'id_dikon', 'id');
    }

    public function dataProduk()
    {
        return $this->hasMany(Produk::class, 'id_dikon', 'id');
    }

    // public function sluggable(): array
    // {
    //     return [
    //         'slug' => [
    //             'source' => 'judul',
    //             'onUpdate' => true,
    //         ]
    //     ];
    // }
}
