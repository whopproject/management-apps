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

export const Diskon = () => {
    let navigate = useNavigate();
    const [modalDiskon, setModalDiskon] = useState(false);
    const [diskonForm, setDiskonForm] = useState({
        id: 0,
        nama: "",
        jenis: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
        potongan_harga: "",
        status: "",
    });
    const [loader, setLoader] = useState(false);
    const [reloadTable, setReloadTable] = useState(false);
    const [headerModal, setHeaderModal] = useState("");
    const [buttonPage, setButtonPage] = useState([]);
    let [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [paginate, setPaginate] = useState(10);
    const [filterPeriode, setFilterPeriode] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterJenis, setFilterJenis] = useState("");
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

    useEffect(() => {
        setLoader(true);
        setReloadTable(false);
        axios
            .get(
                `${
                    import.meta.env.VITE_ALL_BASE_URL
                }/data-master/diskon?page=${page}&q=${search}&paginate=${paginate}&status=${filterStatus}&periode=${filterPeriode}&jenis=${filterJenis}`,
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
        filterPeriode,
        setFilterPeriode,
        filterStatus,
        setFilterStatus,
        filterJenis,
        setFilterJenis,
    ]);

    useEffect(() => {
        const button = Math.min(5, allData.last_page);
        let first = allData.current_page - Math.floor(button / 2);
        first = Math.max(first, 1);
        first = Math.min(first, allData.last_page - button + 1);
        setButtonPage([...Array(button)].map((k, i) => i + first));
    }, [allData, setAllData]);

    useEffect(() => {
        if (modalDiskon == false) {
            setDiskonForm({
                id: 0,
                nama: "",
                jenis: "",
                tanggal_mulai: "",
                tanggal_selesai: "",
                potongan_harga: "",
                status: "",
            });
        }
    }, [modalDiskon, setModalDiskon]);

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
                if (diskonForm.id == 0) {
                    axios
                        .post(
                            `${
                                import.meta.env.VITE_ALL_BASE_URL
                            }/data-master/diskon/store`,
                            diskonForm,
                            {
                                headers: {
                                    Authorization:
                                        "Bearer " + Cookies.get("token"),
                                },
                            }
                        )
                        .then((res) => {
                            setReloadTable(true);
                            setModalDiskon(false);
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
                            }/data-master/diskon/update`,
                            diskonForm,
                            {
                                headers: {
                                    Authorization:
                                        "Bearer " + Cookies.get("token"),
                                },
                            }
                        )
                        .then((res) => {
                            setReloadTable(true);
                            setModalDiskon(false);
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
                }/data-master/diskon/edit/${id}`,
                {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token"),
                    },
                }
            )
            .then((res) => {
                setDiskonForm({
                    id: res.data.id,
                    nama: res.data.nama,
                    jenis: res.data.jenis,
                    tanggal_mulai: res.data.tanggal_mulai,
                    tanggal_selesai: res.data.tanggal_selesai,
                    potongan_harga: res.data.potongan_harga,
                    status: res.data.status,
                });
                setHeaderModal("Edit Data");
                setModalDiskon(true);
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
                        }/data-master/diskon/delete/${id}`,
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

    const tanggal = (value) => {
        return new Date(value).toLocaleString("id", {
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

    return (
        <>
            <PanelLayout>
                <div className="flex-grow flex flex-row h-screen w-full mt-12">
                    <div className="w-full px-8 py-2">
                        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
                            <TableData
                                head={[
                                    "Nama",
                                    "Periode",
                                    "Aktif/Tidak Aktif",
                                    "Potongan Harga",
                                    "Jenis",
                                    "Status",
                                    "Aksi",
                                ]}
                                label={"Diskon"}
                                filter={
                                    <>
                                        <div className="relative">
                                            <select
                                                value={filterStatus}
                                                onChange={(e) =>
                                                    setFilterStatus(
                                                        e.target.value
                                                    )
                                                }
                                                className="h-full border block appearance-none w-full bg-white border-gray-300 text-gray-700 py-2 px-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            >
                                                <option value="">
                                                    Pilih Status
                                                </option>
                                                <option value="Published">
                                                    Published
                                                </option>
                                                <option value="Archived">
                                                    Archived
                                                </option>
                                                <option value="Draft">
                                                    Draft
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
                                        <div className="relative">
                                            <select
                                                value={filterPeriode}
                                                onChange={(e) =>
                                                    setFilterPeriode(
                                                        e.target.value
                                                    )
                                                }
                                                className="h-full border block appearance-none w-full bg-white border-gray-300 text-gray-700 py-2 px-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            >
                                                <option value="">
                                                    Pilih Periode
                                                </option>
                                                <option value="Aktif">
                                                    Periode Aktif
                                                </option>
                                                <option value="Tidak Aktif">
                                                    Periode TIdak Aktif
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
                                        <div className="relative">
                                            <select
                                                value={filterJenis}
                                                onChange={(e) =>
                                                    setFilterJenis(
                                                        e.target.value
                                                    )
                                                }
                                                className="h-full border block appearance-none w-full bg-white border-gray-300 text-gray-700 py-2 px-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            >
                                                <option value="">
                                                    Pilih Jenis
                                                </option>
                                                <option value="Produk">
                                                    Produk
                                                </option>
                                                <option value="Transaksi">
                                                    Transaksi
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
                                    setModalDiskon(true);
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
                                                        {all.nama}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {tanggal(
                                                            all.tanggal_mulai
                                                        )}{" "}
                                                        s/d{" "}
                                                        {tanggal(
                                                            all.tanggal_selesai
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {new Date(
                                                            all.tanggal_selesai
                                                        ).getTime() >=
                                                            new Date().getTime() ||
                                                        all.status ==
                                                            "Published"
                                                            ? "Aktif"
                                                            : "Tidak Aktif"}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {rupiah(
                                                            all.potongan_harga
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {all.jenis}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {all.status}
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
                    open={modalDiskon}
                    submitAction={handlerSubmit}
                    closeModal={() => setModalDiskon(false)}
                >
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="w-full text-black">
                            <label
                                htmlFor="nama"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Nama Diskon
                            </label>
                            <input
                                type="text"
                                id="nama"
                                value={diskonForm.nama}
                                onChange={(e) =>
                                    setDiskonForm({
                                        ...diskonForm,
                                        nama: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Nama Diskon.."
                                required
                            />
                        </div>
                        <div className="w-full text-black">
                            <label
                                htmlFor="potonganharga"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Total Harga
                            </label>
                            <CurrencyInput
                                id="potonganharga"
                                name="potonganharga"
                                placeholder="Potongan Harga.."
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                defaultValue={0}
                                value={diskonForm.potongan_harga}
                                required
                                onValueChange={(value) =>
                                    setDiskonForm({
                                        ...diskonForm,
                                        potongan_harga: value,
                                    })
                                }
                                prefix="Rp. "
                            />
                        </div>
                        <div className="w-full text-black">
                            <label
                                htmlFor="tanggal_mulai"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Mulai Dari
                            </label>
                            <input
                                type="date"
                                id="tanggal_mulai"
                                value={diskonForm.tanggal_mulai}
                                onChange={(e) =>
                                    setDiskonForm({
                                        ...diskonForm,
                                        tanggal_mulai: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Tanggal.."
                                required
                            />
                        </div>
                        <div className="w-full text-black">
                            <label
                                htmlFor="tanggal_selesai"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Sampai Dengan
                            </label>
                            <input
                                type="date"
                                id="tanggal_selesai"
                                value={diskonForm.tanggal_selesai}
                                onChange={(e) =>
                                    setDiskonForm({
                                        ...diskonForm,
                                        tanggal_selesai: e.target.value,
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
                                value={diskonForm.jenis}
                                id="jenis"
                                onChange={(e) =>
                                    setDiskonForm({
                                        ...diskonForm,
                                        jenis: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                required
                            >
                                <option value="">Pilih Jenis</option>
                                <option value="Produk">Produk</option>
                                <option value="Transaksi">Transaksi</option>
                            </select>
                        </div>
                        <div className="w-full text-black">
                            <label
                                htmlFor="status"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Status
                            </label>
                            <select
                                value={diskonForm.status}
                                id="status"
                                onChange={(e) =>
                                    setDiskonForm({
                                        ...diskonForm,
                                        status: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                required
                            >
                                <option value="">Pilih Status</option>
                                <option value="Published">Published</option>
                                <option value="Archived">Archived</option>
                                <option value="Draft">Draft</option>
                            </select>
                        </div>
                    </div>
                </ModalPrimary>
            </PanelLayout>
        </>
    );
};
