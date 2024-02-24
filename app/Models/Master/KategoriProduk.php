<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use App\Traits\HashId;

class KategoriProduk extends Model
{
    use HasFactory;
    use Sluggable;
    use HashId;

    protected $table = 'master_kategori';
    protected $fillable = ['nama'];
    protected $primaryKey = 'id';

    public function scopeSearch($query, $term)
    {
        $term = "%$term%";

        $query->where(function ($query) use ($term) {
            $query->where('nama', 'like', $term);
        });
    }

    public function dataProduk()
    {
        return $this->hasMany(Produk::class, 'id_kategori', 'id');
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
