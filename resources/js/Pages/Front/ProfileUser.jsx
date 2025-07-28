import { useState } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export default function ProfileUser() {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "aprea kosasih",
        birthdate: "1994-04-13",
        gender: "Pria",
        email: "apreak@gmail.com",
        phone: "6287770211186",
        lokasi: "https://maps.google.com/?q=-6.234567,106.789123",
    });

    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [openMenus, setOpenMenus] = useState({
        inbox: false,
        purchase: false,
    });

    const [activeTab, setActiveTab] = useState("Biodata Diri");

    const [daftarAlamat, setDaftarAlamat] = useState([
        {
            id: 1,
            label: "Rumah - Aprea",
            detail: "Perumahan Tamansari Riverside Blok E2 No.24, Tamansari, Kab. Bogor, Jawa Barat",
            phone: "62877770211186",
        },
    ]);

        const [daftarRekening, setDaftarRekening] = useState([
        {
            id: 1,
            logo: "https://seeklogo.com/images/B/Bank_Central_Asia-logo-6E99B07F2C-seeklogo.com.png",
            namaBank: "BCA",
            noRekening: "1234567890",
            atasNama: "Aprea Kosasih",
        },
    ]);

    const [showRekeningModal, setShowRekeningModal] = useState(false);
    const [rekeningBaru, setRekeningBaru] = useState({
        logo: "",
        namaBank: "",
        noRekening: "",
        atasNama: "",
    });

    const daftarBankTersedia = [
        {
            kode: "bca",
            nama: "BCA",
            logo: "https://seeklogo.com/images/B/Bank_Central_Asia-logo-6E99B07F2C-seeklogo.com.png",
        },
        {
            kode: "bri",
            nama: "BRI",
            logo: "https://seeklogo.com/images/B/bank-bri-logo-18DE570D4E-seeklogo.com.png",
        },
        {
            kode: "bni",
            nama: "BNI",
            logo: "https://seeklogo.com/images/B/bni-bank-logo-659A14A3CB-seeklogo.com.png",
        },
        {
            kode: "mandiri",
            nama: "Mandiri",
            logo: "https://seeklogo.com/images/B/bank-mandiri-logo-F2D4DADB1E-seeklogo.com.png",
        },
    ];

    const [showAlamatModal, setShowAlamatModal] = useState(false);
    const [alamatBaru, setAlamatBaru] = useState({
        label: "",
        detail: "",
        phone: "",
    });

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
                    <aside className="w-full md:w-64 bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src="https://images.tokopedia.net/img/cache/300/tPxBYm/2023/1/20/785ac6cb-d67b-42bd-97f8-6a06b9269130.jpg"
                                alt="Avatar"
                                className="w-12 h-12 rounded-full"
                            />
                            <span className="font-semibold">aprea</span>
                        </div>

                        {/* Kotak Masuk */}
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

                        {/* Pembelian */}
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
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 bg-white p-6 shadow-sm min-h-[calc(100vh-160px)]">
                        {/* Tabs */}
                        <div className="border-b border-gray-200 mb-6">
                            <ul className="flex flex-wrap gap-4 text-sm font-medium">
                                {[
                                    "Biodata Diri",
                                    "Daftar Alamat",
                                    "Pembayaran",
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
                                        src="https://images.tokopedia.net/img/cache/300/tPxBYm/2023/1/20/785ac6cb-d67b-42bd-97f8-6a06b9269130.jpg"
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
                                        <button className="w-full bg-gray-100 border px-4 py-2 text-sm hover:bg-yellow-400 transition-colors duration-200">
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
                                                        onClick={() =>
                                                            setDaftarAlamat(
                                                                (prev) =>
                                                                    prev.filter(
                                                                        (a) =>
                                                                            a.id !==
                                                                            alamat.id
                                                                    )
                                                            )
                                                        }
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
                                                        onClick={() =>
                                                            setDaftarRekening(
                                                                (prev) =>
                                                                    prev.filter(
                                                                        (r) =>
                                                                            r.id !==
                                                                            rek.id
                                                                    )
                                                            )
                                                        }
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
                            onSubmit={(e) => {
                                e.preventDefault();
                                setShowModal(false);
                                // handle save here
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
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            phone: e.target.value,
                                        })
                                    }
                                    className="mt-1 w-full border px-3 py-2 text-sm"
                                />
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
                            onSubmit={(e) => {
                                e.preventDefault();
                                setShowUploadModal(false);
                                // Kirim ke backend nanti kalau sudah siap
                                console.log("Upload foto:", selectedImage);
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
                            onSubmit={(e) => {
                                e.preventDefault();

                                if (alamatBaru.id) {
                                    // Edit
                                    setDaftarAlamat((prev) =>
                                        prev.map((a) =>
                                            a.id === alamatBaru.id
                                                ? alamatBaru
                                                : a
                                        )
                                    );
                                } else {
                                    // Tambah baru
                                    setDaftarAlamat((prev) => [
                                        ...prev,
                                        { ...alamatBaru, id: Date.now() },
                                    ]);
                                }

                                setShowAlamatModal(false);
                                setAlamatBaru({
                                    label: "",
                                    detail: "",
                                    phone: "",
                                });
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
                                    onChange={(e) =>
                                        setAlamatBaru({
                                            ...alamatBaru,
                                            phone: e.target.value,
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
        </div>
    );
}
