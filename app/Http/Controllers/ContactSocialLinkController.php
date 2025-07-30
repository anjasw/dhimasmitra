<?php

namespace App\Http\Controllers;

use App\Models\ContactSocialLink;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactSocialLinkController extends Controller
{
    public function index()
    {
        $links = ContactSocialLink::orderByDesc('created_at')->paginate(20);
        return Inertia::render('ContactSocialLink/List', [
            'links' => $links,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tokopedia_url' => 'nullable|url',
            'tiktokshop_url' => 'nullable|url',
            'shopee_url' => 'nullable|url',
            'lazada_url' => 'nullable|url',
            'facebook_url' => 'nullable|url',
            'instagram_url' => 'nullable|url',
            'tiktok_url' => 'nullable|url',
            'youtube_url' => 'nullable|url',
        ]);

        // Ambil row pertama, jika ada update, jika tidak create
        $link = \App\Models\ContactSocialLink::first();
        if ($link) {
            $link->update($validated);
            $message = 'Link berhasil diupdate.';
        } else {
            \App\Models\ContactSocialLink::create($validated);
            $message = 'Link berhasil ditambahkan.';
        }

        return redirect()->route('contact-social-link.index')->with('success', $message);
    }

    public function edit($id)
    {
        $link = ContactSocialLink::findOrFail($id);
        return Inertia::render('ContactSocialLink/Edit', [
            'link' => $link,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'tokopedia_url' => 'nullable|url',
            'tiktokshop_url' => 'nullable|url',
            'shopee_url' => 'nullable|url',
            'lazada_url' => 'nullable|url',
            'facebook_url' => 'nullable|url',
            'instagram_url' => 'nullable|url',
            'tiktok_url' => 'nullable|url',
            'youtube_url' => 'nullable|url',
        ]);
        $link = ContactSocialLink::findOrFail($id);
        $link->update($validated);
        return redirect()->route('contact-social-link.index')->with('success', 'Link berhasil diupdate.');
    }

    public function destroy($id)
    {
        $link = ContactSocialLink::findOrFail($id);
        $link->delete();
        return redirect()->route('contact-social-link.index')->with('success', 'Link berhasil dihapus.');
    }
}