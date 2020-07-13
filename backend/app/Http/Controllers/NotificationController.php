<?php

namespace App\Http\Controllers;

use App\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class NotificationController extends Controller
{
    public function getActiveNotificationsToUser(){
        $user = Auth::user();
        $notifications = Notification::where('notificationTo', $user->id)->where('isSeen', 0)->get();
        return $notifications;
    }

    public function getAllNotificationsToUser(){
        $user = Auth::user();
        $notifications = Notification::where('notificationTo', $user->id)->get();
        return $notifications;
    }

    public function updateNotifications() {
        $user = Auth::user();
        Notification::where('notificationTo', $user->id)->where('isSeen', 0)->update(['isSeen' => 1]);
        return response()->json([
            'data' => 'Notification Updated'
        ], Response::HTTP_OK);
    }
}
