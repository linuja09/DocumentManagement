<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('role:ADMIN');
    }

    public function testAdmin() {
        return "Test Admin";
    }
}
