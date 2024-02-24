import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MainContext = createContext();

export const MainProvider = (props) => {
    const [cart, setCart] = useState([]);
    const [data, setData] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(true);

    useEffect(() => {
        if (fetchStatus === true) {
            axios
                .get("https://fakestoreapi.com/products")
                .then((res) => {
                    setData([...res.data]);
                })
                .catch((error) => {
                    console.log(error);
                });
            setFetchStatus(false);
        }
    }, [fetchStatus, setFetchStatus]);

    const addToCart = (index) => {
        const dataProduk = data[index];
        if (cart.length > 0) {
            const checkcart = cart.filter(
                (fill) => fill.id_produk == dataProduk.id
            );
            if (checkcart.length > 0) {
                setCart(
                    cart.map((datacart) => {
                        if (datacart.id_produk == dataProduk.id) {
                            return {
                                ...datacart,
                                qty: datacart.qty + 1,
                                price: datacart.price + dataProduk.price,
                            };
                        } else {
                            return datacart;
                        }
                    })
                );
            } else {
                setCart([
                    ...cart,
                    {
                        id_produk: dataProduk.id,
                        image: dataProduk.image,
                        title: dataProduk.title,
                        qty: 1,
                        price: dataProduk.price,
                    },
                ]);
            }
        } else {
            setCart([
                {
                    id_produk: dataProduk.id,
                    image: dataProduk.image,
                    title: dataProduk.title,
                    qty: 1,
                    price: dataProduk.price,
                },
            ]);
        }
        console.log(cart);
    };
    const mainValue = {
        cart,
        setCart,
        addToCart,
        data,
        setData,
        fetchStatus,
        setFetchStatus,
    };

    return (
        <MainContext.Provider value={mainValue}>
            {props.children}
        </MainContext.Provider>
    );
};
