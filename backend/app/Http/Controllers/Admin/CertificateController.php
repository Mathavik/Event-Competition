<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CertificateSetting;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    // 📄 VIEW (show current settings)
    public function index()
    {
        $setting = CertificateSetting::first();
        return view('admin.certificate.index', compact('setting'));
    }

    // 💾 STORE (create / update same)
    public function store(Request $request)
    {
        $setting = CertificateSetting::first();

        $data = [];

        if ($request->hasFile('background')) {
            $data['background_image'] = $request->file('background')->store('certificates', 'public');
        }

        if ($request->hasFile('principal_sign')) {
            $data['principal_signature'] = $request->file('principal_sign')->store('certificates', 'public');
        }

        if ($request->hasFile('coordinator_sign')) {
            $data['coordinator_signature'] = $request->file('coordinator_sign')->store('certificates', 'public');
        }

        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('certificates', 'public');
        }

        CertificateSetting::updateOrCreate(['id' => 1], $data);

        return back()->with('success', 'Saved Successfully');
    }

    // ✏️ EDIT
    public function edit()
    {
        $setting = CertificateSetting::first();
        return view('admin.certificate.edit', compact('setting'));
    }

    // 🔄 UPDATE
    public function update(Request $request)
    {
        $setting = CertificateSetting::first();

        if (!$setting) {
            return back()->with('error', 'No data found');
        }

        if ($request->hasFile('background')) {
            $setting->background_image = $request->file('background')->store('certificates', 'public');
        }

        if ($request->hasFile('principal_sign')) {
            $setting->principal_signature = $request->file('principal_sign')->store('certificates', 'public');
        }

        if ($request->hasFile('coordinator_sign')) {
            $setting->coordinator_signature = $request->file('coordinator_sign')->store('certificates', 'public');
        }

        if ($request->hasFile('logo')) {
            $setting->logo = $request->file('logo')->store('certificates', 'public');
        }

        $setting->save();

        return back()->with('success', 'Updated Successfully');
    }

    // 🗑 DELETE (remove all settings)
    public function destroy()
    {
        $setting = CertificateSetting::first();

        if ($setting) {
            $setting->delete();
        }

        return back()->with('success', 'Deleted Successfully');
    }
}