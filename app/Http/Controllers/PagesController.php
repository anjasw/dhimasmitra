<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PagesController extends Controller
{
    public function about()
    {
        return Inertia::render('Pages/About');
    }   
    public function contact()
    {
        return Inertia::render('Pages/Contact');
    }

    public function saveAbout(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        // Simulate saving the content
        // In a real application, you would save this to the database or a file
        session()->flash('success', 'About page content saved successfully!');

        return redirect()->route('pages.about');
    }
    public function saveContact(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        // Simulate saving the content
        // In a real application, you would save this to the database or a file
        session()->flash('success', 'Contact page content saved successfully!');

        return redirect()->route('pages.contact');
    }
    

    public function reporting()
    {
        return Inertia::render('Reporting/List', [
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }
}
