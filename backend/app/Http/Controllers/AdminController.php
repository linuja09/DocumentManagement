<?php

namespace App\Http\Controllers;

use App\Document;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('role:ADMIN');
    }

    public function getAllDocs () {
        $documents = Document::all();
        return $documents;
    }

    public function getAllUsers () {
        $users = User::all();
        return $users;
    }
}
