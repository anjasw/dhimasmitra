<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SliderController extends Controller
{
    public function index()
    {
        $sliders = Slider::orderBy('order')->get();
        return Inertia::render('Pages/Slider', [
            'sliders' => $sliders
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'required|image|max:2048',
            'link' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('sliders', 'public');
        }

        Slider::create($data);
        return redirect()->route('pages.slider')->with('success', 'Slider created!');
    }

    public function update(Request $request, Slider $slider)
    {
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
            'link' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('sliders', 'public');
        }else{
            unset($data['image']); // jika tidak ada file gambar, jangan update field image
        }

        $slider->update($data);
        return redirect()->route('pages.slider')->with('success', 'Slider updated!');
    }

    public function destroy(Slider $slider)
    {
        $slider->delete();
        return redirect()->route('pages.slider')->with('success', 'Slider deleted!');
    }
}