<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'id' => '1',
            'name' => 'Jane',
            'email' => 'jane@mail.com',
            'password' => bcrypt('password')
        ]);

        DB::table('users')->insert([
            'id' => '2',
            'name' => 'Danny',
            'email' => 'danny@mail.com',
            'password' => bcrypt('password')
        ]);

        DB::table('users')->insert([
            'id' => '3',
            'name' => 'Nivi',
            'email' => 'nivi@mail.com',
            'password' => bcrypt('password')
        ]);
    }
}
