<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TentangKami;
use App\Models\Contact;
use App\Models\Transaction;
use Maatwebsite\Excel\Facades\Excel; // Tambahkan di bagian atas file
use App\Exports\OrdersExport;        // Tambahkan di bagian atas file

class PagesController extends Controller
{
    public function about()
    {
        $tentangKami = TentangKami::first();
        // dd($tentangKami);
        return Inertia::render('Pages/About', [
            'tentangKami' => $tentangKami
        ]);
        // return inertia('Pages/About');
    }   
    public function contact()
    {
        $contact = Contact::latest()->first();
        return inertia('Pages/Contact', [
            'contact' => $contact
        ]);
    }

    
    // public function saveContact(Request $request)
    // {
    //     $request->validate([
    //         'content' => 'required|string',
    //     ]);

    //     // Simulate saving the content
    //     // In a real application, you would save this to the database or a file
    //     session()->flash('success', 'Contact page content saved successfully!');

    //     return redirect()->route('pages.contact');
    // }
    

    public function reporting(Request $request)
    {
        $query = Transaction::query();

        // Filter status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        // Filter tanggal
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $orders = $query->orderBy('created_at', 'desc')->get()->map(function ($order) {
            return [
                'id' => $order->id,
                'created_at' => $order->created_at->format('Y-m-d'),
                'invoice_code' => $order->invoice_code,
                'customer_name' => $order->user->name ?? '-',
                'status' => $order->status,
                'total' => $order->total,
            ];
        });

        return Inertia::render('Reporting/List', [
            'orders' => $orders,
            'filters' => [
                'status' => $request->status,
                'date_from' => $request->date_from,
                'date_to' => $request->date_to,
            ],
        ]);
    }

    // Export ke Excel
    public function exportReporting(Request $request)
    {
        $query = \App\Models\Transaction::query();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $orders = $query->orderBy('created_at', 'desc')->get();

        // Export ke Excel menggunakan Laravel Excel
        return Excel::download(new OrdersExport($orders), 'orders_' . now()->format('Ymd_His') . '.xlsx');
    }


    public function aboutUpdate(Request $request)
    {
        $request->validate([
            'visi' => 'required|string',
            'misi' => 'required|string',
            // 'image' => 'nullable|image|max:2048', // jika upload file
        ]);

        $data = [
            'visi' => $request->visi,
            'misi' => $request->misi,
        ];

        // Jika ada upload image
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('tentang_kami', 'public');
            $data['image'] = $imagePath;
        }

        // Jika sudah ada, update. Jika belum, insert baru.
        $tentangKami = TentangKami::first();
        if ($tentangKami) {
            $tentangKami->update($data);
        } else {
            TentangKami::create($data);
        }

        return redirect()->route('pages.about')->with('success', 'Data berhasil disimpan!');
    }

    
    public function tentangKami(){

        
        // dd($alamat);
        $tentangKami = TentangKami::first();

        return inertia('Front/TentangKami', [
            'tentangKami' => $tentangKami
        ]);
    }

    public function kontakKami(){
        $contacts = Contact::firstOrFail();
        return inertia('Front/Kontak', [
            'contacts' => $contacts
        ]);
    }

    public function contactStore(Request $request)
    {
        $request->validate([
            'address' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'operating_hours' => 'required|string',
        ]);

        $contact = Contact::latest()->first();
        if ($contact) {
            $contact->update($request->only('address', 'email', 'phone', 'operating_hours'));
        } else {
            Contact::create($request->only('address', 'email', 'phone', 'operating_hours'));
        }

        return redirect()->route('pages.contact')->with('success', 'Data kontak berhasil disimpan!');
    }
}
