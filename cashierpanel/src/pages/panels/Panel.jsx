import { PanelLayout } from "../../layouts/PanelLayout";

export const Panel = () => {
    return (
        <>
            <PanelLayout>
                <div className="flex-grow flex">
                    {/* store menu */}
                    <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
                        <div className="flex px-2 flex-row relative">
                            <div className="absolute left-5 top-3 px-2 py-2 rounded-full bg-cyan-500 text-white">
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
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none"
                                placeholder="Cari menu ..."
                            />
                        </div>
                        <div className="h-full overflow-hidden mt-4">
                            <div className="h-full overflow-y-auto px-2">
                                <div className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
                                    <div className="w-full text-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-24 w-24 inline-block"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                                            />
                                        </svg>
                                        <p className="text-xl">
                                            YOU DON'T HAVE
                                            <br />
                                            ANY PRODUCTS TO SHOW
                                        </p>
                                    </div>
                                </div>
                                <div className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
                                    <div className="w-full text-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-24 w-24 inline-block"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                        <p className="text-xl">
                                            EMPTY SEARCH RESULT
                                            <br />
                                            "
                                            <span
                                                x-text="keyword"
                                                className="font-semibold"
                                            />
                                            "
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 pb-3"></div>
                            </div>
                        </div>
                    </div>
                    {/* end of store menu */}
                    {/* right sidebar */}
                    <div className="w-5/12 flex flex-col bg-blue-gray-50 h-full bg-white pr-4 pl-2 py-4">
                        <div className="bg-white rounded-3xl flex flex-col h-full shadow">
                            {/* empty cart */}
                            <div className="flex-1 w-full p-4 opacity-25 select-none flex flex-col flex-wrap content-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-16 inline-block"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <p>CART EMPTY</p>
                            </div>
                            {/* cart items */}
                            <div className="flex-1 flex flex-col overflow-auto">
                                <div className="h-16 text-center flex justify-center">
                                    <div className="pl-8 text-left text-lg py-4 relative">
                                        {/* cart icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 inline-block"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <div className="text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3" />
                                    </div>
                                    <div className="flex-grow px-8 text-right text-lg py-4 relative">
                                        {/* trash button */}
                                        <button className="text-blue-gray-300 hover:text-pink-500 focus:outline-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 inline-block"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1 w-full px-4 overflow-auto"></div>
                            </div>
                            {/* end of cart items */}
                            {/* payment info */}
                            <div className="select-none h-auto w-full text-center pt-3 pb-4 px-4">
                                <div className="flex mb-3 text-lg font-semibold text-blue-gray-700">
                                    <div>TOTAL</div>
                                    <div className="text-right w-full" />
                                </div>
                                <div className="mb-3 text-blue-gray-700 px-3 pt-2 pb-3 rounded-lg bg-blue-gray-50">
                                    <div className="flex text-lg font-semibold">
                                        <div className="flex-grow text-left">
                                            CASH
                                        </div>
                                        <div className="flex text-right">
                                            <div className="mr-2">Rp</div>
                                            <input
                                                type="text"
                                                className="w-28 text-right bg-white shadow rounded-lg focus:bg-white focus:shadow-lg px-2 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        {"{"}
                                        {"{"}--{" "}
                                        <template x-for="money in moneys" /> --
                                        {"}"}
                                        {"}"}
                                    </div>
                                </div>
                                <div className="flex mb-3 text-lg font-semibold bg-cyan-50 text-blue-gray-700 rounded-lg py-2 px-3">
                                    <div className="text-cyan-800">CHANGE</div>
                                    <div className="text-right flex-grow text-cyan-600"></div>
                                </div>
                                <div className="flex mb-3 text-lg font-semibold bg-pink-100 text-blue-gray-700 rounded-lg py-2 px-3">
                                    <div className="text-right flex-grow text-pink-600"></div>
                                </div>
                                <div className="flex justify-center mb-3 text-lg font-semibold bg-cyan-50 text-cyan-700 rounded-lg py-2 px-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 inline-block"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                        />
                                    </svg>
                                </div>
                                <button className="text-white rounded-2xl text-lg w-full py-3 focus:outline-none">
                                    SUBMIT
                                </button>
                            </div>
                            {/* end of payment info */}
                        </div>
                    </div>
                    {/* end of right sidebar */}
                </div>
            </PanelLayout>
        </>
    );
};
