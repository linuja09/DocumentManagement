<?php

namespace App\Http\Controllers;

use App\Document;
use Illuminate\Http\Request;
use Uuid;
use Symfony\Component\HttpFoundation\Response;

class DocumentController extends Controller
{

    public function download($uuid)
    {
        $doc = Document::where('uuid', $uuid)->firstOrFail();
        $pathToFile = storage_path('app/documents/' . $doc->fileName);
        return response()->download($pathToFile);
    }

    public function store(Request $request)
    {

        try {
            $document = $request->all();
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
