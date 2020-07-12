<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Http\Requests\ResetPasswordRequest;

class ResetPasswordController extends Controller
{
    public function sendResetPasswordEmail(Request $request) {

        if ($this->validateEmail($request->email)) {
            $this->sendEmail($request->email);
        }

        return $this->successResponse();


    }

    public function sendEmail($email) {
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }


    public function validateEmail($email) {
        return !!User::where('email', $email)->first();
    }

    public function successResponse() {
        return response()->json([
            'data' => 'Please check mail'
        ], Response::HTTP_OK);
    }

    public function createToken( $email) {
        $oldToken = DB::table('password_resets')->where('email', $email)->first();
        if ($oldToken) {
            return $oldToken->token;
        }
        $newToken = Str::random(60);
        $this->saveToken($newToken, $email);

        return $newToken;
    }

    public function saveToken($token, $email) {
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    public function resetPassword(ResetPasswordRequest $request) {
        return $this -> getPasswordResetTableRow($request)->count() > 0 ? $this->changePassword($request) : $this->tokenErrorResponse();
    }

    private function getPasswordResetTableRow($request) {
        return DB::table('password_resets')->where([
            'email' => $request->email,
            'token' => $request->reset_token
             ]);
    }

    private function changePassword ($request) {

        $user = User::whereEmail($request->email)->first();
        $user->update([
            'password'=> bcrypt($request->password)
        ]);
        $this->getPasswordResetTableRow($request)->delete();
        return response()->json([
            'data' => 'Password updated successfully'
        ], Response::HTTP_CREATED);


    }


    private function tokenErrorResponse () {
        return response()->json([
            'error' => 'Token Mismatch'
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
