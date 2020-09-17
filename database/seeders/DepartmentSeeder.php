<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Department::factory(15)->create();
//        for($i=1;$i<=15;$i++)
//        {
//            Department::create([
//                "title" => "отдел - " . $i
//            ]);
//        }
    }
}
