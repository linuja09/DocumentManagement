<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = ['fileName', 'fileType', 'fileDescription', 'uuid', 'uploadedBy', 'uploadedTo'];
}
