<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'name' => 'ADMIN',
            'description' => 'Admin'
        ]);

        DB::table('roles')->insert([
            'name' => 'CLIENT',
            'description' => 'Client'
        ]);
    }
}
