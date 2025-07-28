<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use App\Models\Brand;
use App\Models\Slider;
use App\Models\Category;
use App\Models\Cart;
use App\Models\Transaction;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\RajaOngkirController;

class FrontController extends Controller
{
    

    public function home(){


        // $rjc = new RajaOngkirController;
        // $listKota = $rjc->getKota();

        $laravelVersion = Application::VERSION;
        $phpVersion = PHP_VERSION;

        $brands = Brand::query('status', 1)->limit(18)->get();

        $sliders = Slider::where('is_active', 1)->orderBy('order')->get();
        
        return Inertia::render('Welcome', [
            'brands' => $brands,
            'laravelVersion' => $laravelVersion,
            'phpVersion' => $phpVersion,
            // 'listKota' => $listKota,
            'sliders' => $sliders,
        ]);
    }

    public function order(Request $request){
        sleep(1);
        if (!$request->has('id')) {
            return redirect()->route('cart.index');
        }
        
        $transactionId = $request->id;
        // Eager load items, product, dan images
        $transaction = Transaction::with(['items.product.images'])->find($transactionId);


        $addresses = \App\Models\Address::where('user_id', auth()->id())->get();

        return Inertia::render('Front/Order', [
            'transaction' => $transaction,
            'addresses' => $addresses, // <-- kirim ke frontend
        ]);
    }

    public function AccountOrder(){
        $auth = Auth::user();
        // dd($auth);
        
        $isLoggedIn = false;
        $role = null;
        if ($auth) {
            $isLoggedIn = true;
            $role = $auth->role;
        } else {
            $isLoggedIn = false;
            $role = null;
        }
        $categories = Category::query()->where('status','!=', 2)->with(['subcategories' => function($q){
            $q->where('status', 1);
        }])->get();

        $carts = Cart::select('id', 'user_id', 'product_id', 'quantity')
            ->where('user_id', auth()->id())
            ->with(['product' => function($q){
                $q->with(['images']);
            }, 'user' => function($q){
                $q->select('id', 'name', 'email');
            }])
            ->get()
            ->map(function($cart) {
                // Pastikan kolom fix_price ada di relasi product
                $cart->product->fix_price_formatted = isset($cart->product->fix_price)
                    ? 'Rp ' . number_format($cart->product->fix_price, 0, ',', '.')
                    : null;
                return $cart;
            });
        // dd($categories);
        return Inertia::render('Front/Account/Order', [
            'categories' => $categories,
            'carts' => $carts,
            'isLoggedIn' => $isLoggedIn,
            'role' => $role,
        ]);
    }

    public function AccountOrderSuccess(Request $request){

        // dd($request->all());

        // $request->order_id = 'DMT-175325415642702';
        $orderId = $request->order_id;
        $transaction = Transaction::where('invoice_code', $orderId)->first();
        $transactionId = $transaction->id;
        $statusCode = $request->status_code;
        $transaction_status = $request->transaction_status;

        $transaction->update([
            'status' => $transaction_status == "settlement" ? 'paid' : $transaction_status,
            'updated_at' => now()
        ]);
        
        $cartIds = \App\Models\TransactionItem::where('transaction_id', $transactionId)
            ->pluck('cart_id')
            ->filter() // hilangkan null
            ->unique()
            ->toArray();

        // Hapus cart yang id-nya ada di $cartIds
        if (!empty($cartIds) && $transaction_status == "settlement") {
            \App\Models\Cart::whereIn('id', $cartIds)
                ->where('user_id', auth()->id())
                ->delete();
        }
        // exit;
        return response()->json(['message' => 'Payment handled successfully']);
        // return redirect()->route('account.order');

        // $categories = Category::query()->where('status','!=', 2)->with(['subcategories' => function($q){
        //     $q->where('status', 1);
        // }])->get();

        // $carts = Cart::select('id', 'user_id', 'product_id', 'quantity')
        //     ->where('user_id', auth()->id())
        //     ->with(['product' => function($q){
        //         $q->with(['images']);
        //     }, 'user' => function($q){
        //         $q->select('id', 'name', 'email');
        //     }])
        //     ->get()
        //     ->map(function($cart) {
        //         // Pastikan kolom fix_price ada di relasi product
        //         $cart->product->fix_price_formatted = isset($cart->product->fix_price)
        //             ? 'Rp ' . number_format($cart->product->fix_price, 0, ',', '.')
        //             : null;
        //         return $cart;
        //     });
        // // dd($categories);
        // return Inertia::render('Front/Account/OrderSuccess', [
        //     'categories' => $categories,
        //     'carts' => $carts,
        // ]);
    }
    public function AccountOrderFail(){
        $categories = Category::query()->where('status','!=', 2)->with(['subcategories' => function($q){
            $q->where('status', 1);
        }])->get();

        $carts = Cart::select('id', 'user_id', 'product_id', 'quantity')
            ->where('user_id', auth()->id())
            ->with(['product' => function($q){
                $q->with(['images']);
            }, 'user' => function($q){
                $q->select('id', 'name', 'email');
            }])
            ->get()
            ->map(function($cart) {
                // Pastikan kolom fix_price ada di relasi product
                $cart->product->fix_price_formatted = isset($cart->product->fix_price)
                    ? 'Rp ' . number_format($cart->product->fix_price, 0, ',', '.')
                    : null;
                return $cart;
            });
        // dd($categories);
        return Inertia::render('Front/Account/OrderFail', [
            'categories' => $categories,
            'carts' => $carts,
        ]);
    }

    public function handlePayAccount(){
        // Logika untuk menangani pembayaran akun
        // Misalnya, verifikasi status pembayaran, simpan transaksi ke database, dll.
        // Ini hanya contoh, implementasi sebenarnya tergantung pada kebutuhan aplikasi Anda.

        return response()->json(['message' => 'Payment handled successfully']);
    }

    public function AccountOrderError(){
        $categories = Category::query()->where('status','!=', 2)->with(['subcategories' => function($q){
            $q->where('status', 1);
        }])->get();

        $carts = Cart::select('id', 'user_id', 'product_id', 'quantity')
            ->where('user_id', auth()->id())
            ->with(['product' => function($q){
                $q->with(['images']);
            }, 'user' => function($q){
                $q->select('id', 'name', 'email');
            }])
            ->get()
            ->map(function($cart) {
                // Pastikan kolom fix_price ada di relasi product
                $cart->product->fix_price_formatted = isset($cart->product->fix_price)
                    ? 'Rp ' . number_format($cart->product->fix_price, 0, ',', '.')
                    : null;
                return $cart;
            });
        // dd($categories);
        return Inertia::render('Front/Account/OrderError', [
            'categories' => $categories,
            'carts' => $carts,
        ]);
    }


    public function cart(){

        $auth = Auth::user();
        // dd($auth);
        
        $isLoggedIn = false;
        $role = null;
        if ($auth) {
            $isLoggedIn = true;
            $role = $auth->role;
        } else {
            $isLoggedIn = false;
            $role = null;
        }
        $categories = Category::query()->where('status','!=', 2)->with(['subcategories' => function($q){
            $q->where('status', 1);
        }])->get();

        $carts = Cart::select('id', 'user_id', 'product_id', 'quantity')
            ->where('user_id', auth()->id())
            ->with(['product' => function($q){
                $q->with(['images']);
            }, 'user' => function($q){
                $q->select('id', 'name', 'email');
            }])
            ->get()
            ->map(function($cart) {
                // Pastikan kolom fix_price ada di relasi product
                $cart->product->fix_price_formatted = isset($cart->product->fix_price)
                    ? 'Rp ' . number_format($cart->product->fix_price, 0, ',', '.')
                    : null;
                
                $cart->product->fix_price = (int)$cart->product->fix_price;
                return $cart;
            });
        return Inertia::render('Front/Cart', [
            'categories' => $categories,
            'carts' => $carts,
            'isLoggedIn' => $isLoggedIn,
            'role' => $role,
        ]);
    }



    public function updateCart(Request $request){
        $id = $request->id;
        $qty = $request->quantity;

        if ($qty < 1) {
            return response()->json(['error' => 'Quantity minimal 1'], 422);
        }

        // Ambil cart milik user yang sedang login
        $cart = \App\Models\Cart::where('id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$cart) {
            return response()->json(['error' => 'Cart not found'], 404);
        }

        $cart->quantity = $qty;
        $cart->save();

        return response()->json([
            'success' => true,
            'cart' => $cart
        ]);
    }

    public function checkoutCart(Request $request){
        $userId = auth()->id();
        $items = $request->items; // array of {id, qty}
        // dd($request->all());
        // Ambil semua transaksi pending milik user
        $existingTransaction = \App\Models\Transaction::where('user_id', $userId)
            ->where('status', 'pending')
            ->with(['items'])
            ->get()
            ->first(function($trx) use ($items) {
                // Bandingkan item dan qty satu per satu
                $trxItems = $trx->items->map(function($item){
                    return [
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity
                    ];
                })->toArray();
                $requestItems = collect($items)->map(function($item){
                    return [
                        'product_id' => \App\Models\Cart::find($item['id'])->product_id ?? null,
                        'quantity' => $item['qty']
                    ];
                })->toArray();
                // Cek sama persis (jumlah dan urutan)
                return $trxItems == $requestItems;
            });

        if ($existingTransaction) {
            // Jika sudah ada transaksi persis, ambil yang sudah ada
            return response()->json([
                'success' => true,
                'transaction_id' => $existingTransaction->id,
                'total' => $existingTransaction->total
            ]);
        }

        $invoice_code = 'DMT-' . time() . $userId . rand(100,999);

        // Hitung total harga
        $total_price = 0;
        foreach ($items as $item) {
            $cart = \App\Models\Cart::where('id', $item['id'])
                ->where('user_id', $userId)
                ->with('product')
                ->first();
            if ($cart && isset($cart->product->fix_price)) {
                $total_price += $cart->product->fix_price * $item['qty'];
            }
        }

        $transaction = \App\Models\Transaction::create([
            'user_id' => $userId,
            'status' => 'pending',
            'invoice_code' => $invoice_code,
            'subtotal' => $total_price,
            'total' => $total_price,
        ]);

        foreach ($items as $item) {
            $cart = \App\Models\Cart::where('id', $item['id'])
                ->where('user_id', $userId)
                ->with('product')
                ->first();
            // dd($userId);

            \App\Models\TransactionItem::create([
                'transaction_id' => $transaction->id,
                'cart_id' => $cart ? $cart->id : null,
                'product_id' => $cart ? $cart->product_id : null,
                'quantity' => $item['qty'],
                'price' => $cart && isset($cart->product->fix_price) ? $cart->product->fix_price : 0,
                'cart_id' => $cart ? $cart->id : null,
            ]);
        }

        return response()->json([
            'success' => true,
            'transaction_id' => $transaction->id,
            'total' => $total_price
        ]);
    }


    public function deleteCart(Request $request)
    {
        $cartId = $request->id;
        $cart = \App\Models\Cart::where('id', $cartId)
            ->where('user_id', auth()->id())
            ->first();

        if (!$cart) {
            return response()->json(['error' => 'Cart not found'], 404);
        }

        $cart->delete();

        return response()->json(['success' => true]);
    }


    public function show($slug)
    {
        sleep(1);
        // $product = \App\Models\Product::where('slug', $slug)->where('status', 1)->firstOrFail();
        // $product->fix_price_formatted = isset($product->fix_price)
        //     ? 'Rp ' . number_format($product->fix_price, 0, ',', '.')
        //     : null;
        // $product->image = $product->images->first() ? asset('storage/' . $product->images->first()->image) : asset('assets/dummy-image.jpg');

        // return Inertia::render('Front/DetailProduk', [
        //     'product' => $product
        // ]);

        // $product = [
        //     'name' => ucwords(str_replace('-', ' ', $slug)),
        //     'slug' => $slug,
        //     'price' => 2926300,
        //     'stock' => 14,
        //     'image_url' => 'https://dummyimage.com/600x600/000/fff&text=Gambar+Utama',
        //     'description' => "1. BMS intelligent chip enables 65W (Max) fast charging.\n2. Top-class LG battery cells ensure safety and performance.\n3. Lightweight integrated design.\n4. Multiple interfaces: USB-A, USB-C, 8V-OUT, 12V-OUT.",
        //     'gallery' => [
        //         'https://dummyimage.com/600x600/000/fff&text=Gambar+Utama',
        //         'https://dummyimage.com/600x600/333/fff&text=Side+View',
        //         'https://dummyimage.com/600x600/555/fff&text=Back+View',
        //         'https://dummyimage.com/600x600/777/fff&text=Packaging',
        //     ],
        // ];
        // return Inertia::render('Front/ProductDetail', [
        //     'product' => $product,
        // ]);
        $product = \App\Models\Product::with('images')->where('slug', $slug)->where('status', 1)->firstOrFail();

        $mainImage = $product->images->first()
            ? asset('storage/' . $product->images->first()->image)
            : asset('assets/dummy-image.jpg');

        $gallery = $product->images->map(function($img) {
            return asset('storage/' . $img->image);
        })->toArray();

        return Inertia::render('Front/ProductDetail', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => $product->fix_price,
                'stock' => $product->stock,
                'image_url' => $mainImage,
                'description' => $product->description,
                'gallery' => $gallery,
            ],
        ]);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = auth()->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $product = \App\Models\Product::find($request->product_id);

        // Cek apakah produk sudah ada di keranjang user
        $cart = \App\Models\Cart::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cart) {
            // Jika sudah ada, update quantity dan price
            $cart->quantity += $request->quantity;
            $cart->price = $product->fix_price * $cart->quantity;
            $cart->weight = 0;
            $cart->save();
            $cartId = $cart->id;
        } else {
            // Jika belum ada, buat baru
            $newCart = \App\Models\Cart::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'price' => $product->fix_price * $request->quantity,
                'weight' => 0,
            ]);
            $cartId = $newCart->id;
        }

        return response()->json([
            'success' => true,
            'cart_id' => $cartId
        ]);
    }
}
