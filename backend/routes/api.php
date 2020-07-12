<?php

Route::group([

    'middleware' => 'api'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('resetPasswordEmail', 'ResetPasswordController@sendResetPasswordEmail');
    Route::post('resetPassword', 'ResetPasswordController@resetPassword');
    Route::post('uploadFile', 'FileUploadController@uploadFiles');

});
