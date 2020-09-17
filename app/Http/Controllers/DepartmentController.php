<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $Departments = Department::paginate(4);
        foreach($Departments as $Department)
        {
            $Department->users;
        }
        return response()->json( $Departments ); //->users()->paginate(4) );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response - JSON
     */
    public function store(Request $request)
    {
//        dd($request->input());
        $department = new Department;
        return $this->update($request, $department);
    }

    /**
     * Display the specified resource.
     *
     * @param  Department  $department
     * @return Response
     */
    public function show(Department $department)
    {
        //dd($department);
        $department->users;
        return response()->json( $department );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  Department  $department
     * @return Response - JSON
     */
    public function update(Request $request, Department $department)
    {
        $department->fill($request->input());
        
        if($request->file("image"))
        {
            $request->file("image")->storePublicly("public/app/logo");
            $department->logo = $request->file("image")->hashName("storage/app/logo");
        }
        if( !$department->save() )
        {
            return response()->json([
                "_error" => true,
            ]);
        }
        
        // обновляем зависимости сотрудников
        // старые в лбом случае удаляются
        $OldUsers = $department->users;
        $department->users()->detach($OldUsers);
        if($request->input("Users"))
        {
            $Users = User::find($request->input("Users"));
            $department->users()->attach($Users);
        }
        $department->refresh();
        $department->users;
        return response()->json( $department );
//            ->status(200);
//            ->header(
//                "Content-Security-Policy",
//                "default-src 'self'",
//                //"default-src 'self' data:; script-src; script-src-elem; script-src-attr; style-src; style-src-elem; style-src-attr; img-src; font-src; connect-src; media-src; object-src; prefetch-src; child-src; frame-src; worker-src; frame-ancestors; form-action; base-uri; manifest-src; plugin-types; report-uri; report-to", 
//                true);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Department  $department
     * @return Response
     */
    public function destroy(Department $department)
    {
        $LogoPath = $department->logo;
        $FullLogoPath = __DIR__ . "/../../.." . $department->logo;
        $OldUsers = $department->users;
        $department->users()->detach($OldUsers);
        if( !$department->delete() )
        {
            return response()->json([
                "_error" => true,
            ]);
        }
        // удаляем файл с логотипом - можно добавить настройки оставлять или чистить...
        $msg = "";
        if($LogoPath && is_file($FullLogoPath))
        {
            unlink($FullLogoPath);
            $msg = "File {$LogoPath} deleted";
        }
        return response()->json([
            true,
            $msg
        ]);
    }
}
