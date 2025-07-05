<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use ProductImage;
class Product extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'sku', 'description',
        'price', 'fix_price', 'discount', 'stock',
        'minimum_stock', 'minimum_order', 'brand_id', 'category_id', 'subcategory_id','weight',
        'user_id', 'status'
    ];

    public function images(){
        return $this->hasMany(ProductImage::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function brand(){
        return $this->belongsTo(Brand::class);
    }
    public function category(){
        return $this->belongsTo(Category::class);
    }
    public function subcategory(){
        return $this->belongsTo(SubCategory::class);
    }
    public function colors(){
        return $this->belongsToMany(Color::class);
    }
    public function sizes()
    {
        return $this->belongsToMany(Size::class);
    }

}
