<?php

namespace App\Http\Controllers;

use App\Document;
use App\Notification;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Uuid;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;
use Illuminate\Support\Str;
use SoareCostin\FileVault\Facades\FileVault;

class DocumentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('role:CLIENT');
    }

    public function download($uuid)
    {

        $doc = Document::where('uuid', $uuid)->firstOrFail();
        // $filename = storage_path('app/documents/' . $doc->fileName);
        $filename = $doc->fileName;
       // return response()->download($pathToFile);

        return response()->streamDownload(function () use ($filename) {
            FileVault::streamDecrypt('documents\\' . $filename . '.enc');
        }, Str::replaceLast('.enc', '', $filename));
    }

    public function getAllUsers () {
        $posts = User::all();
        return $posts;
    }

    public function getAllDocsforUser () {
        $user = Auth::user();
        $documents = Document::where('uploadedBy', $user->id)->get();
        return $documents;

    }

    public function getAllDocsUploadedToUser () {
        $user = Auth::user();
        $documents = Document::where('uploadedTo', $user->id)->get();
        return $documents;
    }

    public function store(Request $request)
    {

        $user =  Auth::user();

        try {
            $document = $request->all();
            $document['uploadedBy'] = strval($user->id);
            $document['uuid'] = (string)Uuid::generate();

            if ($request->hasFile('fileContent')) {
                $document['fileContent'] = $request->fileContent->getClientOriginalName();
                $filename = $request->fileContent->storeAs('documents', $document['fileContent']);

                if ($filename) {
                    FileVault::encrypt($filename);
                }
            }
            Document::create($document);

            $notification["title"] = "New Document uploaded for you";
            //$notification["message"] = "There is a new document named ".$document['fileName']." uploaded to you by".${$user->name}."on ".Carbon::now()->format('Y-m-d');
            $notification["message"] = "There is a new document uploaded to you";
            $notification["notificationTo"] = $document['uploadedTo'];
            $notification["notificationBy"] =  strval($user->id);
            $notification["docID"] =  $document['uuid'];
            $notification["isSeen"] =0;

            Notification::create($notification);

            return response()->json([
                'data' => 'File Uploaded'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return $th;
            return response()->json([
                'error' => $th
            ], Response::HTTP_EXPECTATION_FAILED);
        }
    }
}
