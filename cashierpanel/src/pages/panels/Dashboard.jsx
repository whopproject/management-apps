import { useEffect } from "react";
import { PanelLayout } from "../../layouts/PanelLayout";
import { Line, Bar } from "react-chartjs-2";
import faker from "faker";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const data = {
    labels,
    datasets: [
        {
            label: "Pemasukan Kotor",
            data: labels.map(() =>
                faker.datatype.number({ min: 1000, max: 2000 })
            ),
            fill: true,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Pemasukan Bersih",
            data: labels.map(() =>
                faker.datatype.number({ min: 1000, max: 2000 })
            ),
            fill: true,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

const options = {
    responsive: true,
    tension: 0.3,
    plugins: {
        legend: {
            position: "top",
        },
    },
};

const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top",
        },
    },
};

export const Dashboard = () => {
    return (
        <>
            <PanelLayout>
                <div className="flex-grow flex flex-row h-screen w-full mt-6">
                    <div className="w-full px-8">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center justify-start h-24 border-2 bg-white rounded-lg overflow-hidden shadow">
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
                                        Total Penjualan Hari Ini
                                    </h3>
                                    <p className="text-3xl font-bold">
                                        Rp. 12,768
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-start h-24 border-2 bg-white rounded-lg overflow-hidden shadow">
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
                                    <p className="text-3xl font-bold">12,768</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-start h-24 border-2 bg-white rounded-lg overflow-hidden shadow">
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
                                        Total Pembelian Hari Ini
                                    </h3>
                                    <p className="text-3xl font-bold">
                                        Rp. 12,768
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 place-content-center h-auto mb-4 p-4 border-2 rounded-lg bg-white">
                            <div className="w-full">
                                <p className="text-black text-xl text-center font-bold mb-2">
                                    Grafik Penjualan
                                </p>
                                <div className="flex justify-between mb-2 pl-1 pr-4">
                                    <div className="flex justify-between gap-2">
                                        <div className="inline-flex justify-center">
                                            <h5 className="text-black font-semibold text-2xl">
                                                Rp.56
                                            </h5>
                                            <div className="relative inline-flex items-center text-white leading-none font-normal mb-2">
                                                <div className="group cursor-pointer relative inline-block text-center">
                                                    <svg
                                                        className="w-4 h-4 text-black"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="#9ca3af"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <div className="opacity-0 w-auto bg-gray-400 text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -right-6 px-3 pointer-events-none">
                                                        Total Pemasukan Kotor
                                                        <svg
                                                            className="absolute text-gray-400 h-2 w-full left-0 top-full"
                                                            x="0px"
                                                            y="0px"
                                                            viewBox="0 0 255 255"
                                                            xmlSpace="preserve"
                                                        >
                                                            <polygon
                                                                className="fill-current"
                                                                points="0,0 127.5,127.5 255,0"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline-flex justify-center">
                                            <h5 className="text-black font-semibold text-2xl">
                                                Rp.56
                                            </h5>
                                            <div className="relative inline-flex items-center text-white leading-none font-normal mb-2">
                                                <div className="group cursor-pointer relative inline-block text-center">
                                                    <svg
                                                        className="w-4 h-4 text-black"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="#9ca3af"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <div className="opacity-0 w-auto bg-gray-400 text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -right-6 px-3 pointer-events-none">
                                                        Total Pemasukan Bersih
                                                        <svg
                                                            className="absolute text-gray-400 h-2 w-full left-0 top-full"
                                                            x="0px"
                                                            y="0px"
                                                            viewBox="0 0 255 255"
                                                            xmlSpace="preserve"
                                                        >
                                                            <polygon
                                                                className="fill-current"
                                                                points="0,0 127.5,127.5 255,0"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <select className="h-full border rounded-lg block appearance-none w-full bg-white border-gray-300 text-gray-700 py-2 px-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                            <option value="">
                                                1 Tahun Terakhir
                                            </option>
                                            <option value="1-10">
                                                3 Bulan Terakhir
                                            </option>
                                            <option value="1-10">
                                                1 Bulan Terakhir
                                            </option>
                                            <option value="1-10">
                                                1 Minggu Terakhir
                                            </option>
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
                                </div>
                                <Line
                                    height={400}
                                    width={800}
                                    style={{ width: "100%", height: "100%" }}
                                    options={options}
                                    data={data}
                                />
                            </div>
                            <div className="w-full">
                                <div className="w-full">
                                    <p className="text-black text-xl text-center font-bold mb-2">
                                        Produk Terlaris
                                    </p>
                                    <div className="flex justify-end mb-2">
                                        <div className="relative w-fit">
                                            <select className="h-full border rounded-lg block appearance-none w-fit bg-white border-gray-300 text-gray-700 py-2 px-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                <option value="">
                                                    1 Tahun Terakhir
                                                </option>
                                                <option value="1-10">
                                                    3 Bulan Terakhir
                                                </option>
                                                <option value="1-10">
                                                    1 Bulan Terakhir
                                                </option>
                                                <option value="1-10">
                                                    1 Minggu Terakhir
                                                </option>
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
                                    </div>
                                    <Bar
                                        height={400}
                                        width={800}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        options={options}
                                        data={data}
                                    />
                                </div>
                            </div>
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
