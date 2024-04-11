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

export const Produk = () => {
    let navigate = useNavigate();
    const [modalProduk, setModalProduk] = useState(false);
    const [produkForm, setProdukForm] = useState({
        id: 0,
        nama: "",
        harga: "",
        gambar: "",
        stok: "",
        id_kategori: "",
        id_diskon: "",
    });

    const [kategori, setKategori] = useState("");
    const [filterStok, setFilterStok] = useState("");
    const [filterDiskon, setFilterDiskon] = useState("");
    const [kategoriProduk, setKategoriProduk] = useState([]);
    const [diskonProduk, setDiskonProduk] = useState([]);
    const [loader, setLoader] = useState(false);
    const [reloadTable, setReloadTable] = useState(false);
    const [headerModal, setHeaderModal] = useState("");
    const [buttonPage, setButtonPage] = useState([]);
    let [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [paginate, setPaginate] = useState(10);

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
                }/data-master/produk?page=${page}&q=${search}&paginate=${paginate}&kategori=${kategori}&stok=${filterStok}&diskon=${filterDiskon}`,
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
        kategori,
        setKategori,
        filterDiskon,
        setFilterDiskon,
        filterStok,
        setFilterStok,
    ]);

    useEffect(() => {
        setLoader(true);
        setReloadTable(false);
        axios
            .get(
                `${
                    import.meta.env.VITE_ALL_BASE_URL
                }/data-master/produk/create`,
                {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token"),
                    },
                }
            )
            .then((res) => {
                setKategoriProduk([...res.data.kategori]);
                setDiskonProduk([...res.data.diskon]);
                setLoader(false);
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
    }, []);

    useEffect(() => {
        const button = Math.min(5, allData.last_page);
        let first = allData.current_page - Math.floor(button / 2);
        first = Math.max(first, 1);
        first = Math.min(first, allData.last_page - button + 1);
        setButtonPage([...Array(button)].map((k, i) => i + first));
    }, [allData, setAllData]);

    useEffect(() => {
        if (modalProduk == false) {
            setProdukForm({
                id: 0,
                nama: "",
                harga: "",
                gambar: "",
                stok: "",
                id_kategori: "",
                id_diskon: "",
            });
        }
    }, [modalProduk, setModalProduk]);

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
                if (produkForm.id == 0) {
                    axios
                        .post(
                            `${
                                import.meta.env.VITE_ALL_BASE_URL
                            }/data-master/produk/store`,
                            produkForm,
                            {
                                headers: {
                                    Authorization:
                                        "Bearer " + Cookies.get("token"),
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        )
                        .then((res) => {
                            setReloadTable(true);
                            setModalProduk(false);
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
                            }/data-master/produk/update`,
                            produkForm,
                            {
                                headers: {
                                    Authorization:
                                        "Bearer " + Cookies.get("token"),
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        )
                        .then((res) => {
                            setReloadTable(true);
                            setModalProduk(false);
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
                }/data-master/produk/edit/${id}`,
                {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token"),
                    },
                }
            )
            .then((res) => {
                setProdukForm({
                    id: res.data.id,
                    nama: res.data.nama,
                    harga: res.data.harga,
                    gambar: "",
                    stok: res.data.stok,
                    id_kategori: res.data.id_kategori,
                    id_diskon: res.data.id_diskon,
                });
                setHeaderModal("Edit Data");
                setModalProduk(true);
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
                        }/data-master/produk/delete/${id}`,
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
                                    "Gambar",
                                    "Kategori",
                                    "Nama",
                                    "Harga",
                                    "Stok",
                                    "Potongan Diskon",
                                    "Diskon Aktif/Tidak Aktif",
                                    "Aksi",
                                ]}
                                label={"Produk"}
                                pagination={paginate}
                                changePagination={(e) =>
                                    setPaginate(e.target.value)
                                }
                                inputsearch={search}
                                changeSearch={(e) => setSearch(e.target.value)}
                                buttonModal={() => {
                                    setHeaderModal("Tambah Data");
                                    setModalProduk(true);
                                }}
                                filter={
                                    <>
                                        <div className="relative">
                                            <select
                                                value={filterStok}
                                                onChange={(e) =>
                                                    setFilterStok(
                                                        e.target.value
                                                    )
                                                }
                                                className="h-full border block appearance-none w-full bg-white border-gray-300 text-gray-700 py-2 px-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            >
                                                <option value="">
                                                    Stok Barang
                                                </option>
                                                <option value="1-10">
                                                    1-10
                                                </option>
                                                <option value="11-20">
                                                    11-20
                                                </option>
                                                <option value="20">
                                                    {">= 20"}
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
                                                value={filterDiskon}
                                                onChange={(e) =>
                                                    setFilterDiskon(
                                                        e.target.value
                                                    )
                                                }
                                                className="h-full border block appearance-none w-full bg-white border-gray-300 text-gray-700 py-2 px-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            >
                                                <option value="">
                                                    Filter Diskon
                                                </option>
                                                <option value="Aktif">
                                                    Diskon Aktif
                                                </option>
                                                <option value="Tidak Aktif">
                                                    Diskon Tidak Aktif
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
                                                value={kategori}
                                                onChange={(e) =>
                                                    setKategori(e.target.value)
                                                }
                                                className="h-full border block appearance-none w-full bg-white border-gray-300 text-gray-700 py-2 px-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            >
                                                <option value="">
                                                    Pilih Kategori
                                                </option>
                                                {kategoriProduk.map(
                                                    (kat, x) => {
                                                        return (
                                                            <option
                                                                key={x}
                                                                value={kat.id}
                                                            >
                                                                {kat.nama}
                                                            </option>
                                                        );
                                                    }
                                                )}
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
                                                        <img
                                                            className="w-10 h-10 rounded-full"
                                                            src={all.gambar}
                                                            alt="Rounded avatar"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {
                                                            all
                                                                .data_kategori_produk
                                                                .nama
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {all.nama}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {rupiah(all.harga)}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {all.stok}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {all.data_diskon !==
                                                        null
                                                            ? rupiah(
                                                                  all
                                                                      .data_diskon
                                                                      .potongan_harga
                                                              )
                                                            : "Tidak Ada"}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {all.data_diskon !==
                                                        null
                                                            ? new Date(
                                                                  all.data_diskon.tanggal_selesai
                                                              ).getTime() <
                                                                  new Date().getTime() ||
                                                              all.data_diskon
                                                                  .status !==
                                                                  "Published"
                                                                ? "Tidak Aktif"
                                                                : "Aktif"
                                                            : "Tidak Aktif"}
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
                                                colSpan={8}
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
                                            colSpan={8}
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
                    open={modalProduk}
                    submitAction={handlerSubmit}
                    closeModal={() => setModalProduk(false)}
                >
                    <div className="w-full text-black">
                        <label
                            htmlFor="nama"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Nama Produk
                        </label>
                        <input
                            type="text"
                            id="nama"
                            value={produkForm.nama}
                            onChange={(e) =>
                                setProdukForm({
                                    ...produkForm,
                                    nama: e.target.value,
                                })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Nama Produk.."
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="w-full text-black">
                            <label
                                htmlFor="harga"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Harga
                            </label>
                            <CurrencyInput
                                id="harga"
                                name="harga"
                                placeholder="Harga Produk.."
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                defaultValue={0}
                                value={produkForm.harga}
                                required
                                onValueChange={(value) =>
                                    setProdukForm({
                                        ...produkForm,
                                        harga: value,
                                    })
                                }
                                prefix="Rp. "
                            />
                        </div>
                        <div className="w-full text-black">
                            <label
                                htmlFor="kategori"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Kategori
                            </label>
                            <select
                                value={produkForm.id_kategori}
                                id="kategori"
                                onChange={(e) =>
                                    setProdukForm({
                                        ...produkForm,
                                        id_kategori: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                required
                            >
                                <option value="">Pilih Kategori</option>
                                {kategoriProduk.map((kat, x) => {
                                    return (
                                        <option key={x} value={kat.id}>
                                            {kat.nama}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="w-full text-black">
                                <label
                                    htmlFor="stok"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Stok
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    id="stok"
                                    value={produkForm.stok}
                                    onChange={(e) =>
                                        setProdukForm({
                                            ...produkForm,
                                            stok: e.target.value,
                                        })
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="Stok Produk.."
                                    required
                                />
                            </div>
                            <div className="w-full text-black">
                                <label
                                    htmlFor="gambar"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Gambar
                                </label>
                                <input
                                    type="file"
                                    id="gambar"
                                    onChange={(e) =>
                                        setProdukForm({
                                            ...produkForm,
                                            gambar: e.target.files[0],
                                        })
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="Gambar Produk.."
                                />
                            </div>
                        </div>
                        <div className="w-full text-black">
                            <label
                                htmlFor="diskon"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Diskon (Optional)
                            </label>
                            <select
                                value={
                                    produkForm.id_diskon == null
                                        ? ""
                                        : produkForm.id_diskon
                                }
                                id="diskon"
                                onChange={(e) =>
                                    setProdukForm({
                                        ...produkForm,
                                        id_diskon: e.target.value,
                                    })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            >
                                <option value="">Pilih Diskon</option>
                                {diskonProduk.map((dis, x) => {
                                    return (
                                        <option key={x} value={dis.id}>
                                            {dis.nama}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </ModalPrimary>
            </PanelLayout>
        </>
    );
};
