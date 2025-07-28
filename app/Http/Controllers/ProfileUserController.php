<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Address;
use App\Models\BankAccount;

class ProfileUserController extends Controller
{
    public function index()
    {
        sleep(1); // Simulasi delay 1 detik untuk testing
        $user = Auth::user();

        // Ambil daftar alamat user
        $addresses = Address::where('user_id', $user->id)->get();
        $transactions = \App\Models\Transaction::where('user_id', $user->id)
            ->orderByRaw('GREATEST(UNIX_TIMESTAMP(created_at), UNIX_TIMESTAMP(updated_at)) DESC')
            ->with(['items.product'])
            ->get();


        // dd($transactions); // Debugging: tampilkan transaksi untuk memastikan data sudah benar
        // Ambil daftar rekening bank user, urutkan dari yang terbaru
        $bankAccounts = BankAccount::where('user_id', $user->id)
            ->orderByDesc('updated_at')
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Front/ProfileUser', [
            'user' => $user,
            'addresses' => $addresses,
            'bankAccounts' => $bankAccounts,
            'transactions' => $transactions, // <-- kirim ke frontend
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'name' => 'required|string|max:100',
            'birthdate' => 'nullable|date',
            'gender' => 'nullable|in:Pria,Wanita',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
        ]);
        $user->update($request->only('name', 'birthdate', 'gender', 'email', 'phone'));
        return response()->json(['success' => true]);
    }

    public function updateAvatar(Request $request)
    {
        $user = Auth::user();
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = '/storage/' . $path;
            $user->save();
            return response()->json([
                'success' => true,
                'avatar' => $user->avatar // lokasi avatar terbaru
            ]);
        }
        return response()->json(['success' => false, 'error' => 'No file uploaded']);
    }

    // Alamat
    public function storeAddress(Request $request)
    {
        $request->validate([
            'label' => 'required|string|max:100',
            'detail' => 'required|string',
            'phone' => 'nullable|string|max:20',
        ]);
        $address = Address::create([
            'user_id' => Auth::id(),
            'label' => $request->label,
            'detail' => $request->detail,
            'phone' => $request->phone,
        ]);
        // Kirim data lengkap ke frontend agar tidak blank
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $address->id,
                'label' => $address->label,
                'detail' => $address->detail,
                'phone' => $address->phone,
                'lokasi' => $address->lokasi ?? null, // jika ada field lokasi
            ]
        ]);
    }

    public function updateAddress(Request $request, $id)
    {
        $address = Address::where('user_id', Auth::id())->findOrFail($id);
        $request->validate([
            'label' => 'required|string|max:100',
            'detail' => 'required|string',
            'phone' => 'nullable|string|max:20',
        ]);
        $address->update($request->only('label', 'detail', 'phone'));
        return response()->json(['success' => true]);
    }

    public function deleteAddress($id)
    {
        $address = Address::where('user_id', Auth::id())->findOrFail($id);
        $address->delete();
        return response()->json(['success' => true]);
    }

    // Rekening Bank
    public function storeBank(Request $request)
    {
        $request->validate([
            'namaBank' => 'required|string|max:50',
            'noRekening' => 'required|string|max:50',
            'atasNama' => 'required|string|max:100',
            'kodeBank' => 'required|string|max:20',
        ]);
        $bank = BankAccount::create([
            'user_id' => Auth::id(),
            'bank_name' => $request->namaBank,
            'account_number' => $request->noRekening,
            'account_name' => $request->atasNama,
            'bank_code' => $request->kodeBank,
        ]);
        // Kirim data lengkap ke frontend agar bisa langsung update state
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $bank->id,
                'namaBank' => $bank->bank_name,
                'noRekening' => $bank->account_number,
                'atasNama' => $bank->account_name,
                'kodeBank' => $bank->bank_code,
            ]
        ]);
    }

    public function updateBank(Request $request, $id)
    {
        $bank = BankAccount::where('user_id', Auth::id())->findOrFail($id);
        $request->validate([
            'namaBank' => 'required|string|max:50',
            'noRekening' => 'required|string|max:50',
            'atasNama' => 'required|string|max:100',
            'kodeBank' => 'required|string|max:20',
        ]);
        $bank->update([
            'bank_name' => $request->namaBank,
            'account_number' => $request->noRekening,
            'account_name' => $request->atasNama,
            'bank_code' => $request->kodeBank,
        ]);
        // Kirim data lengkap ke frontend agar bisa langsung update state
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $bank->id,
                'namaBank' => $bank->bank_name,
                'noRekening' => $bank->account_number,
                'atasNama' => $bank->account_name,
                'kodeBank' => $bank->bank_code,
            ]
        ]);
    }

    public function deleteBank($id)
    {
        $bank = BankAccount::where('user_id', Auth::id())->findOrFail($id);
        $bank->delete();
        return response()->json(['success' => true]);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|min:6',
            'confirm_password' => 'required|same:new_password',
        ]);

        $user = Auth::user();

        if (!\Hash::check($request->old_password, $user->password)) {
            return response()->json(['success' => false, 'error' => 'Password lama salah.']);
        }

        $user->password = bcrypt($request->new_password);
        $user->save();

        return response()->json(['success' => true]);
    }
}
