import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function isValidIndonesianPhone(phone) {
    // Format: mulai dengan +62, 62, atau 0, lalu 8, dan 8-13 digit angka
    return /^(\+62|62|0)8[1-9][0-9]{6,10}$/.test(phone);
}

export default function ProfileUser() {
    const { user, addresses, bankAccounts, transactions = [] } = usePage().props;

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        birthdate: user.birthdate,
        gender: user.gender,
        email: user.email,
        phone: user.phone,
    });

    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [openMenus, setOpenMenus] = useState({
        inbox: false,
        purchase: false,
    });

    const [activeTab, setActiveTab] = useState("Biodata Diri");

    // Daftar alamat dari database
    const [daftarAlamat, setDaftarAlamat] = useState(addresses);

    

    const [showRekeningModal, setShowRekeningModal] = useState(false);
    const [rekeningBaru, setRekeningBaru] = useState({
        logo: "",
        namaBank: "",
        noRekening: "",
        atasNama: "",
    });

    const daftarBankTersedia = [
        { kode: "bca", nama: "Bank Central Asia (BCA)", logo: "https://images.seeklogo.com/logo-png/39/1/bca-bank-central-asia-logo-png_seeklogo-399949.png" },
        { kode: "bri", nama: "Bank Rakyat Indonesia (BRI)", logo: "https://images.seeklogo.com/logo-png/47/1/bank-rakyat-indonesia-logo-png_seeklogo-474339.png" },
        { kode: "bni", nama: "Bank Negara Indonesia (BNI)", logo: "https://images.seeklogo.com/logo-png/35/1/bank-bni-logo-png_seeklogo-355606.png" },
        { kode: "mandiri", nama: "Bank Mandiri", logo: "https://images.seeklogo.com/logo-png/1/1/bank-mandiri-logo-png_seeklogo-16290.png" },
        { kode: "btn", nama: "Bank Tabungan Negara (BTN)", logo: "https://images.seeklogo.com/logo-png/17/1/bank-tabungan-negara-btn-logo-png_seeklogo-171010.png" },
        { kode: "danamon", nama: "Bank Danamon", logo: "https://images.seeklogo.com/logo-png/31/1/danamon-logo-png_seeklogo-311459.png" },
        { kode: "permata", nama: "Bank Permata", logo: "https://images.seeklogo.com/logo-png/19/1/bank-permata-logo-png_seeklogo-193435.png" },
        { kode: "cimb", nama: "CIMB Niaga", logo: "https://images.seeklogo.com/logo-png/3/1/cimb-bank-logo-png_seeklogo-30387.png" },
        { kode: "panin", nama: "Bank Panin", logo: "https://armadatownsquare.com/wp-content/uploads/2015/06/Logo-Bank-Panin.jpg" },
        { kode: "mega", nama: "Bank Mega", logo: "https://images.seeklogo.com/logo-png/21/1/bank-mega-logo-png_seeklogo-218883.png" },
        { kode: "bsi", nama: "Bank Syariah Indonesia (BSI)", logo: "https://images.seeklogo.com/logo-png/40/1/bank-syariah-indonesia-logo-png_seeklogo-400984.png" },
       
    ];

    // Daftar rekening dari database
    const [daftarRekening, setDaftarRekening] = useState(
        [...bankAccounts]
        .sort((a, b) => {
            const updatedA = new Date(a.updated_at || a.created_at);
            const updatedB = new Date(b.updated_at || b.created_at);
            return updatedB - updatedA;
        })
        .map((rek) => {
            const bankInfo = daftarBankTersedia.find(b => b.kode === rek.bank_code);
            return {
                id: rek.id,
                logo: bankInfo ? bankInfo.logo : rek.logo,
                namaBank: bankInfo ? bankInfo.nama : rek.bank_name,
                noRekening: rek.account_number,
                atasNama: rek.account_name,
                kodeBank: rek.bank_code,
                updated_at: rek.updated_at,
                created_at: rek.created_at,
            };
        })
    );

    const [showAlamatModal, setShowAlamatModal] = useState(false);
    const [alamatBaru, setAlamatBaru] = useState({
        label: "",
        detail: "",
        phone: "",
    });

    // Tambahkan state untuk error nomor HP
    const [phoneError, setPhoneError] = useState("");

    // Tambahkan state untuk toast
    const [toast, setToast] = useState({ show: true, message: "", type: "success" });

    // Tambahkan state untuk modal konfirmasi hapus
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteType, setDeleteType] = useState(""); // "alamat" atau "rekening"
    const [deleteTarget, setDeleteTarget] = useState(null);

    // Tambahkan state untuk modal ubah password
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        old_password: "",
        new_password: "",
        confirm_password: "",
    });
    const [passwordError, setPasswordError] = useState("");

    // Fungsi untuk menampilkan toast
    function showToast(message, type = "success") {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type }), 3000);
    }

    // Fungsi untuk membuka modal hapus
    function openDeleteModal(type, target) {
        setDeleteType(type);
        setDeleteTarget(target);
        setShowDeleteModal(true);
    }

    // Fungsi untuk eksekusi hapus
    async function handleDelete() {
        if (!deleteTarget) return;
        let url = "";
        if (deleteType === "alamat") {
            url = `/profile/address/${deleteTarget.id}/delete`;
        } else if (deleteType === "rekening") {
            url = `/profile/bank/${deleteTarget.id}/delete`;
        }
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });
            const result = await response.json();
            if (result.success) {
                showToast(
                    deleteType === "alamat"
                        ? "Alamat dihapus!"
                        : "Rekening dihapus!",
                    "success"
                );
                if (deleteType === "alamat") {
                    setDaftarAlamat((prev) => prev.filter((a) => a.id !== deleteTarget.id));
                } else {
                    setDaftarRekening((prev) => prev.filter((r) => r.id !== deleteTarget.id));
                }
            } else {
                showToast(result.error || "Gagal hapus.", "error");
            }
        } catch (error) {
            showToast("Gagal hapus.", "error");
        }
        setShowDeleteModal(false);
        setDeleteTarget(null);
        setDeleteType("");
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get("tab");
        if (tab === "alamat") {
            setActiveTab("Daftar Alamat");
        }
        if (tab === "transaksi") {
            setActiveTab("Transaksi");
        }
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Head>
                <title>Profile</title>
                <meta name="description" content="Profile page" />
            </Head>

            <Navbar />
            

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar */}
                    {/* <aside className="w-full md:w-64 bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src={user.avatar ? user.avatar : "https://images.tokopedia.net/img/cache/300/tPxBYm/2023/1/20/785ac6cb-d67b-42bd-97f8-6a06b9269130.jpg"}
                                alt="Avatar"
                                className="w-12 h-12 rounded-full"
                            />
                            <span className="font-semibold">{user.name}</span>
                        </div>

                        <div className="mb-4">
                            <button
                                onClick={() =>
                                    setOpenMenus((prev) => ({
                                        ...prev,
                                        inbox: !prev.inbox,
                                    }))
                                }
                                className="w-full text-left font-semibold text-gray-700 flex justify-between items-center"
                            >
                                Kotak Masuk
                                <span className="material-symbols-outlined text-base">
                                    {openMenus.inbox
                                        ? "expand_less"
                                        : "expand_more"}
                                </span>
                            </button>
                            {openMenus.inbox && (
                                <ul className="mt-2 ml-2 text-sm text-gray-600 space-y-1">
                                    <li>
                                        <button
                                            className="hover:text-yellow-600 transition"
                                            onClick={() =>
                                                console.log("Klik Chat")
                                            }
                                        >
                                            Chat
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>

                        <div className="mb-4">
                            <button
                                onClick={() =>
                                    setOpenMenus((prev) => ({
                                        ...prev,
                                        purchase: !prev.purchase,
                                    }))
                                }
                                className="w-full text-left font-semibold text-gray-700 flex justify-between items-center"
                            >
                                Pembelian
                                <span className="material-symbols-outlined text-base">
                                    {openMenus.purchase
                                        ? "expand_less"
                                        : "expand_more"}
                                </span>
                            </button>
                            {openMenus.purchase && (
                                <ul className="mt-2 ml-2 text-sm text-gray-600 space-y-1">
                                    <li>
                                        <button
                                            className="hover:text-yellow-600 transition"
                                            onClick={() =>
                                                console.log(
                                                    "Klik Daftar Transaksi"
                                                )
                                            }
                                        >
                                            Daftar Transaksi
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </aside> */}

                    {/* Main Content */}
                    <div className="flex-1 bg-white p-6 shadow-sm min-h-[calc(100vh-160px)]">
                        {/* Tabs */}
                        <div className="border-b border-gray-200 mb-6">
                            <ul className="flex flex-wrap gap-4 text-sm font-medium">
                                {[
                                    "Biodata Diri",
                                    "Transaksi",
                                    "Daftar Alamat",
                                    "Rekening Bank",
                                ].map((tab) => (
                                    <li
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-2 cursor-pointer ${
                                            tab === activeTab
                                                ? "border-b-2 border-yellow-600 text-yellow-600"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {tab}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {activeTab === "Biodata Diri" && (
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Foto Profile */}
                                <div className="w-full lg:w-1/3 text-center">
                                    <img
        src={user.avatar ? user.avatar : "https://images.tokopedia.net/img/cache/300/tPxBYm/2023/1/20/785ac6cb-d67b-42bd-97f8-6a06b9269130.jpg"}
        alt="Foto Profil"
        className="w-32 h-32 mx-auto rounded-full object-cover"
    />
                                    <button
                                        onClick={() => setShowUploadModal(true)}
                                        className="mt-4 bg-gray-100 border px-4 py-2 text-sm hover:bg-yellow-400 transition-colors duration-200"
                                    >
                                        Pilih Foto
                                    </button>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Maksimal 2 MB, format JPG, JPEG, PNG.
                                    </p>
                                    <div className="mt-4 space-y-2">
                                        <button
                                            className="w-full bg-gray-100 border px-4 py-2 text-sm hover:bg-yellow-400 transition-colors duration-200"
                                            onClick={() => setShowPasswordModal(true)}
                                        >
                                            Ubah Kata Sandi
                                        </button>
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className="w-full bg-gray-100 border px-4 py-2 text-sm hover:bg-yellow-400 transition-colors duration-200"
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>

                                {/* Biodata Form */}
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Biodata Diri
                                        </h3>
                                        <div className="text-sm space-y-1">
                                            <p>
                                                Nama:{" "}
                                                <span className="font-medium">
                                                    {formData.name}
                                                </span>
                                            </p>
                                            <p>
                                                Tanggal Lahir:{" "}
                                                <span className="font-medium">
                                                    {new Date(
                                                        formData.birthdate
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </span>
                                            </p>
                                            <p>
                                                Jenis Kelamin:{" "}
                                                <span className="font-medium">
                                                    {formData.gender}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Kontak
                                        </h3>
                                        <div className="text-sm space-y-1">
                                            <p>
                                                Email:{" "}
                                                <span className="font-medium">
                                                    {formData.email}
                                                </span>
                                            </p>
                                            <p>
                                                Nomor HP:{" "}
                                                <span className="font-medium">
                                                    {formData.phone}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Safe Mode
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-2">
                                            Fitur ini akan otomatis menyaring
                                            hasil pencarian sesuai kebijakan dan
                                            batasan usia pengguna
                                        </p>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-yellow-400 peer-focus:ring-2 transition-all"></div>
                                            <span className="ml-3 text-sm">
                                                Aktifkan
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "Transaksi" && (
                            <div className="space-y-6">
                                <h3 className="font-semibold text-lg mb-4">Daftar Transaksi</h3>
                                {transactions.length === 0 ? (
                                    <p className="text-sm text-gray-500">Belum ada transaksi.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {transactions.map((trx) => {
                                            const latestDate = new Date(
                                                new Date(trx.updated_at) > new Date(trx.created_at)
                                                    ? trx.updated_at
                                                    : trx.created_at
                                            );
                                            // Warna status
                                            let statusClass = "bg-gray-100 text-gray-700";
                                            if (trx.status === "paid") statusClass = "bg-green-100 text-green-700";
                                            else if (trx.status === "pending") statusClass = "bg-yellow-100 text-yellow-700";
                                            else if (trx.status === "cancel") statusClass = "bg-red-100 text-red-700";
                                            else if (trx.status === "failed") statusClass = "bg-red-200 text-red-800";
                                            else if (trx.status === "expired") statusClass = "bg-orange-100 text-orange-700";

                                            return (
                                                <div key={trx.id} className="border p-4 rounded shadow-sm">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <span className="font-semibold text-yellow-600">{trx.invoice_code}</span>
                                                            <span className="ml-2 text-xs text-gray-500">
                                                                {latestDate.toLocaleString("id-ID")}
                                                            </span>
                                                        </div>
                                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${statusClass}`}>
                                                            {trx.status}
                                                        </span>
                                                    </div>
                                                    <div className="mt-2">
                                                        {trx.items.map((item) => (
                                                            <div key={item.id} className="flex gap-3 items-center mb-2">
                                                                <img
                                                                    src={item.product?.images?.[0]?.image ? `/storage/${item.product.images[0].image}` : "/assets/dummy-image.jpg"}
                                                                    alt={item.product?.name}
                                                                    className="w-12 h-12 object-cover rounded"
                                                                />
                                                                <div>
                                                                    <div className="font-medium">{item.product?.name}</div>
                                                                    <div className="text-xs text-gray-500">
                                                                        {item.quantity} x Rp{item.price.toLocaleString()}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="mt-2 flex justify-between text-sm">
                                                        <span>Total: <span className="font-semibold">Rp{trx.total.toLocaleString()}</span></span>
                                                    </div>
                                                    <div className="mt-2 text-sm">
                                                        <span className="font-semibold">Status:</span>{" "}
                                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${statusClass}`}>
                                                            {trx.status}
                                                        </span>
                                                    </div>
                                                    {trx.note && (
                                                        <div className="mt-1 text-sm text-gray-600">
                                                            <span className="font-semibold">Catatan:</span> {trx.note}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "Daftar Alamat" && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-lg">
                                        Daftar Alamat
                                    </h3>
                                    <button
                                        className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 text-sm"
                                        onClick={() => {
                                            setAlamatBaru({
                                                label: "",
                                                detail: "",
                                                phone: "",
                                            });
                                            setShowAlamatModal(true);
                                        }}
                                    >
                                        Tambah Alamat Baru
                                    </button>
                                </div>

                                {daftarAlamat.length === 0 ? (
                                    <p className="text-sm text-gray-500">
                                        Belum ada alamat tersimpan.
                                    </p>
                                ) : (
                                    <div className="space-y-4">
                                        {daftarAlamat.map((alamat) => (
                                            <div
                                                key={alamat.id}
                                                className="border p-4 flex flex-col md:flex-row justify-between gap-2"
                                            >
                                                <div>
                                                    <p className="font-medium">
                                                        {alamat.label}
                                                    </p>
                                                    <p className="text-sm">
                                                        {alamat.detail}
                                                    </p>
                                                    <p className="text-sm mt-1">
                                                        {alamat.phone}
                                                    </p>
                                                                                                        {alamat.lokasi && (
                                                        <a
                                                            href={alamat.lokasi}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-gray-700 flex items-center gap-1 hover:text-yellow-600 transition mt-1"
                                                        >
                                                            <span className="material-symbols-outlined text-base">
                                                                location_on
                                                            </span>
                                                            Lihat Lokasi di Maps
                                                        </a>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <button
                                                        onClick={() => {
                                                            setAlamatBaru(
                                                                alamat
                                                            );
                                                            setShowAlamatModal(
                                                                true
                                                            );
                                                        }}
                                                        className="text-gray-600 hover:text-gray-800 transition"
                                                        title="Edit"
                                                    >
                                                        <span className="material-symbols-outlined text-base">
                                                            edit
                                                        </span>
                                                    </button>

                                                    <button
                                                        onClick={() => openDeleteModal("alamat", alamat)}
                                                        className="text-red-600 hover:text-red-800 transition"
                                                        title="Hapus"
                                                    >
                                                        <span className="material-symbols-outlined text-base">
                                                            delete
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === "Rekening Bank" && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-lg">
                                        Rekening Bank
                                    </h3>
                                    <button
                                        className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 text-sm"
                                        onClick={() => {
                                            setRekeningBaru({
                                                logo: "",
                                                namaBank: "",
                                                noRekening: "",
                                                atasNama: "",
                                            });
                                            setShowRekeningModal(true);
                                        }}
                                    >
                                        Tambah Rekening
                                    </button>
                                </div>

                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-yellow-700 rounded mb-2">
                                    Daftar rekening bank di bawah ini digunakan jika sewaktu-waktu Anda ingin melakukan <b>refund</b> dana ke rekening pribadi Anda.
                                </div>

                                {daftarRekening.length === 0 ? (
                                    <p className="text-sm text-gray-500">
                                        Belum ada rekening tersimpan.
                                    </p>
                                ) : (
                                    <div className="space-y-4">
                                        {daftarRekening.map((rek) => (
                                            <div
                                                key={rek.id}
                                                className="border p-4 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={rek.logo}
                                                        alt={rek.namaBank}
                                                        className="w-12 h-12 object-contain"
                                                    />
                                                    <div className="text-sm">
                                                        <p className="font-semibold">
                                                            {rek.namaBank}
                                                        </p>
                                                        <p>
                                                            No. Rekening:{" "}
                                                            {rek.noRekening}
                                                        </p>
                                                        <p>
                                                            Atas Nama:{" "}
                                                            {rek.atasNama}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <button
                                                        onClick={() => {
                                                            setRekeningBaru(
                                                                rek
                                                            );
                                                            setShowRekeningModal(
                                                                true
                                                            );
                                                        }}
                                                        className="text-gray-600 hover:text-gray-800"
                                                        title="Edit"
                                                    >
                                                        <span className="material-symbols-outlined text-base">
                                                            edit
                                                        </span>
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal("rekening", rek)}
                                                        className="text-red-600 hover:text-red-800"
                                                        title="Hapus"
                                                    >
                                                        <span className="material-symbols-outlined text-base">
                                                            delete
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />

            {/* Modal Edit Profile */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 w-full max-w-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">
                            Edit Profil
                        </h2>

                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                if (!isValidIndonesianPhone(formData.phone)) {
                                    setPhoneError("Format nomor HP tidak valid (contoh: 081234567890)");
                                    return;
                                }
                                try {
                                    const response = await fetch('/profile/update', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                        },
                                        body: JSON.stringify(formData),
                                    });
                                    const result = await response.json();
                                    if (result.success) {
                                        showToast('Profil berhasil diupdate!', 'success');
                                        setShowModal(false);
                                    } else {
                                        showToast(result.error || 'Gagal update profil.', 'error');
                                    }
                                } catch (error) {
                                    showToast('Gagal update profil.', 'error');
                                }
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium">
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">
                                    Tanggal Lahir
                                </label>
                                <input
                                    type="date"
                                    value={formData.birthdate}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            birthdate: e.target.value,
                                        })
                                    }
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">
                                    Jenis Kelamin
                                </label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            gender: e.target.value,
                                        })
                                    }
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                >
                                    <option value="Pria">Pria</option>
                                    <option value="Wanita">Wanita</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    disabled
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">
                                    Nomor HP
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData({
                                            ...formData,
                                            phone: value,
                                        });
                                        setPhoneError(
                                            value && !isValidIndonesianPhone(value)
                                                ? "Format nomor HP tidak valid (contoh: 081234567890)"
                                                : ""
                                        );
                                    }}
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                />
                                {phoneError && (
                                    <p className="text-xs text-red-600 mt-1">{phoneError}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-yellow-400 text-black px-4 py-2 hover:bg-yellow-300"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Upload Foto */}

            {showUploadModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 w-full max-w-md shadow-lg relative">
                        <h2 className="text-lg font-semibold mb-4">
                            Upload Foto Profil
                        </h2>

                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const form = new FormData();
                                form.append('avatar', selectedImage);
                                try {
                                    const response = await fetch('/profile/avatar', {
                                        method: 'POST',
                                        headers: {
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                        },
                                        body: form,
                                    });
                                    const result = await response.json();
                                    if (result.success) {
                                        showToast('Foto profil berhasil diupload!', 'success');
                                        // Update avatar di tampilan tanpa reload
                                        user.avatar = result.avatar;
                                        setShowUploadModal(false);
                                        setSelectedImage(null);
                                    } else {
                                        showToast(result.error || 'Gagal upload foto.', 'error');
                                    }
                                } catch (error) {
                                    showToast('Gagal upload foto.', 'error');
                                }
                            }}
                            className="space-y-4"
                        >
                            {/* Input File */}
                            <div className="w-full">
                                <label
                                    htmlFor="upload-foto"
                                    className="cursor-pointer flex items-center gap-3 px-4 py-3 border border-dashed border-gray-300 rounded hover:border-yellow-400 transition"
                                >
                                    <span className="material-symbols-outlined text-3xl text-blue-500">
                                        image
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        Klik icon untuk tambah gambar
                                    </span>
                                    <input
                                        id="upload-foto"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setSelectedImage(
                                                e.target.files &&
                                                    e.target.files[0]
                                            )
                                        }
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            {/* Preview */}
                            {selectedImage && (
                                <div className="mt-2">
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Preview"
                                        className="w-24 h-24 object-cover rounded-full mx-auto"
                                    />
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowUploadModal(false);
                                        setSelectedImage(null);
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-yellow-400 text-black px-4 py-2 hover:bg-yellow-300"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Tambah & Edit Alamat */}
            {showAlamatModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 w-full max-w-md shadow-lg relative">
                        <h2 className="text-lg font-semibold mb-4">
                            {alamatBaru.id ? "Edit Alamat" : "Tambah Alamat"}
                        </h2>

                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                // Validasi nomor HP Indonesia
                                if (alamatBaru.phone && !isValidIndonesianPhone(alamatBaru.phone)) {
                                    showToast("Format nomor HP tidak valid (contoh: 081234567890)", "error");
                                    return;
                                }
                                const url = alamatBaru.id ? `/profile/address/${alamatBaru.id}/update` : '/profile/address/store';
                                try {
                                    const response = await fetch(url, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                        },
                                        body: JSON.stringify(alamatBaru),
                                    });
                                    const result = await response.json();
                                    if (result.success) {
                                        showToast('Alamat berhasil disimpan!', 'success');
                                        setShowAlamatModal(false);
                                        if (alamatBaru.id) {
                                            // Edit alamat: update di state
                                            setDaftarAlamat((prev) =>
                                                prev.map((a) =>
                                                    a.id === alamatBaru.id ? { ...a, ...alamatBaru } : a
                                                )
                                            );
                                        } else {
                                            // Tambah alamat: buat array baru di state
                                            setDaftarAlamat((prev) => [...prev, { ...result.data }]);
                                        }
                                    }
                                } catch (error) {
                                    showToast('Gagal simpan alamat.', 'error');
                                }
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium">
                                    Label
                                </label>
                                <input
                                    type="text"
                                    value={alamatBaru.label}
                                    onChange={(e) =>
                                        setAlamatBaru({
                                            ...alamatBaru,
                                            label: e.target.value,
                                        })
                                    }
                                    required
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">
                                    Detail
                                </label>
                                <textarea
                                    value={alamatBaru.detail}
                                    onChange={(e) =>
                                        setAlamatBaru({
                                            ...alamatBaru,
                                            detail: e.target.value,
                                        })
                                    }
                                    required
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">
                                    No. HP
                                </label>
                                <input
                                    type="tel"
                                    value={alamatBaru.phone}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setAlamatBaru({
                                            ...alamatBaru,
                                            phone: value,
                                        });
                                    }}
                                    required
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">
                                    Link Lokasi Google Maps
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://maps.google.com/..."
                                    value={alamatBaru.lokasi}
                                    onChange={(e) =>
                                        setAlamatBaru({
                                            ...alamatBaru,
                                            lokasi: e.target.value,
                                        })
                                    }
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                />
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAlamatModal(false);
                                        setAlamatBaru({
                                            label: "",
                                            detail: "",
                                            phone: "",
                                            lokasi: "",
                                        });
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-yellow-400 text-black px-4 py-2 hover:bg-yellow-300"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Tambah & Edit Rekening */}

            {showRekeningModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 w-full max-w-md shadow-lg rounded relative">
                        <h2 className="text-lg font-semibold mb-4">
                            {rekeningBaru.id
                                ? "Edit Rekening"
                                : "Tambah Rekening"}
                        </h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                                if (rekeningBaru.id) {
                                    setDaftarRekening((prev) =>
                                        prev.map((r) =>
                                            r.id === rekeningBaru.id
                                                ? rekeningBaru
                                                : r
                                        )
                                    );
                                } else {
                                    setDaftarRekening((prev) => [
                                        ...prev,
                                        { ...rekeningBaru, id: Date.now() },
                                    ]);
                                }

                                setShowRekeningModal(false);
                                setRekeningBaru({
                                    id: null,
                                    namaBank: "",
                                    logo: "",
                                    noRekening: "",
                                    atasNama: "",
                                });
                            }}
                            className="space-y-4"
                        >
                            {/* Pilih Bank */}
                            <div>
                                <label className="block text-sm font-medium">
                                    Pilih Bank
                                </label>
                                <select
                                    value={rekeningBaru.namaBank}
                                    onChange={(e) => {
                                        const selected =
                                            daftarBankTersedia.find(
                                                (b) => b.nama === e.target.value
                                            );
                                        if (selected) {
                                            setRekeningBaru((prev) => ({
                                                ...prev,
                                                namaBank: selected.nama,
                                                logo: selected.logo,
                                            }));
                                        }
                                    }}
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                >
                                    <option value="">-- Pilih Bank --</option>
                                    {daftarBankTersedia.map((bank) => (
                                        <option
                                            key={bank.kode}
                                            value={bank.nama}
                                        >
                                            {bank.nama}
                                        </option>
                                    ))}
                                </select>

                                {/* Logo Preview */}
                                {rekeningBaru.logo && (
                                    <div className="mt-2">
                                        <img
                                            src={rekeningBaru.logo}
                                            alt={rekeningBaru.namaBank}
                                            className="w-20 h-10 object-contain"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* No Rekening */}
                            <div>
                                <label className="block text-sm font-medium">
                                    No. Rekening
                                </label>
                                <input
                                    type="text"
                                    value={rekeningBaru.noRekening}
                                    onChange={(e) =>
                                        setRekeningBaru({
                                            ...rekeningBaru,
                                            noRekening: e.target.value,
                                        })
                                    }
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                />
                            </div>

                            {/* Atas Nama */}
                            <div>
                                <label className="block text-sm font-medium">
                                    Atas Nama
                                </label>
                                <input
                                    type="text"
                                    value={rekeningBaru.atasNama}
                                    onChange={(e) =>
                                        setRekeningBaru({
                                            ...rekeningBaru,
                                            atasNama: e.target.value,
                                        })
                                    }
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                />
                            </div>

                            {/* Tombol */}
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowRekeningModal(false);
                                        setRekeningBaru({
                                            id: null,
                                            namaBank: "",
                                            logo: "",
                                            noRekening: "",
                                            atasNama: "",
                                        });
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-yellow-400 text-black px-4 py-2 hover:bg-yellow-300"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Tambah & Edit Rekening */}
            {showRekeningModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 w-full max-w-md shadow-lg relative">
                        <h2 className="text-lg font-semibold mb-4">
                            {rekeningBaru.id ? "Edit Rekening" : "Tambah Rekening"}
                        </h2>

                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const url = rekeningBaru.id ? `/profile/bank/${rekeningBaru.id}/update` : '/profile/bank/store';
                                try {
                                    const response = await fetch(url, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                        },
                                        body: JSON.stringify(rekeningBaru),
                                    });
                                    const result = await response.json();
                                    if (result.success) {
                                        showToast('Rekening berhasil disimpan!', 'success');
                                        setShowRekeningModal(false);
                                        const bankInfo = daftarBankTersedia.find(b => b.kode === (result.data.kodeBank || rekeningBaru.kodeBank));
                                        const newRek = {
                                            id: result.data.id,
                                            logo: bankInfo ? bankInfo.logo : rekeningBaru.logo,
                                            namaBank: bankInfo ? bankInfo.nama : rekeningBaru.namaBank,
                                            noRekening: result.data.noRekening ?? rekeningBaru.noRekening,
                                            atasNama: result.data.atasNama ?? rekeningBaru.atasNama,
                                            kodeBank: result.data.kodeBank ?? rekeningBaru.kodeBank,
                                        };
                                        if (rekeningBaru.id) {
                                            // Edit rekening: update di state dan pindahkan ke paling atas
                                            setDaftarRekening((prev) => {
                                                const updatedList = prev
                                                    .map((r) => r.id === rekeningBaru.id ? { ...r, ...newRek } : r)
                                                    .filter((r) => r.id !== rekeningBaru.id);
                                                return [{ ...newRek }, ...updatedList];
                                            });
                                        } else {
                                            // Tambah rekening: push dan urutkan ulang
                                            setDaftarRekening((prev) =>
                                                [{ ...newRek }, ...prev]
                                            );
                                        }
                                    } else {
                                        showToast(result.error || 'Gagal simpan rekening.', 'error');
                                    }
                                } catch (error) {
                                    showToast('Gagal simpan rekening.', 'error');
                                }
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium">
                                    Nama Bank
                                </label>
                                <select
                                    value={rekeningBaru.kodeBank || ""}
                                    onChange={(e) => {
                                        const selectedBank = daftarBankTersedia.find(
                                            (bank) => bank.kode === e.target.value
                                        );
                                        setRekeningBaru({
                                            ...rekeningBaru,
                                            kodeBank: selectedBank.kode,
                                            namaBank: selectedBank.nama,
                                            logo: selectedBank.logo,
                                        });
                                    }}
                                    required
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                >
                                    <option value="">Pilih Bank</option>
                                    {daftarBankTersedia.map((bank) => (
                                        <option key={bank.kode} value={bank.kode}>
                                            {bank.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">
                                    No. Rekening
                                </label>
                                <input
                                    type="text"
                                    value={rekeningBaru.noRekening}
                                    onChange={(e) =>
                                        setRekeningBaru({
                                            ...rekeningBaru,
                                            noRekening: e.target.value,
                                        })
                                    }
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">
                                    Atas Nama
                                </label>
                                <input
                                    type="text"
                                    value={rekeningBaru.atasNama}
                                    onChange={(e) =>
                                        setRekeningBaru({
                                            ...rekeningBaru,
                                            atasNama: e.target.value,
                                        })
                                    }
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                />
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowRekeningModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-yellow-400 text-black px-4 py-2 hover:bg-yellow-300"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Konfirmasi Hapus */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[99999] bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm text-center">
                        <h3 className="text-lg font-semibold mb-3">
                            Konfirmasi Hapus
                        </h3>
                        <p className="mb-6 text-sm text-gray-700">
                            {deleteType === "alamat"
                                ? "Apakah Anda yakin ingin menghapus alamat ini?"
                                : "Apakah Anda yakin ingin menghapus rekening ini?"}
                        </p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Ubah Kata Sandi */}
            {showPasswordModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 w-full max-w-md shadow-lg relative">
                        <h2 className="text-lg font-semibold mb-4">Ubah Kata Sandi</h2>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setPasswordError("");
                                if (!passwordData.old_password || !passwordData.new_password || !passwordData.confirm_password) {
                                    setPasswordError("Semua field wajib diisi.");
                                    return;
                                }
                                if (passwordData.new_password.length < 6) {
                                    setPasswordError("Password baru minimal 6 karakter.");
                                    return;
                                }
                                if (passwordData.new_password !== passwordData.confirm_password) {
                                    setPasswordError("Konfirmasi password tidak sama.");
                                    return;
                                }
                                try {
                                    const response = await fetch('/profile/password', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                        },
                                        body: JSON.stringify(passwordData),
                                    });
                                    const result = await response.json();
                                    if (result.success) {
                                        showToast('Kata sandi berhasil diubah!', 'success');
                                        setShowPasswordModal(false);
                                        setPasswordData({
                                            old_password: "",
                                            new_password: "",
                                            confirm_password: "",
                                        });
                                    } else {
                                        setPasswordError(result.error || "Gagal ubah kata sandi.");
                                    }
                                } catch (error) {
                                    setPasswordError("Gagal ubah kata sandi.");
                                }
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium">Password Lama</label>
                                <input
                                    type="password"
                                    value={passwordData.old_password}
                                    onChange={e => setPasswordData({ ...passwordData, old_password: e.target.value })}
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Password Baru</label>
                                <input
                                    type="password"
                                    value={passwordData.new_password}
                                    onChange={e => setPasswordData({ ...passwordData, new_password: e.target.value })}
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Konfirmasi Password Baru</label>
                                <input
                                    type="password"
                                    value={passwordData.confirm_password}
                                    onChange={e => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                    required
                                />
                            </div>
                            {passwordError && (
                                <p className="text-xs text-red-600 mt-1">{passwordError}</p>
                            )}
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-yellow-400 text-black px-4 py-2 hover:bg-yellow-300"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast.show && (
                <div
                    className={`fixed top-20 right-6 z-[9999] px-4 py-2 rounded shadow text-white transition ${
                        toast.type === "success" ? "bg-blue-400" : "bg-orange-400"
                    }`}
                >
                    {toast.message}
                </div>
            )}
        </div>
    );
}
