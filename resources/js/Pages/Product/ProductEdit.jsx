import React, { useEffect } from 'react'; // Import useEffect jika diperlukan untuk handle side effects dari useForm
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react'; // Import useForm
import ReactQuill from 'react-quill';
import Select from 'react-select';
import 'react-quill/dist/quill.snow.css';

export default function ProductEdit({ brands = [], categories = [], subcategories = [], colors = [], sizes = [], dataExists }) {
    // Menggunakan useForm
    console.log(dataExists)
    const colorExists = dataExists.colors.map(c => ({ value: c.id, label: c.name }));
    const sizeExists = dataExists.sizes.map(c => ({ value: c.id, label: c.name }));
    const { data, setData, post, processing, errors, reset } = useForm({
        name: dataExists.name,
        description: dataExists.description,
        brand: {
            value: dataExists.brand.id,
            label: dataExists.brand.name
        },
        colors: colorExists,
        sizes: sizeExists,
        category: {
            value: dataExists.category.id,
            label: dataExists.category.name
        },
        subcategory: {
            value: dataExists.subcategory.id,
            label: dataExists.subcategory.name
        },
        price: dataExists.price,
        discount: dataExists.discount,
        fixPrice: dataExists.fix_price,
        minOrder: dataExists.minimum_order,
        images: [],
        sku: dataExists.sku,
        stock: dataExists.stock,
        minStock: dataExists.minimum_stock,
        weight: dataExists.weight,
        type: '', // Untuk menandakan save atau add
    });

    console.log(brands);
    console.log(categories);
    console.log(subcategories);

    // Options (dummy, replace with props/data from backend)
    const brandOptions = brands.map(b => ({ value: b.id, label: b.name }));
    const colorOptions = colors.map(c => ({ value: c.id, label: c.name }));
    const sizeOptions = sizes.map(c => ({ value: c.id, label: c.name }));
    
    // const colorOptions = [
    //     { value: 'red', label: 'Red' }, { value: 'blue', label: 'Blue' }, { value: 'green', label: 'Green' }
    // ];
    // const sizeOptions = [
    //     { value: 'S', label: 'S' }, { value: 'M', label: 'M' }, { value: 'L', label: 'L' }
    // ];
    const categoryOptions = categories.map(c => ({ value: c.id, label: c.name }));

    // subcategoryOptions sekarang bergantung pada 'data.category' dari useForm
    const subcategoryOptions = subcategories
        .filter(sc => !data.category || sc.category_id === data.category?.value)
        .map(sc => ({ value: sc.id, label: sc.name }));

    // Handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value); // Langsung gunakan setData(name, value)
    };

    const handleQuill = (value) => setData('description', value); // Langsung gunakan setData('field', value)

    const handleSelect = (name, value) => setData(name, value); // Langsung gunakan setData(name, value)

    const handlePriceChange = (e) => {
        let price = e.target.value.replace(/[^0-9]/g, '');
        setData('price', price);
        // Hitung fixPrice berdasarkan nilai 'price' dan 'discount' yang sedang ada di `data`
        setData('fixPrice', price && data.discount ? price - (price / 100 * data.discount) : price);
    };

    const handleDiscountChange = (e) => {
        let discount = e.target.value.replace(/[^0-9]/g, '');
        setData('discount', discount);
        // Hitung fixPrice berdasarkan nilai 'price' dan 'discount' yang sedang ada di `data`
        setData('fixPrice', data.price ? data.price - (data.price /100 * discount) : '');
    };

    // Image handler
    const handleAddImage = (e) => {
        const files = Array.from(e.target.files);
        setData('images', [...data.images, ...files]); // Tambahkan ke data.images
    };
    const handleRemoveImage = (idx) => {
        setData('images', data.images.filter((_, i) => i !== idx)); // Filter data.images
    };

    // Submit Handler untuk form
    // Karena kita sudah pakai useForm, kita bisa gunakan 'post' langsung dari useForm
    const handleSubmit = (e, type) => {
        e.preventDefault();
        // setData('type', type); // Set type sebelum submit
        post(route('product.update', dataExists.id)); // Langsung panggil post() dari useForm
        // console.log("Form data submitted:", data); // `data` di sini mungkin belum terupdate `type`-nya secara instan
        console.log(data)
    };

    // Opsional: Gunakan useEffect untuk menghitung fixPrice secara otomatis saat price atau discount berubah
    // Hal ini memastikan `fixPrice` selalu up-to-date di `data`
    useEffect(() => {
        const calculatedFixPrice = data.price && data.discount ? data.price - (data.price / 100 * data.discount) : data.price;
        if (data.fixPrice !== calculatedFixPrice) {
            setData('fixPrice', calculatedFixPrice);
        }
        // setData('colors', colorExists)

    }, [data.price, data.discount]);


    // Render
    return (
        <AuthenticatedLayout
            header={
                <nav className="flex items-center text-sm text-gray-500" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                            <Link href={route('dashboard')} className="hover:text-blue-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" />
                                </svg>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </li>
                        <li className="inline-flex items-center text-gray-500 ml-2">
                            My Shop
                        </li>
                        <li>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </li>
                        <li className="hover:text-blue-600 flex items-center">
                            <Link href={route('product.index')}>
                                Products
                            </Link>
                        </li>
                        <li>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </li>
                        <li className="inline-flex items-center text-gray-700 font-semibold ml-2">
                            Edit Product
                        </li>
                    </ol>
                </nav>
            }
        >
            <Head title="Form Tambah Product" />

            {/* Pastikan Anda menggunakan tag <form> HTML di sekitar input Anda */}
            <form onSubmit={(e) => handleSubmit(e, data.type)}> {/* handleSubmit akan dipanggil saat form disubmit */}
            <div className="max-w-6xl mx-auto py-3">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Kiri */}
                        <div className="flex-1 flex flex-col gap-6">
                            {/* Card 1: Name & Description */}
                            <div className="bg-white rounded shadow p-6">
                                <h3 className="font-semibold mb-4 text-lg">Product Name & Description</h3>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Product Name<span className="text-red-400">*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name} // Gunakan data.name
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2 border-gray-300"
                                        placeholder="Nama Produk"
                                    />
                                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>
                                                                    
                                <div>
                                    <label className="block mb-1 font-medium">Description<span className="text-red-400">*</span></label>
                                    
                                    <div
                                        className="mb-3 border rounded resize-y overflow-hidden h-full"
                                        // style={{ minHeight: '200px' }}
                                    >
                                        <ReactQuill
                                        value={data.description}
                                        onChange={handleQuill}
                                        theme="snow"
                                        className="h-full"
                                        // style={{ minHeight: '200px' }}
                                        />
                                    </div>

                                    {errors.description && (
                                        <div className="text-red-500 text-sm">{errors.description}</div>
                                    )}
                                </div>
                            </div>

                            

                            {/* Card 3: Category & Subcategory */}
                            <div className="bg-white rounded shadow p-6">
                                <h3 className="font-semibold mb-4 text-lg">Category</h3>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Product Category<span className="text-red-400">*</span></label>
                                    <Select
                                        options={categoryOptions}
                                        value={data.category} // Gunakan data.category
                                        onChange={val => {
                                            handleSelect('category', val);
                                            handleSelect('subcategory', null); // Reset subcategory saat kategori berubah
                                        }}
                                        placeholder="Pilih Kategori"
                                    />
                                    {errors['category.value'] && <div className="text-red-500 text-sm mt-1">{errors['category.value']}</div>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Product Sub Category<span className="text-red-400">*</span></label>
                                    <Select
                                        options={subcategoryOptions}
                                        value={data.subcategory} // Gunakan data.subcategory
                                        onChange={val => handleSelect('subcategory', val)}
                                        placeholder="Pilih Sub Kategori"
                                    />
                                    {errors['subcategory.value'] && <div className="text-red-500 text-sm mt-1">{errors['subcategory.value']}</div>}
                                </div>
                            </div>
                            <div className="bg-white rounded shadow p-6">
                                <h3 className="font-semibold mb-4 text-lg">Manage Stock</h3>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Stock Keeping Unit(SKU)<span className="text-red-400">*</span></label>
                                    <input
                                        type="text"
                                        name="sku"
                                        value={data.sku} // Gunakan data.sku
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2 border-gray-300"
                                        placeholder="SKU"
                                    />
                                    {errors.sku && <div className="text-red-500 text-sm mt-1">{errors.sku}</div>}
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Product Stock<span className="text-red-400">*</span></label>
                                    <input
                                        type="text"
                                        name="stock"
                                        value={data.stock} // Gunakan data.stock
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2 border-gray-300"
                                        placeholder="Stok Produk"
                                    />
                                    {errors.stock && <div className="text-red-500 text-sm mt-1">{errors.stock}</div>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Minimum Stock<span className="text-red-400">*</span></label>
                                    <input
                                        type="text"
                                        name="minStock"
                                        value={data.minStock} // Gunakan data.minStock
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2 border-gray-300"
                                        placeholder="Minimal Stok"
                                    />
                                    {errors.minStock && <div className="text-red-500 text-sm mt-1">{errors.minStock}</div>}
                                </div>
                            </div>  
                        </div>

                        {/* Kanan */}
                        <div className="flex-1 flex flex-col gap-6">
                            {/* Card 2: Product Detail */}
                            <div className="bg-white rounded shadow p-6">
                                <h3 className="font-semibold mb-4 text-lg">Product Detail</h3>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Brand Name<span className="text-red-400">*</span></label>
                                    <Select
                                        options={brandOptions}
                                        value={data.brand} // Gunakan data.brand
                                        onChange={val => handleSelect('brand', val)}
                                        placeholder="Pilih Brand"
                                    />
                                    {errors['brand.value'] && <div className="text-red-500 text-sm mt-1">{errors['brand.value']}</div>}
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Product Colors<span className="text-red-400">*</span></label>
                                    <Select
                                        options={colorOptions}
                                        value={data.colors} // Gunakan data.colors
                                        onChange={val => handleSelect('colors', val)}
                                        isMulti
                                        placeholder="Pilih Warna"
                                    />
                                    {errors['colors'] && <div className="text-red-500 text-sm mt-1">{errors['colors']}</div>}
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Product Size<span className="text-red-400">*</span></label>
                                    <Select
                                        options={sizeOptions}
                                        value={data.sizes} // Gunakan data.sizes
                                        onChange={val => handleSelect('sizes', val)}
                                        isMulti
                                        placeholder="Pilih Ukuran"
                                    />
                                    {errors['sizes'] && <div className="text-red-500 text-sm mt-1">{errors['sizes']}</div>}
                                </div>
                                <div>
                                    <label htmlFor="weight" className="block mb-1 font-medium ">
                                        Berat Produk (gram)<span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="weight"
                                        name="weight"
                                        className="w-full border px-3 py-2 rounded border-gray-300"
                                        value={data.weight}
                                        onChange={(e) => setData({ ...data, weight: e.target.value })}
                                        placeholder="Contoh: 500"
                                        min={0}
                                    />
                                    {errors.weight && (
                                        <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
                                    )}
                                </div>

                            </div>
                            {/* Card 4: Product Pricing */}
                            <div className="bg-white rounded shadow p-6">
                                <h3 className="font-semibold mb-4 text-lg">Product Pricing</h3>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Price (IDR)<span className="text-red-400">*</span></label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={data.price} // Gunakan data.price
                                        onChange={handlePriceChange}
                                        className="w-full border rounded px-3 py-2 border-gray-300"
                                        placeholder="Harga (contoh: 100000)"
                                    />
                                    {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Discount (%)<span className="text-red-400">*</span></label>
                                    <input
                                        type="text"
                                        name="discount"
                                        value={data.discount} // Gunakan data.discount
                                        onChange={handleDiscountChange}
                                        className="w-full border rounded px-3 py-2 border-gray-300"
                                        placeholder="Diskon (contoh: 10000)"
                                    />
                                    {errors.discount && <div className="text-red-500 text-sm mt-1">{errors.discount}</div>}
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Fix Price (IDR)<span className="text-red-400">*</span></label>
                                    <input
                                        type="text"
                                        name="fixPrice"
                                        value={data.fixPrice} // Gunakan data.fixPrice
                                        readOnly // Biasanya fixPrice adalah hasil kalkulasi, jadi read-only
                                        className="w-full border rounded px-3 py-2 bg-gray-100 border-gray-300" // Tambah style read-only
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Minimum Order<span className="text-red-400">*</span></label>
                                    <input
                                        type="text"
                                        name="minOrder"
                                        value={data.minOrder} // Gunakan data.minOrder
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2 border-gray-300"
                                        placeholder="Minimal Order"
                                    />
                                    {errors.minOrder && <div className="text-red-500 text-sm mt-1">{errors.minOrder}</div>}
                                </div>
                            </div>

                            {/* Card 5: Product Images */}
                            <div className="bg-white rounded shadow p-6">
                                <h3 className="font-semibold mb-4 text-lg">Product Images</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <label
                                        htmlFor="file"
                                        className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 transition"
                                        title="Tambah Gambar"
                                    >
                                        {/* Icon Add Image */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                                            <path d="M8 13l2.5 3.5L15 11l4 6" stroke="currentColor" strokeWidth="2" fill="none"/>
                                            <circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="2" fill="none"/>
                                            <path d="M12 2v4m2-2h-4" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    </label>
                                    <input
                                        id="file"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleAddImage}
                                        className="hidden"
                                    />
                                    <span className="text-sm text-gray-500">Klik icon untuk tambah gambar</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {data.images.length > 0 ? data.images.map((img, idx) => (
                                        <div key={idx} className="relative">
                                            <img
                                                src={URL.createObjectURL(img)}
                                                // src={`/storage/${img}`}
                                                alt={`Product ${idx + 1}`}
                                                className="w-24 h-24 object-cover rounded border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(idx)}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                title="Hapus"
                                            >×</button>
                                        </div>
                                    )) : dataExists.images.length > 0 && dataExists.images.map((img,idx) => ( // Gunakan data.images
                                        <div key={idx} className="relative">
                                            <img
                                                src={`/storage/${img.image}`}
                                                alt={`Product ${idx + 1}`}
                                                className="w-24 h-24 object-cover rounded border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(idx)}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                title="Hapus"
                                            >×</button>
                                        </div>
                                    ))}
                                </div>
                                {errors.images && <div className="text-red-500 text-sm mt-1">{errors.images}</div>}
                            </div>

                            {/* Tombol Simpan */}
                            <div className="flex justify-between mt-3">
                                <Link href="" className="px-6 py-2 text-gray-700 rounded bg-yellow-100 hover:bg-yellow-200">Kembali</Link>
                                <button
                                    type="submit" // Penting: type="submit" untuk memicu onSubmit form
                                    className="px-6 py-1 text-gray-700 rounded bg-gray-200 hover:bg-gray-300 flex"
                                    onClick={() => setData('type', 'save')} // Set type saat tombol ini diklik
                                    disabled={processing} // Nonaktifkan tombol saat processing
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-grey"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 4l0 4l-4 0l0 -4" />
                                    </svg>
                                    <span className="my-auto">{processing ? 'Saving...' : 'Save Produk'}</span>
                                </button>

                                <button
                                    type="submit" // Penting: type="submit" untuk memicu onSubmit form
                                    className="px-6 py-1 text-white rounded hover:bg-blue-700 flex"
                                    style={{ backgroundColor: "#3cb69f" }}
                                    onClick={() => setData('type', 'add')} // Set type saat tombol ini diklik
                                    disabled={processing} // Nonaktifkan tombol saat processing
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-grey"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span className="my-auto">{processing ? 'Adding...' : 'Add Produk'}</span>
                                </button>
                            </div>
                            
                        </div>
                </div>

                
            </div>
            </form> {/* Tutup tag <form> HTML di sini */}
        </AuthenticatedLayout>
    );
}