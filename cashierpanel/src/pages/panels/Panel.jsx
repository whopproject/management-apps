import { CartProduct } from "../../components/CartProduct";
import { ProductCard } from "../../components/ProductCard";
import { PanelLayout } from "../../layouts/PanelLayout";
import $ from "jquery";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { ModalPrimary } from "../../components/ModalPrimary";
import CurrencyInput from "react-currency-input-field";
import { Loader } from "../../components/Loader";

export default function Panel() {
    const [data, setData] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(true);
    const [cart, setCart] = useState([]);
    const [refreshCart, setRefreshCart] = useState(false);
    const [subTotal, setSubTotal] = useState(0);
    const [totalDiskon, setTotalDiskon] = useState(0);
    const [dataDiskon, setDataDiskon] = useState([]);
    const [modalDiskon, setModalDiskon] = useState(false);
    const [pembayaran, setPembayaran] = useState(0);
    const [kembalian, setKembalian] = useState(0);
    const [loader, setLoader] = useState(false);

    const [total, setTotal] = useState(0);
    const [kategori, setKategori] = useState([]);

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
                return accumulator + value.price;
            }, 0);
            setSubTotal(sum);
            setTotal(subTotal - totalDiskon);
        } else {
            setSubTotal(0);
            setTotal(0);
            setTotalDiskon(0);
        }
    }, [cart, setCart, setSubTotal, subTotal]);

    // parsing kembalian
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

    useEffect(() => {
        $("body").on("click", function () {
            const details = document.querySelectorAll("details");
            details.forEach((detail) => {
                detail.removeAttribute("open");
            });
        });
    });

    // fetch data produk
    useEffect(() => {
        if (fetchStatus === true) {
            setLoader(true);
            axios
                .get("https://fakestoreapi.com/products?limit=8")
                .then((res) => {
                    setData([...res.data]);
                    setLoader(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoader(false);
                });
            setFetchStatus(false);
        }
    }, [fetchStatus, setFetchStatus]);

    // untuk ngurangin stok produk jika sudah di cartaktif.
    // useEffect(() => {

    // })

    //fetch kategori
    useEffect(() => {
        axios
            .get("https://fakestoreapi.com/products/categories")
            .then((res) => {
                setKategori([...res.data]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // tambah ke cart
    const addToCart = (index) => {
        const dataProduk = data[index];
        if (cart !== null) {
            const checkcart = cart.filter(
                (fill) => fill.id_produk == dataProduk.id
            );
            if (checkcart.length > 0) {
                setCart(
                    cart.map((datacart) => {
                        if (datacart.id_produk == dataProduk.id) {
                            return {
                                ...datacart,
                                qty: datacart.qty + 1,
                                price: datacart.price + dataProduk.price,
                            };
                        } else {
                            return datacart;
                        }
                    })
                );
            } else {
                setCart([
                    ...cart,
                    {
                        id_produk: dataProduk.id,
                        image: dataProduk.image,
                        title: dataProduk.title,
                        qty: 1,
                        price: dataProduk.price,
                    },
                ]);
            }
        } else {
            setCart([
                {
                    id_produk: dataProduk.id,
                    image: dataProduk.image,
                    title: dataProduk.title,
                    qty: 1,
                    price: dataProduk.price,
                },
            ]);
        }
        setRefreshCart(true);
    };

    // tambah qty produk
    const addQty = (id_produk) => {
        const dataProduk = data.filter((fill) => fill.id == id_produk);
        setCart(
            cart.map((datacart) => {
                if (datacart.id_produk == id_produk) {
                    return {
                        ...datacart,
                        qty: datacart.qty + 1,
                        price: datacart.price + dataProduk[0].price,
                    };
                } else {
                    return datacart;
                }
            })
        );
        setRefreshCart(true);
    };

    // mengurangi qty produk
    const decQty = (id_produk) => {
        const dataProduk = data.filter((fill) => fill.id == id_produk);
        setCart(
            cart.map((datacart) => {
                if (datacart.id_produk == id_produk) {
                    return {
                        ...datacart,
                        qty: datacart.qty - 1,
                        price: datacart.price - dataProduk[0].price,
                    };
                } else {
                    return datacart;
                }
            })
        );
        setRefreshCart(true);
    };

    // hapus produk dari cart
    const removeItemCart = (id_produk) => {
        setCart(cart.filter((datacart) => datacart.id_produk !== id_produk));
        setRefreshCart(true);
    };

    return (
        <>
            <PanelLayout>
                <div className="flex-grow flex flex-row h-screen">
                    {/* store menu */}
                    <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
                        <section>
                            <div className="px-4">
                                <div className="mt-8 sm:flex sm:items-center sm:justify-between">
                                    <div className="block sm:hidden">
                                        <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                                            <span className="text-sm font-medium">
                                                {" "}
                                                Filters &amp; Sorting{" "}
                                            </span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-4 rtl:rotate-180"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="hidden sm:flex sm:gap-4">
                                        <div className="relative">
                                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                                <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                                                    <span className="text-sm font-medium">
                                                        Kategori
                                                    </span>
                                                    <span className="transition group-open:-rotate-180">
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
                                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                            />
                                                        </svg>
                                                    </span>
                                                </summary>
                                                <div className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0">
                                                    <div className="w-96 rounded border border-gray-200 bg-white">
                                                        <header className="flex items-center justify-between p-4">
                                                            <span className="text-sm text-gray-700">
                                                                0 Selected
                                                            </span>
                                                            <button
                                                                type="button"
                                                                className="text-sm text-gray-900 underline underline-offset-4"
                                                            >
                                                                Reset
                                                            </button>
                                                        </header>
                                                        <ul className="space-y-1 border-t border-gray-200 p-4">
                                                            {kategori.map(
                                                                (kat, i) => {
                                                                    return (
                                                                        <li
                                                                            key={
                                                                                i
                                                                            }
                                                                        >
                                                                            <label
                                                                                htmlFor="FilterInStock"
                                                                                className="inline-flex items-center gap-2"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="FilterInStock"
                                                                                    className="size-5 rounded border-gray-300"
                                                                                />
                                                                                <span className="text-sm font-medium text-gray-700">
                                                                                    {
                                                                                        kat
                                                                                    }
                                                                                </span>
                                                                            </label>
                                                                        </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </details>
                                        </div>
                                    </div>
                                    <div className="hidden sm:block w-96">
                                        <label
                                            htmlFor="default-search"
                                            className="mb-2 text-sm font-medium text-gray-900 sr-only"
                                        >
                                            Search
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="search"
                                                id="default-search"
                                                className="block w-full p-2 focus:outline-none max-sm:text-xs text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                                                placeholder="Cari Product ..."
                                                required=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                {data.length > 0 ? (
                                    <ul className="mt-8 grid gap-4 sm:grid-cols-1 lg:grid-cols-4 ">
                                        {data.map((produk, i) => {
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
                                            <button className="inline-flex h-8 w-8 items-center justify-center rounded border border-cyan-500 bg-white text-cyan-500 rtl:rotate-180">
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
                                            <button className="inline-flex text-white px-4 py-2 h-auto w-auto items-center justify-center rounded bg-cyan-500 rtl:rotate-180">
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
                                            Menampilkan 10 Dari 25 Data
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
                                                                                        keranjang.id_produk
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
                                                                                        keranjang.id_produk
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
                                                                                    keranjang.id_produk
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
                                                    {dataDiskon.length > 0 ? (
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
                                                                    dataDiskon.length
                                                                }{" "}
                                                                Diskon
                                                                Diterapkan
                                                            </p>
                                                        </span>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="flex justify-end">
                                                    <a
                                                        href="#"
                                                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                                                    >
                                                        Checkout
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    {/* end of right sidebar */}
                </div>
                <ModalPrimary
                    header={"Tambah Diskon"}
                    open={modalDiskon}
                    closeModal={() => setModalDiskon(false)}
                ></ModalPrimary>
            </PanelLayout>
        </>
    );
}
