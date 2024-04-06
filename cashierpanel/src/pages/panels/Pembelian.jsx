import { PanelLayout } from "../../layouts/PanelLayout";

export const Pembelian = () => {
    return (
        <>
            <PanelLayout>
                <div className="flex-grow flex flex-row h-screen w-full mt-12">
                    <div className="w-full px-8 py-2">
                        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <caption className="p-5 font-semibold text-left rtl:text-right text-gray-900 bg-white">
                                    <p className="text-xl mb-4">Pembelian</p>
                                    <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
                                        <button
                                            type="button"
                                            className="text-black bg-cyan-500 hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2focus:outline-none"
                                        >
                                            Tambah Data
                                        </button>
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
                                                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:outline-none"
                                                placeholder="Cari Produk"
                                            />
                                        </div>
                                    </div>
                                </caption>
                                <thead className="text-xs text-black uppercase bg-cyan-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Product name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Color
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Apple MacBook Pro 17"
                                        </th>
                                        <td className="px-6 py-4">Silver</td>
                                        <td className="px-6 py-4">Laptop</td>
                                        <td className="px-6 py-4">$2999</td>
                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Microsoft Surface Pro
                                        </th>
                                        <td className="px-6 py-4">White</td>
                                        <td className="px-6 py-4">Laptop PC</td>
                                        <td className="px-6 py-4">$1999</td>
                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            Magic Mouse 2
                                        </th>
                                        <td className="px-6 py-4">Black</td>
                                        <td className="px-6 py-4">
                                            Accessories
                                        </td>
                                        <td className="px-6 py-4">$99</td>
                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="p-5">
                                <nav
                                    className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                                    aria-label="Table navigation"
                                >
                                    <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                                        Menampilkan&nbsp;
                                        <span className="font-semibold text-gray-900">
                                            1-10
                                        </span>
                                        &nbsp;of&nbsp;
                                        <span className="font-semibold text-gray-900">
                                            1000
                                        </span>
                                    </span>
                                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                                        <li>
                                            <a
                                                href="#"
                                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                                            >
                                                Previous
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                            >
                                                1
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                            >
                                                2
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                aria-current="page"
                                                className="flex items-center justify-center px-3 h-8 text-white border border-gray-300 bg-cyan-500 hover:bg-cyan-700"
                                            >
                                                3
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                            >
                                                4
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                            >
                                                5
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                                            >
                                                Next
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </PanelLayout>
        </>
    );
};
