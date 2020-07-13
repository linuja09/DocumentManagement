<?php

Route::group([

    'middleware' => 'api'

], function ($router) {

    // Login Routes
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('resetPasswordEmail', 'ResetPasswordController@sendResetPasswordEmail');
    Route::post('resetPassword', 'ResetPasswordController@resetPassword');

    // Documents Routes
    Route::post('uploadFile', 'DocumentController@store');
    Route::get('getAllUsers', 'DocumentController@getAllUsers');
    Route::post('getAllUserDocuments', 'DocumentController@getAllDocsforUser');
    Route::post('getAllDocsUploadedToUser', 'DocumentController@getAllDocsUploadedToUser');

    // Documents Download Routes
    Route::resource('documents', 'DocumentController');
    Route::get('documents/{uuid}/download', 'DocumentController@download')->name('documents.download');

    //Notifications Routes
    Route::post('getAllUserNotifications', 'NotificationController@getAllNotificationsToUser');
    Route::post('getActiveUserNotifications', 'NotificationController@getActiveNotificationsToUser');
    Route::post('updateNotifications', 'NotificationController@updateNotifications');
});
