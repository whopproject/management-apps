import { useEffect, useState } from "react";
import { ModalPrimary } from "../../components/ModalPrimary";
import { PanelLayout } from "../../layouts/PanelLayout";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Loader } from "../../components/Loader";
import { ButtonPagination } from "../../components/ButtonPagination";
import { useNavigate } from "react-router-dom";
import { TableData } from "../../components/TableData";
import { ButtonEdit } from "../../components/ButtonEdit";
import { ButtonDelete } from "../../components/ButtonDelete";
import CurrencyInput from "react-currency-input-field";

export const Pembelian = () => {
    let navigate = useNavigate();
    const [modalPembelian, setModalPembelian] = useState(false);
    const [pembelianForm, setPembelianForm] = useState({
        id: 0,
        nama: "",
        jenis: "",
        total_harga: 0,
        tanggal: "",
        total_item: "",
    });
    const [loader, setLoader] = useState(false);
    const [reloadTable, setReloadTable] = useState(false);
    const [headerModal, setHeaderModal] = useState("");
    const [buttonPage, setButtonPage] = useState([]);
    const [jenis, setJenis] = useState("");
    let [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [paginate, setPaginate] = useState(10);
    const [filterTanggalDari, setFilterTanggalDari] = useState("");
    const [filterTanggalKe, setFilterTanggalKe] = useState("");
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

    const tanggal = (value) => {
        return new Date(value).toLocaleString("id", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

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
                }/transaksi/pembelian?page=${page}&q=${search}&paginate=${paginate}&jenis=${jenis}&daritanggal=${filterTanggalDari}&ketanggal=${filterTanggalKe}`,
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
        paginate,
        setPaginate,
        search,
        setSearch,
        reloadTable,
        setReloadTable,
        jenis,
        setJenis,
    ]);

    useEffect(() => {
        const button = Math.min(5, allData.last_page);
        let first = allData.current_page - Math.floor(button / 2);
        first = Math.max(first, 1);
        first = Math.min(first, allData.last_page - button + 1);
        setButtonPage([...Array(button)].map((k, i) => i + first));
    }, [allData, setAllData]);

    useEffect(() => {
        if (modalPembelian == false) {
            setPembelianForm({
                id: 0,
                nama: "",
                jenis: "",
                total_harga: 0,
                tanggal: "",
                total_item: "",
            });
        }
    }, [modalPembelian, setModalPembelian]);

    const handlerSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Kamu Yakin?",
            text: "Data Akan Disimpan, Pastikan Data Sudah Benar",
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
                if (pembelianForm.id == 0) {
                    axios
                        .post(
                            `${
                                import.meta.env.VITE_ALL_BASE_URL
                            }/transaksi/pembelian/store`,
                            pembelianForm,
                            {
                                headers: {
                                    Authorization:
                                        "Bearer " + Cookies.get("token"),
                                },
                            }
                        )
                        .then((res) => {
                            setReloadTable(true);
                            setModalPembelian(false);
                            Swal.fire({
                                title: "Success!",
                                text: "Data Berhasil Ditambahkan.",
                                icon: "success",
                            });
                        })
                        .catch((error) => {
                            if (error.response.status == 403) {
                                Cookies.remove("token");
                                navigate("/");
                            } else {
                                Swal.fire({
                                    title: "Error!",
                                    text: error.response.data.error,
                                    icon: "error",
                                });
                            }
                        });
                } else {
                    axios
                        .post(
                            `${
                                import.meta.env.VITE_ALL_BASE_URL
                            }/transaksi/pembelian/update`,
                            pembelianForm,
                            {
                                headers: {
                                    Authorization:
                                        "Bearer " + Cookies.get("token"),
                                },
                            }
                        )
                        .then((res) => {
                            setReloadTable(true);
                            setModalPembelian(false);
                            Swal.fire({
                                title: "Success!",
                                text: "Data Berhasil Ditambahkan.",
                                icon: "success",
                            });
                        })
                        .catch((error) => {
                            if (error.response.status == 403) {
                                Cookies.remove("token");
                                navigate("/");
                            } else {
                                Swal.fire({
                                    title: "Error!",
                                    text: error.response.data.error,
                                    icon: "error",
                                });
                            }
                        });
                }
            }
        });
    };

    const editData = (id) => {
        axios
            .get(
                `${
                    import.meta.env.VITE_ALL_BASE_URL
                }/transaksi/pembelian/edit/${id}`,
                {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token"),
                    },
                }
            )
            .then((res) => {
                setPembelianForm({
                    id: res.data.id,
                    nama: res.data.nama,
                    jenis: res.data.jenis,
                    total_harga: res.data.total_harga,
                    tanggal: res.data.tanggal,
                    total_item: res.data.total_item,
                });
                setHeaderModal("Edit Data");
                setModalPembelian(true);
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

    const handleDelete = (id) => {
        Swal.fire({
            title: "Kamu Yakin?",
            text: "Data Akan Dihapus!",
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
                    .delete(
                        `${
                            import.meta.env.VITE_ALL_BASE_URL
                        }/transaksi/pembelian/delete/${id}`,
                        {
                            headers: {
                                Authorization: "Bearer " + Cookies.get("token"),
                            },
                        }
                    )
                    .then((res) => {
                        setReloadTable(true);
                        Swal.fire({
                            title: "Success!",
                            text: "Data Berhasil Dihapus.",
                            icon: "success",
                        });
                    })
                    .catch((error) => {
                        if (error.response.status == 403) {
                            Cookies.remove("token");
                            navigate("/");
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: error.response.data.error,
                                icon: "error",
                            });
                        }
                    });
            }
        });
    };

    return (
        <>
            <PanelLayout>
                <div className="flex-grow flex flex-row h-screen w-full mt-12">
                    <div className="w-full px-8 py-2">
                        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
                            <TableData
                                head={[
                                    "Tanggal",
                                    "Nama",
                                    "Jenis",
                                    "Total Item",
                                    "Total Harga",
                                    "Aksi",
                                ]}
                                label={"Pembelian"}
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
                                                    value={filterTanggalDari}
                                                    onChange={(e) =>
                                                        setFilterTanggalDari(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="h-full border block appearance-none w-full bg-white border-gray-300 text-gray-700 py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                                                    value={filterTanggalKe}
                                                    onChange={(e) =>
                                                        setFilterTanggalKe(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="h-full border block appearance-none w-full bg-white border-gray-300 text-gray-700 py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    placeholder="Tanggal.."
                                                />
                                            </div>
                                            <button
                                                className="m-auto px-1"
                                                type="button"
                                                onClick={() => {
                                                    setReloadTable(true);
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
                                                    setFilterTanggalDari("");
                                                    setFilterTanggalKe("");
                                                    setReloadTable(true);
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
                                pagination={paginate}
                                changePagination={(e) =>
                                    setPaginate(e.target.value)
                                }
                                inputsearch={search}
                                changeSearch={(e) => setSearch(e.target.value)}
                                buttonModal={() => {
                                    setHeaderModal("Tambah Data");
                                    setModalPembelian(true);
                                }}
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
                                                        {i + allData.from}
                                                    </th>
                                                    <td className="px-6 py-4 text-black">
                                                        {tanggal(all.tanggal)}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {all.nama}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {all.jenis}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {all.total_item}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {rupiah(
                                                            all.total_harga
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        <div>
                                                            <ButtonEdit
                                                                click={() =>
                                                                    editData(
                                                                        all.id
                                                                    )
                                                                }
                                                            ></ButtonEdit>
                                                            <ButtonDelete
                                                                click={() =>
                                                                    handleDelete(
                                                                        all.id
                                                                    )
                                                                }
                                                            ></ButtonDelete>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr className="bg-white border-b">
                                            <td
                                                colSpan={7}
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
                                            colSpan={7}
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
                                    next_page_url={allData.next_page_url}
                                    prev_page_url={allData.prev_page_url}
                                    nextPage={() => setPage(page++)}
                                    prevPage={() => setPage(page--)}
                                >
                                    {buttonPage.map((btn, i) => {
                                        return (
                                            <li key={i}>
                                                <button
                                                    onClick={() => setPage(btn)}
                                                    className={
                                                        "flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:text-gray-700 " +
                                                        (page == btn
                                                            ? "bg-cyan-400 hover:bg-cyan-600 text-gray-700"
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
                <ModalPrimary
                    header={headerModal}
                    open={modalPembelian}
                    submitAction={handlerSubmit}
                    closeModal={() => setModalPembelian(false)}
                >
                    <div className="w-full text-black">
                        <label
                            htmlFor="nama"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Nama
                        </label>
                        <input
                            type="text"
                            id="nama"
                            value={pembelianForm.nama}
                            onChange={(e) =>
                                setPembelianForm({
                                    ...pembelianForm,
                                    nama: e.target.value,
                                })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Nama.."
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="w-full text-black">
                            <label
                                htmlFor="tanggal"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Tanggal
                            </label>
                            <input
                                type="date"
                                id="tanggal"
                                value={pembelianForm.tanggal}
                                onChange={(e) =>
                                    setPembelianForm({
                                        ...pembelianForm,
                                        tanggal: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Tanggal.."
                                required
                            />
                        </div>
                        <div className="w-full text-black">
                            <label
                                htmlFor="jenis"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Jenis
                            </label>
                            <select
                                value={pembelianForm.jenis}
                                id="jenis"
                                onChange={(e) =>
                                    setPembelianForm({
                                        ...pembelianForm,
                                        jenis: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                required
                            >
                                <option value="">Pilih Jenis</option>
                                <option value="Produk">Produk</option>
                                <option value="Aset">Aset</option>
                            </select>
                        </div>
                        <div className="w-full text-black">
                            <label
                                htmlFor="total_item"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Total Item
                            </label>
                            <input
                                type="number"
                                min={1}
                                id="total_item"
                                value={pembelianForm.total_item}
                                onChange={(e) =>
                                    setPembelianForm({
                                        ...pembelianForm,
                                        total_item: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Total Item.."
                                required
                            />
                        </div>
                        <div className="w-full text-black">
                            <label
                                htmlFor="total_harga"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Total Harga
                            </label>
                            <CurrencyInput
                                id="total_item"
                                name="total_item"
                                placeholder="Total Harga.."
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                defaultValue={0}
                                value={pembelianForm.total_harga}
                                required
                                onValueChange={(value) =>
                                    setPembelianForm({
                                        ...pembelianForm,
                                        total_harga: value,
                                    })
                                }
                                prefix="Rp. "
                            />
                        </div>
                    </div>
                </ModalPrimary>
            </PanelLayout>
        </>
    );
};
