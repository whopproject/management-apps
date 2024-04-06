import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const PanelLayout = ({ children }) => {
    const location = useLocation();
    const [hoverPos, setHoverPos] = useState(false);
    const [hoverKategori, setHoverKategori] = useState(false);
    const [hoverProduct, setHoverProduct] = useState(false);
    const [hoverProfile, setHoverProfile] = useState(false);
    const [hoverPembelian, setHoverPembelian] = useState(false);

    return (
        <>
            <div className="hide-print flex flex-row h-screen antialiased text-blue-gray-800">
                {/* left sidebar */}
                <div className="flex flex-row w-auto flex-shrink-0 pl-4 pr-2 py-4">
                    <div className="flex flex-col items-center py-4 flex-shrink-0 w-20 bg-cyan-500 rounded-3xl">
                        <a href="#">
                            <svg
                                viewBox="0 0 28 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-cyan-700"
                            >
                                <path
                                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>
                        <ul className="flex flex-col space-y-2 mt-24">
                            <li className="relative">
                                <a href="#" className="flex items-center">
                                    <span
                                        className={
                                            "flex items-center justify-center h-12 w-12 rounded-2xl " +
                                            (location.pathname == "/"
                                                ? "text-black bg-cyan-200 hover:bg-cyan-700"
                                                : "text-black bg-white hover:bg-cyan-400")
                                        }
                                        onMouseEnter={() =>
                                            setHoverProfile(true)
                                        }
                                        onMouseLeave={() =>
                                            setHoverProfile(false)
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                                            />
                                        </svg>
                                    </span>
                                </a>
                                <div
                                    className={
                                        "z-20 top-1 left-14 " +
                                        (hoverProfile ? "absolute" : "hidden")
                                    }
                                >
                                    <div className="flex items-center flex-row-reverse mb-4">
                                        <div className="bg-cyan-200 inline-flex shadow-2xl items-center justify-center font-bold text-sm w-full text-center rounded-2xl text-black p-3 relative">
                                            <div>Dashboard</div>
                                            <div className="absolute left-0 top-1/2 rounded-bl-full transform -translate-x-1/2 -rotate-45 w-3 h-2 bg-cyan-200" />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="relative">
                                <Link
                                    to={"/panel/kasir"}
                                    className="flex items-center"
                                >
                                    <span
                                        className={
                                            "flex items-center justify-center h-12 w-12 rounded-2xl " +
                                            (location.pathname == "/panel/kasir"
                                                ? "text-black bg-cyan-200 hover:bg-cyan-700 shadow-xl"
                                                : "text-black bg-white hover:bg-cyan-400")
                                        }
                                        onMouseEnter={() => setHoverPos(true)}
                                        onMouseLeave={() => setHoverPos(false)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                                <div
                                    className={
                                        "z-20 top-1 left-14 " +
                                        (hoverPos ? "absolute" : "hidden")
                                    }
                                >
                                    <div className="flex items-center flex-row-reverse mb-4">
                                        <div className="bg-cyan-200 inline-flex shadow-2xl items-center justify-center font-bold text-sm w-full text-center rounded-2xl text-black p-3 relative">
                                            <div>Kasir</div>
                                            <div className="absolute left-0 top-1/2 rounded-bl-full transform -translate-x-1/2 -rotate-45 w-3 h-2 bg-cyan-200" />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="relative">
                                <Link
                                    to={"/panel/kategoriproduk"}
                                    className="flex items-center"
                                >
                                    <span
                                        className={
                                            "flex items-center justify-center h-12 w-12 rounded-2xl " +
                                            (location.pathname ==
                                            "/panel/kategoriproduk"
                                                ? "text-black bg-cyan-200 hover:bg-cyan-700"
                                                : "text-black bg-white hover:bg-cyan-400")
                                        }
                                        onMouseEnter={() =>
                                            setHoverKategori(true)
                                        }
                                        onMouseLeave={() =>
                                            setHoverKategori(false)
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                                <div
                                    className={
                                        "z-20 top-1 left-14 " +
                                        (hoverKategori ? "absolute" : "hidden")
                                    }
                                >
                                    <div className="flex items-center flex-row-reverse mb-4">
                                        <div className="bg-cyan-200 inline-flex shadow-2xl items-center justify-center font-bold text-sm w-full text-center rounded-2xl text-black p-3 relative">
                                            <div>Kategori</div>
                                            <div className="absolute left-0 top-1/2 rounded-bl-full transform -translate-x-1/2 -rotate-45 w-3 h-2 bg-cyan-200" />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="relative">
                                <Link
                                    to={"/panel/produk"}
                                    className="flex items-center"
                                >
                                    <span
                                        className={
                                            "flex items-center justify-center h-12 w-12 rounded-2xl " +
                                            (location.pathname ==
                                            "/panel/produk"
                                                ? "text-black bg-cyan-200 hover:bg-cyan-700"
                                                : "text-black bg-white hover:bg-cyan-400")
                                        }
                                        onMouseEnter={() =>
                                            setHoverProduct(true)
                                        }
                                        onMouseLeave={() =>
                                            setHoverProduct(false)
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                                <div
                                    className={
                                        "z-20 top-1 left-14 " +
                                        (hoverProduct ? "absolute" : "hidden")
                                    }
                                >
                                    <div className="flex items-center flex-row-reverse mb-4">
                                        <div className="bg-cyan-200 inline-flex shadow-2xl items-center justify-center font-bold text-sm w-full text-center rounded-2xl text-black p-3 relative">
                                            <div>Produk</div>
                                            <div className="absolute left-0 top-1/2 rounded-bl-full transform -translate-x-1/2 -rotate-45 w-3 h-2 bg-cyan-200" />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="relative">
                                <Link
                                    to={"/panel/pembelian"}
                                    className="flex items-center"
                                >
                                    <span
                                        className={
                                            "flex items-center justify-center h-12 w-12 rounded-2xl " +
                                            (location.pathname ==
                                            "/panel/pembelian"
                                                ? "text-black bg-cyan-200 hover:bg-cyan-700"
                                                : "text-black bg-white hover:bg-cyan-400")
                                        }
                                        onMouseEnter={() =>
                                            setHoverPembelian(true)
                                        }
                                        onMouseLeave={() =>
                                            setHoverPembelian(false)
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                                <div
                                    className={
                                        "z-20 top-1 left-14 " +
                                        (hoverPembelian ? "absolute" : "hidden")
                                    }
                                >
                                    <div className="flex items-center flex-row-reverse mb-4">
                                        <div className="bg-cyan-200 inline-flex shadow-2xl items-center justify-center font-bold text-sm w-full text-center rounded-2xl text-black p-3 relative">
                                            <div>Pembelian</div>
                                            <div className="absolute left-0 top-1/2 rounded-bl-full transform -translate-x-1/2 -rotate-45 w-3 h-2 bg-cyan-200" />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* page content */}
                {children}
            </div>
        </>
    );
};
