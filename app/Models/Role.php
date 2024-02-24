<?php

namespace App\Models;

use App\Traits\HashId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    use HashId;

    protected $table = 'role';
    protected $fillable = ['nama'];
    protected $primaryKey = 'id';

    public function dataUser()
    {
        return $this->hasMany(User::class, 'id_role', 'id');
    }
}
