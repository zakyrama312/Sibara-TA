<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class Users extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Zaky Ramadhan',
            'username' => 'zakyrama',
            'password' => bcrypt('zakyrama312'),
            'role' => 'admin',
            'prodi_id' => 1,
        ]);
    }
}
