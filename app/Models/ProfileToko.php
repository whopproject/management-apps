<?php

namespace App\Models;

use App\Traits\HashId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileToko extends Model
{
    use HasFactory;
    use HashId;

    protected $table = 'profile_toko';
    protected $fillable = ['nama', 'logo', 'alamat'];
    protected $primaryKey = 'id';
}
