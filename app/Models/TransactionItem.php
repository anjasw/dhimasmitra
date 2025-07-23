<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionItem extends Model
{
    //
    protected $fillable = [
        'transaction_id',
        'cart_id', 
        'product_id', 
        'quantity', // <-- ubah dari qty ke quantity
        'price', // <-- tambahkan field price
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function cart() {
        return $this->belongsTo(Cart::class, 'cart_id');
    }
}
