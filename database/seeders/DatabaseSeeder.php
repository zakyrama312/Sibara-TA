<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Zaky Ramadhan',
            'username' => 'zakyrama',
            'password' => bcrypt('zakyrama312'),
            'role' => 'admin',
            'prodi_id' => 1,
        ]);
    }
}
