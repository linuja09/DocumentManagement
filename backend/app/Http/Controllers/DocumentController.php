<?php

namespace App\Http\Controllers;

use App\Document;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Uuid;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class DocumentController extends Controller
{

    public function download($uuid)
    {
        $doc = Document::where('uuid', $uuid)->firstOrFail();
        $pathToFile = storage_path('app/documents/' . $doc->fileName);
        return response()->download($pathToFile);
    }

    public function getAllUsers () {
        $posts = User::all();
        return $posts;
    }

    public function store(Request $request)
    {

        $user =  Auth::user();

        try {
            $document = $request->all();
            $document['uploadedBy'] = $user->id;
            $document['uuid'] = (string)Uuid::generate();

            if ($request->hasFile('fileContent')) {
                $document['fileContent'] = $request->fileContent->getClientOriginalName();
                $request->fileContent->storeAs('documents', $document['fileContent']);
            }
            Document::create($document);

            return response()->json([
                'data' => 'File Uploaded'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th
            ], Response::HTTP_EXPECTATION_FAILED);
        }
    }
}
