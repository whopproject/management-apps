import { CartProduct } from "../../components/CartProduct";
import { ProductCard } from "../../components/ProductCard";
import { PanelLayout } from "../../layouts/PanelLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import "react-responsive-modal/styles.css";
import { ModalPrimary } from "../../components/ModalPrimary";
import CurrencyInput from "react-currency-input-field";
import { Loader } from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { ModalSecondary } from "../../components/ModalSecondary";

export const Kasir = () => {
    let navigate = useNavigate();
    const [reloadTable, setReloadTable] = useState(true);
    const [cart, setCart] = useState([]);
    const [refreshCart, setRefreshCart] = useState(false);
    const [subTotal, setSubTotal] = useState(0);
    const [totalDiskon, setTotalDiskon] = useState(0);
    const [dataDiskon, setDataDiskon] = useState([]);
    const [aktifDiskon, setAktifDiskon] = useState([]);
    const [modalDiskon, setModalDiskon] = useState(false);
    const [pembayaran, setPembayaran] = useState(0);
    const [kembalian, setKembalian] = useState(0);
    const [loader, setLoader] = useState(false);

    const [kategoriProduk, setKategoriProduk] = useState([]);

    const [allData, setAllData] = useState({
        current_page: 1,
        data: [],
        first_page_url: "",
        from: 1,
        last_page: 1,
        last_page_url: "",
        links: "",
        next_page_url: null,
        path: "",
        per_page: 10,
        prev_page_url: null,
        to: 2,
        total: 1,
    });

    const [total, setTotal] = useState(0);
    const [kategori, setKategori] = useState("");

    let [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    // fetch pertama local storage
    useEffect(() => {
        const local = JSON.parse(localStorage.getItem("cartaktif"));
        if (local) {
            setCart(local);
        }
    }, []);

    //set local storage cart aktif
    useEffect(() => {
        if (refreshCart == true) {
            localStorage.setItem("cartaktif", JSON.stringify(cart));
            setRefreshCart(false);
        }
    }, [refreshCart, setRefreshCart]);

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    //set total pembayaran
    useEffect(() => {
        if (cart.length > 0) {
            const sum = cart.reduce((accumulator, value) => {
                return accumulator + value.harga;
            }, 0);
            setSubTotal(sum);
            setTotal(subTotal - totalDiskon);
        } else {
            setSubTotal(0);
            setTotal(0);
            setTotalDiskon(0);
        }
    }, [cart, setCart, setSubTotal, subTotal, totalDiskon, setTotalDiskon]);

    // hitung kembalian
    useEffect(() => {
        if (pembayaran == undefined) {
            setPembayaran(0);
        }
        if (pembayaran < total) {
            setKembalian(0);
        } else {
            setKembalian(pembayaran - total);
        }
    }, [pembayaran, setPembayaran]);

    // fetch data produk
    useEffect(() => {
        setLoader(true);
        setReloadTable(false);
        axios
            .get(
                `${
                    import.meta.env.VITE_ALL_BASE_URL
                }/transaksi/produk?page=${page}&q=${search}&kategori=${kategori}`,
                {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token"),
                    },
                }
            )
            .then((res) => {
                setAllData({
                    current_page: res.data.current_page,
                    data: [...res.data.data],
                    first_page_url: res.data.first_page_url,
                    from: res.data.from,
                    last_page: res.data.last_page,
                    last_page_url: res.data.last_page_url,
                    links: res.data.links,
                    next_page_url: res.data.next_page_url,
                    path: res.data.path,
                    per_page: res.data.per_page,
                    prev_page_url: res.data.prev_page_url,
                    to: res.data.to,
                    total: res.data.total,
                });
                setPage(res.data.current_page);
                setLoader(false);
            })
            .catch((error) => {
                if (error.response.status == 403) {
                    Cookies.remove("token");
                    navigate("/");
                } else {
                    alert(error.response.data.error);
                }
                setLoader(false);
            });
    }, [
        page,
        setPage,
        search,
        setSearch,
        reloadTable,
        setReloadTable,
        kategori,
        setKategori,
    ]);

    //fetch kategori & diskon
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_ALL_BASE_URL}/transaksi/create`, {
                headers: {
                    Authorization: "Bearer " + Cookies.get("token"),
                },
            })
            .then((res) => {
                setKategoriProduk([...res.data.kategori]);
                setDataDiskon([...res.data.diskon]);
            })
            .catch((error) => {
                if (error.response.status == 403) {
                    Cookies.remove("token");
                    navigate("/");
                } else {
                    alert(error.response.data.error);
                }
            });
    }, []);

    // tambah ke cart
    const addToCart = (index) => {
        const dataProduk = allData.data[index];
        if (cart !== null) {
            const checkcart = cart.filter((fill) => fill.id == dataProduk.id);
            if (checkcart.length > 0) {
                if (dataProduk.stok > checkcart[0].qty) {
                    if (dataProduk.data_diskon !== null) {
                        setCart(
                            cart.map((datacart) => {
                                if (datacart.id == dataProduk.id) {
                                    return {
                                        ...datacart,
                                        qty: datacart.qty + 1,
                                        harga:
                                            datacart.harga +
                                            (dataProduk.harga -
                                                dataProduk.data_diskon
                                                    .potongan_harga),
                                    };
                                } else {
                                    return datacart;
                                }
                            })
                        );
                    } else {
                        setCart(
                            cart.map((datacart) => {
                                if (datacart.id == dataProduk.id) {
                                    return {
                                        ...datacart,
                                        qty: datacart.qty + 1,
                                        harga:
                                            datacart.harga + dataProduk.harga,
                                    };
                                } else {
                                    return datacart;
                                }
                            })
                        );
                    }
                } else {
                    alert("Stok Barang Tidak Cukup");
                }
            } else {
                if (dataProduk.data_diskon !== null) {
                    setCart([
                        ...cart,
                        {
                            id: dataProduk.id,
                            gambar: dataProduk.gambar,
                            nama: dataProduk.nama,
                            qty: 1,
                            harga:
                                dataProduk.harga -
                                dataProduk.data_diskon.potongan_harga,
                            id_kategori: dataProduk.id_kategori,
                            data_diskon: dataProduk.data_diskon,
                        },
                    ]);
                } else {
                    setCart([
                        ...cart,
                        {
                            id: dataProduk.id,
                            gambar: dataProduk.gambar,
                            nama: dataProduk.nama,
                            qty: 1,
                            harga: dataProduk.harga,
                            id_kategori: dataProduk.id_kategori,
                            data_diskon: dataProduk.data_diskon,
                        },
                    ]);
                }
            }
        } else {
            if (dataProduk.data_diskon !== null) {
                setCart([
                    {
                        id: dataProduk.id,
                        gambar: dataProduk.gambar,
                        nama: dataProduk.nama,
                        qty: 1,
                        harga:
                            dataProduk.harga -
                            dataProduk.data_diskon.potongan_harga,
                        id_kategori: dataProduk.id_kategori,
                        data_diskon: dataProduk.data_diskon,
                    },
                ]);
            } else {
                setCart([
                    {
                        id: dataProduk.id,
                        gambar: dataProduk.gambar,
                        nama: dataProduk.nama,
                        qty: 1,
                        harga: dataProduk.harga,
                        id_kategori: dataProduk.id_kategori,
                        data_diskon: dataProduk.data_diskon,
                    },
                ]);
            }
        }
        setRefreshCart(true);
    };

    // tambah qty produk
    const addQty = (id_produk) => {
        const dataProduk = allData.data.filter((fill) => fill.id == id_produk);
        setCart(
            cart.map((datacart) => {
                if (datacart.id == id_produk) {
                    if (dataProduk[0].stok > datacart.qty) {
                        if (datacart.data_diskon !== null) {
                            return {
                                ...datacart,
                                qty: datacart.qty + 1,
                                harga:
                                    datacart.harga +
                                    (dataProduk[0].harga -
                                        dataProduk[0].data_diskon
                                            .potongan_harga),
                            };
                        } else {
                            return {
                                ...datacart,
                                qty: datacart.qty + 1,
                                harga: datacart.harga + dataProduk[0].harga,
                            };
                        }
                    } else {
                        alert("Stok Barang Tidak Cukup");
                        return datacart;
                    }
                } else {
                    return datacart;
                }
            })
        );
        setRefreshCart(true);
    };

    // mengurangi qty produk
    const decQty = (id_produk) => {
        const dataProduk = allData.data.filter((fill) => fill.id == id_produk);
        setCart(
            cart.map((datacart) => {
                if (datacart.id == id_produk) {
                    if (datacart.data_diskon !== null) {
                        return {
                            ...datacart,
                            qty: datacart.qty - 1,
                            harga:
                                datacart.harga -
                                (dataProduk[0].harga -
                                    dataProduk[0].data_diskon.potongan_harga),
                        };
                    } else {
                        return {
                            ...datacart,
                            qty: datacart.qty - 1,
                            harga: datacart.harga - dataProduk[0].harga,
                        };
                    }
                } else {
                    return datacart;
                }
            })
        );
        setRefreshCart(true);
    };

    // hapus produk dari cart
    const removeItemCart = (id_produk) => {
        setCart(cart.filter((datacart) => datacart.id !== id_produk));
        setRefreshCart(true);
    };

    // atur aktif diskon ke total diskon
    useEffect(() => {
        setTotalDiskon(0);
        aktifDiskon.map((data) => {
            setTotalDiskon(totalDiskon + data.potongan_harga);
        });
    }, [aktifDiskon, setAktifDiskon]);

    const handleCheckout = (e) => {
        e.preventDefault();
        if (pembayaran < total) {
            alert("Pembayaran Tidak Bisa Lebih Kecil Dari Total Harga");
        } else {
            Swal.fire({
                title: "Yakin?",
                text: "Transaksi Akan Disimpan, Pastikan Data Sudah Benar",
                icon: "info",
                showCancelButton: true,
                reverseButtons: true,
                confirmButtonText: "Ya!",
                cancelButtonText: "Batal",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Now Loading!",
                        didOpen: () => {
                            Swal.showLoading();
                        },
                    });
                    axios
                        .post(
                            `${
                                import.meta.env.VITE_ALL_BASE_URL
                            }/transaksi/store`,
                            { cart: cart, diskon: aktifDiskon },
                            {
                                headers: {
                                    Authorization:
                                        "Bearer " + Cookies.get("token"),
                                },
                            }
                        )
                        .then((res) => {
                            setCart([]);
                            setReloadTable(true);
                            setRefreshCart(true);
                            Swal.fire({
                                title: "Success!",
                                text: "Transaksi Berhasil, Cetak Invoice?",
                                icon: "success",
                                showCancelButton: true,
                                reverseButtons: true,
                                confirmButtonText: "Ya, Cetak Invoice!",
                                cancelButtonText: "Tidak",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.open(
                                        res.data.invoice,
                                        "_blank",
                                        "noreferrer"
                                    );
                                }
                            });
                        })
                        .catch((error) => {
                            if (error.response.status == 403) {
                                Cookies.remove("token");
                                navigate("/");
                            } else {
                                console.log(error);
                                Swal.fire({
                                    title: "Error!",
                                    text: error.response.data.error,
                                    icon: "error",
                                });
                            }
                        });
                }
            });
        }
    };

    return (
        <>
            <PanelLayout>
                <div className="flex-grow flex flex-row h-screen">
                    {/* store menu */}
                    <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
                        <section>
                            <div className="px-4">
                                <div className="mt-8 flex justify-end h-full">
                                    <div className="relative">
                                        <select
                                            value={kategori}
                                            onChange={(e) =>
                                                setKategori(e.target.value)
                                            }
                                            className="h-full border block appearance-none w-full bg-white border-gray-300 text-gray-700 py-2 px-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        >
                                            <option value="">
                                                Pilih Kategori
                                            </option>
                                            {kategoriProduk.map((kat, x) => {
                                                return (
                                                    <option
                                                        key={x}
                                                        value={kat.id}
                                                    >
                                                        {kat.nama}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <div className="pointer-events-none absolute top-3 right-0 flex items-center px-2 text-gray-700">
                                            <svg
                                                className="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg
                                                className="w-4 h-4 text-gray-500 "
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="table-search-users"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 w-80 bg-white focus:outline-none"
                                            placeholder="Cari Data..."
                                        />
                                    </div>
                                </div>
                                {allData.data.length > 0 && loader == false ? (
                                    <ul className="mt-8 grid gap-4 sm:grid-cols-1 lg:grid-cols-4 ">
                                        {allData.data.map((produk, i) => {
                                            return (
                                                <ProductCard
                                                    data={produk}
                                                    key={i}
                                                    onClick={() => addToCart(i)}
                                                ></ProductCard>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <div className="grid place-content-center mt-24 items-center w-full text-gray-300">
                                        {loader == true ? (
                                            <Loader></Loader>
                                        ) : (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-86 h-52"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                                                    />
                                                </svg>
                                                <dt>Product Tidak Ditemukan</dt>
                                            </>
                                        )}
                                    </div>
                                )}
                                <div className="flex justify-end w-full gap-24 mt-24">
                                    <ol className="flex justify-center gap-1 text-xs font-medium mt-auto mb-auto">
                                        <li>
                                            <button
                                                type="button"
                                                disabled={
                                                    allData.prev_page_url ==
                                                    null
                                                }
                                                onClick={() => setPage(page--)}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded border border-cyan-500 bg-white text-cyan-500 rtl:rotate-180"
                                            >
                                                <span className="sr-only">
                                                    Prev Page
                                                </span>
                                                <svg
                                                    className="w-3 h-3"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 10 16"
                                                >
                                                    <path d="M8.766.566A2 2 0 0 0 6.586 1L1 6.586a2 2 0 0 0 0 2.828L6.586 15A2 2 0 0 0 10 13.586V2.414A2 2 0 0 0 8.766.566Z" />
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                disabled={
                                                    allData.next_page_url ==
                                                    null
                                                }
                                                onClick={() => setPage(page++)}
                                                className="inline-flex text-white px-4 py-2 h-auto w-auto items-center justify-center rounded bg-cyan-500 rtl:rotate-180"
                                            >
                                                <span className="mt-auto mb-auto">
                                                    Selanjutnya&nbsp;
                                                </span>
                                                <svg
                                                    className="w-3 h-3 text-white"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 10 16"
                                                >
                                                    <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
                                                </svg>
                                            </button>
                                        </li>
                                    </ol>
                                    <div className="flex justify-end my-auto gap-1">
                                        <div className="text-sm text-gray-700 font-normal my-auto">
                                            Menampilkan {allData.from}-
                                            {allData.to} Dari {allData.total}{" "}
                                            Data
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    {/* end of store menu */}
                    {/* right sidebar */}
                    <div className="w-4/12 flex flex-col bg-blue-gray-50 h-screen flex-shrink-0 rounded-l-3xl px-2 py-4">
                        <section>
                            <div className="px-2 py-8 lg:px-4 bg-cyan-400 rounded-3xl">
                                <div className="mx-auto max-w-3xl">
                                    <div>
                                        <div className="px-4 w-full h-[21rem] overflow-y-auto rounded-lg">
                                            <ul className="space-y-4">
                                                {cart.length <= 0 ? (
                                                    <div className="grid place-content-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-32 h-32 text-white"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                                            />
                                                        </svg>
                                                        <dt className="text-white">
                                                            Keranjang Kosong
                                                        </dt>
                                                    </div>
                                                ) : (
                                                    cart.map((keranjang, i) => {
                                                        return (
                                                            <li key={i}>
                                                                <CartProduct
                                                                    data={
                                                                        keranjang
                                                                    }
                                                                >
                                                                    <div className="flex flex-1 items-center justify-end gap-1">
                                                                        <div className="flex items-center rounded">
                                                                            <button
                                                                                type="button"
                                                                                disabled={
                                                                                    keranjang.qty <
                                                                                    2
                                                                                }
                                                                                onClick={() =>
                                                                                    decQty(
                                                                                        keranjang.id
                                                                                    )
                                                                                }
                                                                                className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                                                                            >
                                                                                −
                                                                            </button>
                                                                            <input
                                                                                type="number"
                                                                                min={
                                                                                    1
                                                                                }
                                                                                value={
                                                                                    keranjang.qty
                                                                                }
                                                                                disabled
                                                                                id="Line3Qty"
                                                                                className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-black [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    addQty(
                                                                                        keranjang.id
                                                                                    )
                                                                                }
                                                                                className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                                                                            >
                                                                                +
                                                                            </button>
                                                                        </div>
                                                                        <button
                                                                            onClick={() =>
                                                                                removeItemCart(
                                                                                    keranjang.id
                                                                                )
                                                                            }
                                                                            className="text-gray-600 transition hover:text-red-600"
                                                                        >
                                                                            <span className="sr-only">
                                                                                Remove
                                                                                item
                                                                            </span>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                fill="none"
                                                                                viewBox="0 0 24 24"
                                                                                strokeWidth="1.5"
                                                                                stroke="currentColor"
                                                                                className="h-4 w-4"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </CartProduct>
                                                            </li>
                                                        );
                                                    })
                                                )}
                                            </ul>
                                        </div>
                                        <div className="px-4 mt-8 flex justify-end border-t border-gray-100 pt-8">
                                            <div className="w-screen max-w-lg space-y-4">
                                                <dl className="space-y-0.5 text-sm text-gray-700">
                                                    <div className="flex justify-between">
                                                        <dt>Subtotal</dt>
                                                        <dd>
                                                            {rupiah(subTotal)}
                                                        </dd>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <dt>Diskon</dt>
                                                        <dd>
                                                            {rupiah(
                                                                totalDiskon
                                                            )}
                                                        </dd>
                                                    </div>
                                                    <div className="flex justify-between !text-base font-medium">
                                                        <dt>Total</dt>
                                                        <dd>{rupiah(total)}</dd>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <dt className="my-auto">
                                                            Pembayaran
                                                        </dt>
                                                        <dd>
                                                            <CurrencyInput
                                                                id="pembayaran"
                                                                name="pembayaran"
                                                                className="bg-gray-50 rounded-sm text-gray-900 focus:outline-none text-sm block h-10 w-32 p-2.5"
                                                                placeholder="Please enter a number"
                                                                defaultValue={0}
                                                                disabled={
                                                                    cart.length ==
                                                                    0
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setPembayaran(
                                                                        value
                                                                    )
                                                                }
                                                                prefix="Rp. "
                                                            />
                                                        </dd>
                                                    </div>
                                                    <div className="flex justify-between !text-base font-medium">
                                                        <dt>Kembalian</dt>
                                                        <dd>
                                                            {rupiah(kembalian)}
                                                        </dd>
                                                    </div>
                                                </dl>
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setModalDiskon(true)
                                                        }
                                                        className="inline-flex items-center text-xs justify-center rounded-xl bg-white px-2 py-0.5 text-black"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-3 h-3"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                            />
                                                        </svg>
                                                        Tambah Diskon
                                                    </button>
                                                    {aktifDiskon.length > 0 ? (
                                                        <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="-ms-1 me-1.5 h-4 w-4"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                                                                />
                                                            </svg>
                                                            <p className="whitespace-nowrap text-xs">
                                                                {
                                                                    aktifDiskon.length
                                                                }{" "}
                                                                Diskon
                                                                Diterapkan
                                                            </p>
                                                        </span>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <form onSubmit={handleCheckout}>
                                                    <div className="flex justify-end">
                                                        <button
                                                            disabled={
                                                                cart.length <= 0
                                                            }
                                                            type="submit"
                                                            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                                                        >
                                                            Checkout
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    {/* end of right sidebar */}
                </div>
                <ModalSecondary
                    header={"Tambah Diskon"}
                    open={modalDiskon}
                    closeModal={() => setModalDiskon(false)}
                >
                    <div className="pb-4 border-b border-b-black space-y-4">
                        <h6>Diskon Yang Diterapkan</h6>
                        {aktifDiskon.length <= 0 ? (
                            <p className="text-black text-center text-sm w-full p-2.5">
                                Tidak Ada Diskon Diterapkan
                            </p>
                        ) : (
                            aktifDiskon.map((dis, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="flex justify-between w-full"
                                    >
                                        <div className="w-full text-black me-3">
                                            <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                                {dis.nama} -{" "}
                                                {rupiah(dis.potongan_harga)}
                                            </p>
                                        </div>
                                        <div
                                            className="inline-flex justify-end rounded-md shadow-sm m-auto"
                                            role="group"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setAktifDiskon(
                                                        aktifDiskon.filter(
                                                            (data) =>
                                                                data.id !==
                                                                dis.id
                                                        )
                                                    )
                                                }
                                                className="p-2.5 text-sm font-medium m-auto text-white bg-red-500 border border-gray-200 rounded-lg hover:bg-red-600"
                                            >
                                                -
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <h6>Pilihh Diskon</h6>
                    {dataDiskon.length > 0 ? (
                        dataDiskon.map((any, i) => {
                            if (
                                aktifDiskon.filter((tes) => tes.id == any.id)
                                    .length > 0
                            ) {
                                return "";
                            } else {
                                return (
                                    <div
                                        key={i}
                                        className="flex justify-between w-full"
                                    >
                                        <div className="w-full text-black me-3">
                                            <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                                {any.nama} -{" "}
                                                {rupiah(any.potongan_harga)}
                                            </p>
                                        </div>
                                        <div
                                            className="inline-flex justify-end rounded-md shadow-sm m-auto"
                                            role="group"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (cart.length > 0) {
                                                        setAktifDiskon([
                                                            ...aktifDiskon,
                                                            any,
                                                        ]);
                                                    } else {
                                                        alert(
                                                            "Keranjang Sedang Kosong, Tidak Dapat Menerapkan Diskon"
                                                        );
                                                    }
                                                }}
                                                className="p-2.5 text-sm font-medium m-auto text-white bg-green-500 border border-gray-200 rounded-lg hover:bg-green-600"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                );
                            }
                        })
                    ) : (
                        <p className="text-black text-center text-sm w-full p-2.5">
                            Tidak Ada Diskon Yang Diterapkan
                        </p>
                    )}
                </ModalSecondary>
            </PanelLayout>
        </>
    );
};
