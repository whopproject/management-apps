import { PanelLayout } from "../../layouts/PanelLayout";

export const Dashboard = () => {
    return (
        <>
            <PanelLayout>
                <div className="flex-grow flex flex-row h-screen w-full mt-6">
                    <div className="w-full px-8">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center justify-start h-24 border-2 bg-gray-50 rounded-lg overflow-hidden shadow">
                                <div className="h-full w-24 p-4 bg-blue-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-12 w-12 text-white m-auto"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                                        />
                                    </svg>
                                </div>
                                <div className="px-4 text-gray-700">
                                    <h3 className="text-sm tracking-wider">
                                        Penjualan Hari Ini
                                    </h3>
                                    <p className="text-3xl">12,768</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-start h-24 border-2 bg-gray-50 rounded-lg overflow-hidden shadow">
                                <div className="h-full w-24 p-4 bg-green-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-12 w-12 text-white m-auto"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                        />
                                    </svg>
                                </div>
                                <div className="px-4 text-gray-700">
                                    <h3 className="text-sm tracking-wider">
                                        Produk Terjual Hari Ini
                                    </h3>
                                    <p className="text-3xl">12,768</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-start h-24 border-2 bg-gray-50 rounded-lg overflow-hidden shadow">
                                <div className="h-full w-24 p-4 bg-yellow-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-12 w-12 text-white m-auto"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                        />
                                    </svg>
                                </div>
                                <div className="px-4 text-gray-700">
                                    <h3 className="text-sm tracking-wider">
                                        Pembelian Hari Ini
                                    </h3>
                                    <p className="text-3xl">12,768</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center h-48 mb-4 border-2 rounded-lg bg-gray-50">
                            <p className="text-2xl text-gray-500">
                                <svg
                                    className="w-3.5 h-3.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 1v16M1 9h16"
                                    />
                                </svg>
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center justify-center h-28 border-2 rounded-lg bg-gray-50">
                                <p className="text-2xl text-gray-400 dark:text-gray-500">
                                    <svg
                                        className="w-3.5 h-3.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 18"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 1v16M1 9h16"
                                        />
                                    </svg>
                                </p>
                            </div>
                            <div className="flex items-center justify-center h-28 border-2 rounded-lg bg-gray-50">
                                <p className="text-2xl text-gray-400 dark:text-gray-500">
                                    <svg
                                        className="w-3.5 h-3.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 18"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 1v16M1 9h16"
                                        />
                                    </svg>
                                </p>
                            </div>
                            <div className="flex items-center justify-center h-28 border-2 rounded-lg bg-gray-50">
                                <p className="text-2xl text-gray-400 dark:text-gray-500">
                                    <svg
                                        className="w-3.5 h-3.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 18"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 1v16M1 9h16"
                                        />
                                    </svg>
                                </p>
                            </div>
                            <div className="flex items-center justify-center h-28 border-2 rounded-lg bg-gray-50">
                                <p className="text-2xl text-gray-400 dark:text-gray-500">
                                    <svg
                                        className="w-3.5 h-3.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 18"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 1v16M1 9h16"
                                        />
                                    </svg>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </PanelLayout>
        </>
    );
};
