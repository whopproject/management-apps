import { useEffect, useState } from "react";
import { PanelLayout } from "../../layouts/PanelLayout";
import { Line, Bar } from "react-chartjs-2";
import faker from "faker";
import { TableData } from "../../components/TableData";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Loader } from "../../components/Loader";
import { ButtonPagination } from "../../components/ButtonPagination";
import CurrencyInput from "react-currency-input-field";
import { useNavigate } from "react-router-dom";
import { ButtonEdit } from "../../components/ButtonEdit";
import { ButtonDelete } from "../../components/ButtonDelete";
import { ModalSecondary } from "../../components/ModalSecondary";
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

export const Dashboard = () => {
    const [dataLineChart, setDataLineChart] = useState({
        labels: [],
        datasets: [
            {
                label: "Pemasukan Kotor",
                data: [],
                fill: true,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Pemasukan Bersih",
                data: [],
                fill: true,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    });

    const optionsLinechart = {
        responsive: true,
        tension: 0.3,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    const [dataBarChart, setDataBarChart] = useState({
        labels: [],
        datasets: [
            {
                label: "Produk Terlaris",
                data: [],
                fill: true,
                borderColor: "rgb(245, 66, 126)",
                backgroundColor: "rgba(245, 66, 126, 0.5)",
            },
        ],
    });

    const optionsBarChart = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    const tanggal = (value) => {
        return new Date(value).toLocaleString("id", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const labelfilter = (value) => {
        return new Date(value).toLocaleString("id", {
            year: "numeric",
            month: "numeric",
        });
    };

    const [filterGrafikLine, setFilterGrafikLine] = useState("12");
    const [filterGrafikBar, setFilterGrafikBar] = useState(12);
    const [pemasukanBersih, setPemasukanBersih] = useState(0);
    const [pemasukanKotor, setPemasukanKotor] = useState(0);
    const [totalPenjualan, setTotalPenjualan] = useState(0);
    const [totalProdukTerjual, setTotalProdukTerjusl] = useState(0);
    const [totalPembelian, setTotalPembelian] = useState(0);
    const [loaderGrafikLine, setLoaderGrafikLine] = useState(false);
    const [loaderGrafikBar, setLoaderGrafikBar] = useState(false);

    // rekap penjualan harian
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_ALL_BASE_URL}/dashboard`, {
                headers: {
                    Authorization: "Bearer " + Cookies.get("token"),
                },
            })
            .then((res) => {
                setTotalPenjualan(res.data.transaksiday);
                setTotalProdukTerjusl(res.data.produkterjualday);
                setTotalPembelian(res.data.pembelianday);
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

    // grafik penjualan
    useEffect(() => {
        axios
            .get(
                `${
                    import.meta.env.VITE_ALL_BASE_URL
                }/dashboard/grafik_penjualan?filterbulan=${filterGrafikLine}`,
                {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token"),
                    },
                }
            )
            .then((res) => {
                const labelformat = [];
                const dataperlabel = [];
                if (filterGrafikLine == 12 || filterGrafikLine == 3) {
                    res.data.label.map((label) => {
                        labelformat.push(
                            new Date(label).toLocaleString("id", {
                                year: "numeric",
                                month: "long",
                            })
                        );

                        let fildata = res.data.data.filter(
                            (e) =>
                                labelfilter(`${e.tahun}-${e.month}`) ==
                                labelfilter(label)
                        );
                        if (fildata.length > 0) {
                            dataperlabel.push(fildata[0].total);
                        } else {
                            dataperlabel.push(0);
                        }
                    });
                } else {
                    res.data.label.map((label) => {
                        labelformat.push(
                            new Date(label).toLocaleString("id", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })
                        );

                        let fildata = res.data.data.filter(
                            (e) => tanggal(e.hari) == tanggal(label)
                        );
                        if (fildata.length > 0) {
                            dataperlabel.push(fildata[0].total);
                        } else {
                            dataperlabel.push(0);
                        }
                    });
                }
                setDataLineChart({
                    labels: [...labelformat],
                    datasets: [
                        {
                            label: "Total Pemasukan",
                            data: [...dataperlabel],
                            fill: true,
                            borderColor: "rgb(53, 162, 235)",
                            backgroundColor: "rgba(53, 162, 235, 0.5)",
                        },
                    ],
                });
                setPemasukanBersih(res.data.pemasukanbersih);
                setPemasukanKotor(res.data.pemasukankotor);
                setLoaderGrafikLine(false);
            })
            .catch((error) => {
                setLoaderGrafikLine(false);
                if (error.response.status == 403) {
                    Cookies.remove("token");
                    navigate("/");
                } else {
                    alert(error.response.data.error);
                }
            });
    }, [
        filterGrafikLine,
        setFilterGrafikLine,
        loaderGrafikLine,
        setLoaderGrafikLine,
    ]);

    // grafik produk
    useEffect(() => {
        axios
            .get(
                `${
                    import.meta.env.VITE_ALL_BASE_URL
                }/dashboard/produk_terlaris?filterbulan=${filterGrafikBar}`,
                {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token"),
                    },
                }
            )
            .then((res) => {
                let labelproduk = [];
                let totalterjual = [];
                res.data.map((label) => {
                    labelproduk.push(label.nama_produk);
                    totalterjual.push(label.total_terjual);
                });
                setDataBarChart({
                    labels: [...labelproduk],
                    datasets: [
                        {
                            label: "Produk Terjual",
                            data: [...totalterjual],
                            fill: true,
                            borderColor: "rgb(245, 66, 126)",
                            backgroundColor: "rgba(245, 66, 126, 0.5)",
                        },
                    ],
                });
                setLoaderGrafikBar(false);
            })
            .catch((error) => {
                setLoaderGrafikBar(false);
                if (error.response.status == 403) {
                    Cookies.remove("token");
                    navigate("/");
                } else {
                    alert(error.response.data.error);
                }
            });
    }, [
        filterGrafikBar,
        setFilterGrafikBar,
        loaderGrafikBar,
        setLoaderGrafikBar,
    ]);

    const [loader, setLoader] = useState(false);
    const [reloadTable, setReloadTable] = useState(false);
    const [modalTransaksi, setModalTransaksi] = useState(false);
    const [buttonPage, setButtonPage] = useState([]);
    const [filterStatus, setFilterStatus] = useState("");
    const [filterTanggalDari, setFilterTanggalDari] = useState("");
    const [filterTanggalKe, setFilterTanggalKe] = useState("");
    let [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [paginate, setPaginate] = useState(10);
    const [detailAll, setDetailAll] = useState({
        transaksiitem: [],
        diskon_transaksi: [],
    });

    const [loaderItem, setLoaderItem] = useState(false);
    const [reloadTableItem, setReloadTableItem] = useState(false);
    const [modalItem, setModalItem] = useState(false);
    const [buttonPageItem, setButtonPageItem] = useState([]);
    const [filterTanggalDariItem, setFilterTanggalDariItem] = useState("");
    const [filterTanggalKeItem, setFilterTanggalKeItem] = useState("");
    let [pageItem, setPageItem] = useState(1);
    const [searchItem, setSearchItem] = useState("");
    const [paginateItem, setPaginateItem] = useState(10);
    const [detailItem, setDetailItem] = useState({
        qty: "",
        item: "",
        satuan: "",
        subtotal: "",
        diskon: "",
        kategori: "",
    });

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

    const [allDataItem, setAllDataItem] = useState({
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

    useEffect(() => {
        setLoader(true);
        setReloadTable(false);
        if (filterTanggalDari == "" && filterTanggalKe !== "") {
            setFilterTanggalKe(filterTanggalDari);
        } else if (filterTanggalKe == "" && filterTanggalDari !== "") {
            setFilterTanggalDari(filterTanggalKe);
        } else if (filterTanggalDari > filterTanggalKe) {
            let tanggalke = filterTanggalKe;
            setFilterTanggalKe(filterTanggalDari);
            setFilterTanggalDari(tanggalke);
        }
        axios
            .get(
                `${
                    import.meta.env.VITE_ALL_BASE_URL
                }/transaksi?page=${page}&q=${search}&paginate=${paginate}&status=${filterStatus}&daritanggal=${filterTanggalDari}&ketanggal=${filterTanggalKe}`,
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
                setLoader(false);
                if (error.response.status == 403) {
                    Cookies.remove("token");
                    navigate("/");
                } else {
                    alert(error.response.data.error);
                }
            });
    }, [
        page,
        setPage,
        paginate,
        setPaginate,
        search,
        setSearch,
        setFilterStatus,
        filterStatus,
        setFilterTanggalDari,
        filterTanggalDari,
        setFilterTanggalKe,
        filterTanggalKe,
        reloadTable,
        setReloadTable,
    ]);

    useEffect(() => {
        setLoaderItem(true);
        setReloadTableItem(false);
        if (filterTanggalDariItem == "" && filterTanggalKeItem !== "") {
            setFilterTanggalKeItem(filterTanggalDariItem);
        } else if (filterTanggalKeItem == "" && filterTanggalDariItem !== "") {
            setFilterTanggalDariItem(filterTanggalKeItem);
        } else if (filterTanggalDariItem > filterTanggalKeItem) {
            let dateke = filterTanggalKeItem;
            setFilterTanggalKeItem(filterTanggalDariItem);
            setFilterTanggalDariItem(dateke);
        }
        axios
            .get(
                `${
                    import.meta.env.VITE_ALL_BASE_URL
                }/transaksi/transaksi-item?page=${pageItem}&q=${searchItem}&paginate=${paginateItem}&daritanggal=${filterTanggalDariItem}&ketanggal=${filterTanggalKeItem}`,
                {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token"),
                    },
                }
            )
            .then((res) => {
                setAllDataItem({
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
                setPageItem(res.data.current_page);
                setLoaderItem(false);
            })
            .catch((error) => {
                setLoaderItem(false);
                if (error.response.status == 403) {
                    Cookies.remove("token");
                    navigate("/");
                } else {
                    alert(error.response.data.error);
                }
            });
    }, [
        pageItem,
        setPageItem,
        paginateItem,
        setPaginateItem,
        searchItem,
        setSearchItem,
        setFilterTanggalDariItem,
        filterTanggalDariItem,
        setFilterTanggalKeItem,
        filterTanggalKeItem,
        reloadTableItem,
        setReloadTableItem,
    ]);

    useEffect(() => {
        const button = Math.min(5, allData.last_page);
        let first = allData.current_page - Math.floor(button / 2);
        first = Math.max(first, 1);
        first = Math.min(first, allData.last_page - button + 1);
        setButtonPage([...Array(button)].map((k, i) => i + first));
    }, [allData, setAllData]);

    useEffect(() => {
        const button = Math.min(5, allDataItem.last_page);
        let first = allDataItem.current_page - Math.floor(button / 2);
        first = Math.max(first, 1);
        first = Math.min(first, allDataItem.last_page - button + 1);
        setButtonPageItem([...Array(button)].map((k, i) => i + first));
    }, [allDataItem, setAllDataItem]);

    const downloadInvoice = (url) => {
        window.open(url, "_blank", "noreferrer");
    };

    const detailTransaksi = (id_transaksi) => {
        axios
            .get(
                `${
                    import.meta.env.VITE_ALL_BASE_URL
                }/transaksi/show_item/${id_transaksi}`,
                {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token"),
                    },
                }
            )
            .then((res) => {
                setDetailAll({
                    transaksiitem: [...res.data.transaksiitem],
                    diskon_transaksi: [...res.data.diskon_transaksi],
                });
                setModalTransaksi(true);
            })
            .catch((error) => {
                if (error.response.status == 403) {
                    Cookies.remove("token");
                    navigate("/");
                } else {
                    alert(error.response.data.error);
                }
            });
    };

    const detailItemTransaksi = (id) => {
        axios
            .get(
                `${
                    import.meta.env.VITE_ALL_BASE_URL
                }/transaksi/transaksi-item/show/${id}`,
                {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token"),
                    },
                }
            )
            .then((res) => {
                setDetailItem({
                    qty: res.data.qty,
                    item: res.data.data_produk.nama,
                    satuan: res.data.harga_satuan,
                    diskon: res.data.potongan_diskon,
                    subtotal: res.data.subtotal,
                    kategori: res.data.data_produk.data_kategori_produk.nama,
                });
                setModalItem(true);
            })
            .catch((error) => {
                if (error.response.status == 403) {
                    Cookies.remove("token");
                    navigate("/");
                } else {
                    alert(error.response.data.error);
                }
            });
    };

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
                                <div className="px-4 text-black">
                                    <h3 className="text-sm tracking-wider">
                                        Total Penjualan Hari Ini
                                    </h3>
                                    <p className="text-3xl font-bold">
                                        {rupiah(totalPenjualan)}
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
                                <div className="px-4 text-black">
                                    <h3 className="text-sm tracking-wider">
                                        Produk Terjual Hari Ini
                                    </h3>
                                    <p className="text-3xl font-bold">
                                        {totalProdukTerjual}
                                    </p>
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
                                <div className="px-4 text-black">
                                    <h3 className="text-sm tracking-wider">
                                        Total Pembelian Hari Ini
                                    </h3>
                                    <p className="text-3xl font-bold">
                                        {rupiah(totalPembelian)}
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
                                            <h5 className="text-black font-semibold text-xl m-auto">
                                                {rupiah(pemasukanKotor)}
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
                                            <h5 className="text-black font-semibold text-xl m-auto">
                                                {rupiah(pemasukanBersih)}
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
                                        <select
                                            value={filterGrafikLine}
                                            onChange={(e) => {
                                                setFilterGrafikLine(
                                                    e.target.value
                                                );
                                                setLoaderGrafikLine(true);
                                            }}
                                            className="h-full border rounded-lg block appearance-none w-full bg-white border-gray-300 text-black py-2 px-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        >
                                            <option value="12">
                                                1 Tahun Terakhir
                                            </option>
                                            <option value="3">
                                                3 Bulan Terakhir
                                            </option>
                                            <option value="1">Bulan Ini</option>
                                            <option value="15">
                                                15 Hari Terakhir
                                            </option>
                                            <option value="7">
                                                1 Minggu Terakhir
                                            </option>
                                        </select>
                                        <div className="pointer-events-none absolute top-3 right-0 flex items-center px-2 text-black">
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
                                {dataLineChart.labels.length < 1 ||
                                loaderGrafikLine == true ? (
                                    <div className="flex w-full justify-center">
                                        <Loader></Loader>
                                    </div>
                                ) : (
                                    <Line
                                        height={400}
                                        width={800}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        options={optionsLinechart}
                                        data={dataLineChart}
                                    />
                                )}
                            </div>
                            <div className="w-full">
                                <div className="w-full">
                                    <p className="text-black text-xl text-center font-bold mb-2">
                                        Produk Terlaris
                                    </p>
                                    <div className="flex justify-end mb-2">
                                        <div className="relative w-fit">
                                            <select
                                                value={filterGrafikBar}
                                                onChange={(e) => {
                                                    setFilterGrafikBar(
                                                        e.target.value
                                                    );
                                                    setLoaderGrafikBar(true);
                                                }}
                                                className="h-full border rounded-lg block appearance-none w-full bg-white border-gray-300 text-black py-2 px-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            >
                                                <option value="12">
                                                    1 Tahun Terakhir
                                                </option>
                                                <option value="3">
                                                    3 Bulan Terakhir
                                                </option>
                                                <option value="1">
                                                    Bulan Ini
                                                </option>
                                                <option value="15">
                                                    15 Hari Terakhir
                                                </option>
                                                <option value="7">
                                                    1 Minggu Terakhir
                                                </option>
                                            </select>
                                            <div className="pointer-events-none absolute top-3 right-0 flex items-center px-2 text-black">
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
                                    {dataBarChart.labels.length < 1 ||
                                    loaderGrafikBar == true ? (
                                        <div className="flex w-full justify-center">
                                            <Loader></Loader>
                                        </div>
                                    ) : (
                                        <Bar
                                            height={400}
                                            width={800}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            options={optionsBarChart}
                                            data={dataBarChart}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-full mb-4">
                            <div className="flex items-center p-4 justify-center h-auto border-2 rounded-lg bg-white">
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                                    <TableData
                                        head={[
                                            "No Invoice",
                                            "Tanggal",
                                            "Total Item",
                                            "Pemasukan",
                                            "Diskon",
                                            "Status",
                                            "Detail",
                                            "Invoice",
                                        ]}
                                        label={"Transaksi Terakhir"}
                                        pagination={paginate}
                                        changePagination={(e) =>
                                            setPaginate(e.target.value)
                                        }
                                        inputsearch={search}
                                        changeSearch={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        buttonModal={false}
                                        filter={
                                            <>
                                                <div className="flex me-4">
                                                    <p className="m-auto mx-1 text-sm font-semibold">
                                                        Dari
                                                    </p>
                                                    <div className="relative">
                                                        <input
                                                            type="date"
                                                            id="tanggal"
                                                            value={
                                                                filterTanggalDari
                                                            }
                                                            onChange={(e) =>
                                                                setFilterTanggalDari(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="h-full border block appearance-none w-full bg-white border-gray-300 text-black py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Tanggal.."
                                                        />
                                                    </div>
                                                    <p className="m-auto mx-1 text-sm font-semibold">
                                                        Ke
                                                    </p>
                                                    <div className="relative">
                                                        <input
                                                            type="date"
                                                            id="tanggal"
                                                            value={
                                                                filterTanggalKe
                                                            }
                                                            onChange={(e) =>
                                                                setFilterTanggalKe(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="h-full border block appearance-none w-full bg-white border-gray-300 text-black py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Tanggal.."
                                                        />
                                                    </div>
                                                    <button
                                                        className="m-auto px-1"
                                                        type="button"
                                                        onClick={() => {
                                                            setReloadTable(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-6 h-6 bg-green-600 text-white rounded-full"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="m-auto px-1"
                                                        type="button"
                                                        onClick={() => {
                                                            setFilterTanggalDari(
                                                                ""
                                                            );
                                                            setFilterTanggalKe(
                                                                ""
                                                            );
                                                            setReloadTable(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-6 h-6 bg-red-600 text-white rounded-full"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="relative">
                                                    <select
                                                        value={filterStatus}
                                                        onChange={(e) =>
                                                            setFilterStatus(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="h-full border block appearance-none w-full bg-white border-gray-300 text-black py-2 px-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    >
                                                        <option value="">
                                                            Pilih Status
                                                        </option>
                                                        <option value="Selesai">
                                                            Selesai
                                                        </option>
                                                        <option value="Draft">
                                                            Draft
                                                        </option>
                                                    </select>
                                                    <div className="pointer-events-none absolute top-3 right-0 flex items-center px-2 text-black">
                                                        <svg
                                                            className="fill-current h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    >
                                        {allData.data.length > 0 ? (
                                            loader == false ? (
                                                allData.data.map((all, i) => {
                                                    return (
                                                        <tr
                                                            key={i}
                                                            className="bg-white border-b"
                                                        >
                                                            <th
                                                                scope="row"
                                                                className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap"
                                                            >
                                                                {i +
                                                                    allData.from}
                                                            </th>
                                                            <td className="px-6 py-4 text-black">
                                                                {all.no_invoice}
                                                            </td>
                                                            <td className="px-6 py-4 text-black">
                                                                {tanggal(
                                                                    all.tanggal
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 text-black">
                                                                {all.total_item}
                                                            </td>
                                                            <td className="px-6 py-4 text-black">
                                                                {rupiah(
                                                                    all.pembayaran
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 text-black">
                                                                {all
                                                                    .data_diskon_transaksi
                                                                    .length > 0
                                                                    ? rupiah(
                                                                          all.data_diskon_transaksi.reduce(
                                                                              (
                                                                                  total,
                                                                                  value
                                                                              ) =>
                                                                                  (total =
                                                                                      total +
                                                                                      value.potongan_diskon),
                                                                              0
                                                                          )
                                                                      )
                                                                    : rupiah(0)}
                                                            </td>
                                                            <td className="px-6 py-4 text-black">
                                                                {all.status}
                                                            </td>
                                                            <td className="px-6 py-4 text-black">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        detailTransaksi(
                                                                            all.id
                                                                        )
                                                                    }
                                                                    className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1.5 text-center inline-flex items-center me-2"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth="1.5"
                                                                        stroke="currentColor"
                                                                        className="w-5 h-5"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                                                        />
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </td>
                                                            <td className="px-6 py-4 text-black">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        downloadInvoice(
                                                                            all.invoice
                                                                        )
                                                                    }
                                                                    className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-1.5 text-center inline-flex items-center me-2"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth="1.5"
                                                                        stroke="currentColor"
                                                                        className="w-5 h-5"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr className="bg-white border-b">
                                                    <td
                                                        colSpan={9}
                                                        className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                    >
                                                        <div className="flex w-full justify-center">
                                                            <Loader></Loader>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        ) : (
                                            <tr className="bg-white border-b">
                                                <td
                                                    colSpan={9}
                                                    className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                >
                                                    {loader == true ? (
                                                        <div className="flex w-full justify-center">
                                                            <Loader></Loader>
                                                        </div>
                                                    ) : (
                                                        "Belum Ada Data"
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </TableData>
                                    <div className="p-5">
                                        <ButtonPagination
                                            from={allData.from}
                                            to={allData.to}
                                            total={allData.total}
                                            next_page_url={
                                                allData.next_page_url
                                            }
                                            prev_page_url={
                                                allData.prev_page_url
                                            }
                                            nextPage={() => setPage(page++)}
                                            prevPage={() => setPage(page--)}
                                        >
                                            {buttonPage.map((btn, i) => {
                                                return (
                                                    <li key={i}>
                                                        <button
                                                            onClick={() =>
                                                                setPage(btn)
                                                            }
                                                            className={
                                                                "flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:text-black " +
                                                                (page == btn
                                                                    ? "bg-cyan-400 hover:bg-cyan-600 text-black"
                                                                    : "bg-white hover:bg-gray-100 text-gray-500")
                                                            }
                                                        >
                                                            {btn}
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ButtonPagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mb-4">
                            <div className="flex items-center p-4 justify-center h-auto border-2 rounded-lg bg-white">
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                                    <TableData
                                        head={[
                                            "Item",
                                            "No Invoice",
                                            "Tanggal",
                                            "QTY",
                                            "Diskon Y/T",
                                            "Detail",
                                        ]}
                                        label={"Item Terjual Terakhir"}
                                        pagination={paginateItem}
                                        changePagination={(e) =>
                                            setPaginateItem(e.target.value)
                                        }
                                        inputsearch={searchItem}
                                        changeSearch={(e) =>
                                            setSearchItem(e.target.value)
                                        }
                                        buttonModal={false}
                                        filter={
                                            <>
                                                <div className="flex me-4">
                                                    <p className="m-auto mx-1 text-sm font-semibold">
                                                        Dari
                                                    </p>
                                                    <div className="relative">
                                                        <input
                                                            type="date"
                                                            id="tanggal"
                                                            value={
                                                                filterTanggalDariItem
                                                            }
                                                            onChange={(e) =>
                                                                setFilterTanggalDariItem(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="h-full border block appearance-none w-full bg-white border-gray-300 text-black py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Tanggal.."
                                                        />
                                                    </div>
                                                    <p className="m-auto mx-1 text-sm font-semibold">
                                                        Ke
                                                    </p>
                                                    <div className="relative">
                                                        <input
                                                            type="date"
                                                            id="tanggal"
                                                            value={
                                                                filterTanggalKeItem
                                                            }
                                                            onChange={(e) =>
                                                                setFilterTanggalKeItem(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="h-full border block appearance-none w-full bg-white border-gray-300 text-black py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            placeholder="Tanggal.."
                                                        />
                                                    </div>
                                                    <button
                                                        className="m-auto px-1"
                                                        type="button"
                                                        onClick={() => {
                                                            setReloadTableItem(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-6 h-6 bg-green-600 text-white rounded-full"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="m-auto px-1"
                                                        type="button"
                                                        onClick={() => {
                                                            setFilterTanggalDariItem(
                                                                ""
                                                            );
                                                            setFilterTanggalKeItem(
                                                                ""
                                                            );
                                                            setReloadTableItem(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-6 h-6 bg-red-600 text-white rounded-full"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </>
                                        }
                                    >
                                        {allDataItem.data.length > 0 ? (
                                            loaderItem == false ? (
                                                allDataItem.data.map(
                                                    (all, i) => {
                                                        return (
                                                            <tr
                                                                key={i}
                                                                className="bg-white border-b"
                                                            >
                                                                <th
                                                                    scope="row"
                                                                    className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap"
                                                                >
                                                                    {i +
                                                                        allDataItem.from}
                                                                </th>
                                                                <td className="px-6 py-4 text-black">
                                                                    {
                                                                        all
                                                                            .data_produk
                                                                            .nama
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-4 text-black">
                                                                    {
                                                                        all.no_invoice
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-4 text-black">
                                                                    {tanggal(
                                                                        all.tanggal
                                                                    )}
                                                                </td>
                                                                <td className="px-6 py-4 text-black">
                                                                    {all.qty}
                                                                </td>
                                                                <td className="px-6 py-4 text-black">
                                                                    {all.data_diskon !==
                                                                    null
                                                                        ? "Y"
                                                                        : "T"}
                                                                </td>
                                                                <td className="px-6 py-4 text-black">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            detailItemTransaksi(
                                                                                all.id
                                                                            )
                                                                        }
                                                                        className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1.5 text-center inline-flex items-center me-2"
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            strokeWidth="1.5"
                                                                            stroke="currentColor"
                                                                            className="w-5 h-5"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                                                            />
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <tr className="bg-white border-b">
                                                    <td
                                                        colSpan={9}
                                                        className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                    >
                                                        <div className="flex w-full justify-center">
                                                            <Loader></Loader>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        ) : (
                                            <tr className="bg-white border-b">
                                                <td
                                                    colSpan={9}
                                                    className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                >
                                                    {loader == true ? (
                                                        <div className="flex w-full justify-center">
                                                            <Loader></Loader>
                                                        </div>
                                                    ) : (
                                                        "Belum Ada Data"
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </TableData>
                                    <div className="p-5">
                                        <ButtonPagination
                                            from={allDataItem.from}
                                            to={allDataItem.to}
                                            total={allDataItem.total}
                                            next_page_url={
                                                allDataItem.next_page_url
                                            }
                                            prev_page_url={
                                                allDataItem.prev_page_url
                                            }
                                            nextPage={() =>
                                                setPageItem(pageItem++)
                                            }
                                            prevPage={() =>
                                                setPageItem(pageItem--)
                                            }
                                        >
                                            {buttonPageItem.map((btn, i) => {
                                                return (
                                                    <li key={i}>
                                                        <button
                                                            onClick={() =>
                                                                setPageItem(btn)
                                                            }
                                                            className={
                                                                "flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:text-black " +
                                                                (pageItem == btn
                                                                    ? "bg-cyan-400 hover:bg-cyan-600 text-black"
                                                                    : "bg-white hover:bg-gray-100 text-gray-500")
                                                            }
                                                        >
                                                            {btn}
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ButtonPagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalSecondary
                    header={"Detail"}
                    open={modalTransaksi}
                    closeModal={() => setModalTransaksi(false)}
                >
                    <div className="relative overflow-x-auto w-full">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-black uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Nama Diskon
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Potongan Harga
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {detailAll.length < 0 ? (
                                    ""
                                ) : detailAll.diskon_transaksi.length > 0 ? (
                                    detailAll.diskon_transaksi.map(
                                        (item, i) => {
                                            return (
                                                <tr
                                                    key={i}
                                                    className="bg-white border-b"
                                                >
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                                                    >
                                                        {item.data_produk.nama}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {item.potongan_diskon ==
                                                        null
                                                            ? rupiah(0)
                                                            : rupiah(
                                                                  item.potongan_diskon
                                                              )}
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )
                                ) : (
                                    <>
                                        <tr className="bg-white border-b">
                                            <th
                                                scope="row"
                                                colSpan={2}
                                                className="px-6 py-4 font-medium text-black whitespace-nowrap text-center"
                                            >
                                                Tidak Ada Diskon
                                            </th>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="relative overflow-x-auto w-full">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-black uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Item
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Qty
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Satuan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Potongan Diskon
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Subtotal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {detailAll.length < 0
                                    ? ""
                                    : detailAll.transaksiitem.map((item, i) => {
                                          return (
                                              <tr
                                                  key={i}
                                                  className="bg-white border-b"
                                              >
                                                  <th
                                                      scope="row"
                                                      className="px-6 py-4 font-medium text-black whitespace-nowrap "
                                                  >
                                                      {item.data_produk.nama}
                                                  </th>
                                                  <td className="px-6 py-4">
                                                      {item.qty}
                                                  </td>
                                                  <td className="px-6 py-4">
                                                      {rupiah(
                                                          item.harga_satuan
                                                      )}
                                                  </td>
                                                  <td className="px-6 py-4">
                                                      {rupiah(
                                                          item.potongan_diskon
                                                      )}
                                                  </td>
                                                  <td className="px-6 py-4">
                                                      {rupiah(item.subtotal)}
                                                  </td>
                                              </tr>
                                          );
                                      })}
                            </tbody>
                        </table>
                    </div>
                </ModalSecondary>
                <ModalSecondary
                    header={"Detail Item Terjual"}
                    open={modalItem}
                    closeModal={() => setModalItem(false)}
                >
                    <div className="relative overflow-x-auto w-full">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-black uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Kategori Produk
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Produk
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        QTY
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Satuan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Potongan Harga
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Subtotal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                                    >
                                        {detailItem.kategori}
                                    </th>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-black whitespace-nowrap "
                                    >
                                        {detailItem.item}
                                    </th>
                                    <td className="px-6 py-4">
                                        {detailItem.qty}
                                    </td>
                                    <td className="px-6 py-4">
                                        {rupiah(detailItem.satuan)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {rupiah(detailItem.diskon)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {rupiah(detailItem.subtotal)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </ModalSecondary>
            </PanelLayout>
        </>
    );
};
