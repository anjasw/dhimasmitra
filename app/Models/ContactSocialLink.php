<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSocialLink extends Model
{
    
    protected $fillable = [
        'tokopedia_url',
        'tiktokshop_url',
        'shopee_url',
        'lazada_url',
        'facebook_url',
        'instagram_url',
        'tiktok_url',
        'youtube_url',
    ];
}
