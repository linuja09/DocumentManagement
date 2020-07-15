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
    Route::get('isAdmin', 'AuthController@isAdmin');


    // Documents Routes
    Route::post('uploadFile', 'DocumentController@store');
    Route::get('getAllUsers', 'DocumentController@getAllUsers');
    Route::get('getAllUserDocuments', 'DocumentController@getAllDocsforUser');
    Route::get('getAllDocsUploadedToUser', 'DocumentController@getAllDocsUploadedToUser');

    // Documents Download Routes
    Route::resource('documents', 'DocumentController');
    //Route::get('documents/{uuid}/download', 'DocumentController@download')->name('documents.download');
    Route::get('documents/{uuid}/download', 'DocumentController@download')->name('documents.download');

    //Notifications Routes
    Route::get('getAllUserNotifications', 'NotificationController@getAllNotificationsToUser');
    Route::get('getActiveUserNotifications', 'NotificationController@getActiveNotificationsToUser');
    Route::get('updateNotifications', 'NotificationController@updateNotifications');

    //Admin Routes
    Route::get('getAllDocs', 'AdminController@getAllDocs');
    Route::get('getAllUsers', 'AdminController@getAllUsers');

});
