<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TentangKami;
use App\Models\Contact;

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
    

    public function reporting()
    {
        return Inertia::render('Reporting/List', [
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
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
