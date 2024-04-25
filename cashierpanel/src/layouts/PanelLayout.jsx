import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const PanelLayout = ({ children }) => {
    const location = useLocation();
    const [hoverPos, setHoverPos] = useState(false);
    const [hoverKategori, setHoverKategori] = useState(false);
    const [hoverProduct, setHoverProduct] = useState(false);
    const [hoverProfile, setHoverProfile] = useState(false);
    const [hoverPembelian, setHoverPembelian] = useState(false);
    const [hoverDiskon, setHoverDiskon] = useState(false);

    return (
        <>
            <div className="hide-print flex flex-row h-screen antialiased text-blue-gray-800">
                {/* left sidebar */}
                <div className="flex flex-row w-auto h-full flex-shrink-0 pl-4 pr-2 py-4">
                    <div className="flex flex-col items-center py-4 flex-shrink-0 w-20 bg-cyan-500 rounded-3xl">
                        <Link
                            to={"/panel/dashboard"}
                            className="flex items-center"
                        >
                            <img
                                className="h-12 w-12"
                                src="/logo_olivia.png"
                                alt="logo"
                            />
                        </Link>
                        <ul className="flex flex-col space-y-2 mt-24">
                            <li className="relative">
                                <Link
                                    to={"/panel/dashboard"}
                                    className="flex items-center"
                                >
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
                                </Link>
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
                            <li className="relative">
                                <Link
                                    to={"/panel/diskon"}
                                    className="flex items-center"
                                >
                                    <span
                                        className={
                                            "flex items-center justify-center h-12 w-12 rounded-2xl " +
                                            (location.pathname ==
                                            "/panel/diskon"
                                                ? "text-black bg-cyan-200 hover:bg-cyan-700"
                                                : "text-black bg-white hover:bg-cyan-400")
                                        }
                                        onMouseEnter={() =>
                                            setHoverDiskon(true)
                                        }
                                        onMouseLeave={() =>
                                            setHoverDiskon(false)
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
                                                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                                <div
                                    className={
                                        "z-20 top-1 left-14 " +
                                        (hoverDiskon ? "absolute" : "hidden")
                                    }
                                >
                                    <div className="flex items-center flex-row-reverse mb-4">
                                        <div className="bg-cyan-200 inline-flex shadow-2xl items-center justify-center font-bold text-sm w-full text-center rounded-2xl text-black p-3 relative">
                                            <div>Diskon</div>
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
