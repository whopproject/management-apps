<?php

namespace App\Models\Master;

use App\Traits\HashId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class MasterProduk extends Model
{
    use HasFactory;
    use Sluggable;
    use HashId;

    protected $table = 'master_produk';
    protected $fillable = ['nama', 'harga', 'gambar', 'stok', 'id_kategori', 'id_diskon'];
    protected $primaryKey = 'id';

    protected $casts = [
        'harga' => 'integer',
        'stok' => 'integer'
    ];

    public function scopeSearch($query, $term)
    {
        $term = "%$term%";

        $query->where(function ($query) use ($term) {
            $query->where('nama', 'like', $term);
        });
    }

    public function dataKategoriProduk()
    {
        return $this->belongsTo(MasterKategoriProduk::class, 'id_kategori', 'id');
    }

    public function dataDiskon()
    {
        return $this->belongsTo(MasterDiskon::class, 'id_diskon', 'id');
    }

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'nama',
                'onUpdate' => true,
            ]
        ];
    }
}
