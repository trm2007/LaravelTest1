<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            "name" => "admin@test.loc",
            "email" => "admin@test.loc",
            "password" => Hash::make("password")
        ]);
        User::factory(15)->create();
//        for($i=1;$i<=14;$i++)
//        {
//            $User = new User([
//                "name" => "Сотрудник" . $i,
//                "email" => "mail" . $i . "@test.loc",
//                "password" => Hash::make("password" . $i)
//            ]);
//            //User::create($User);
//            $User->save();
//        }
    }
}
