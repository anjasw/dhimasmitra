<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function index()
    {
        $messages = ContactMessage::orderByDesc('created_at')->paginate(20);

        return Inertia::render('ContactMessage/List', [
            'messages' => $messages,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'message' => 'required|string|max:1000',
        ]);

        \App\Models\ContactMessage::create($validated);

        return back()->with('success', 'Pesan Anda berhasil dikirim!');
    }
}
