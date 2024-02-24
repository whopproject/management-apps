export const ProductCard = ({ data, onClick }) => {
    const produk = data;
    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };
    return (
        <>
            <div className="block rounded-lg shadow-xl">
                <img
                    alt=""
                    src={produk.image}
                    className="h-32 w-full rounded-t-md object-cover"
                />
                <div className="px-3 py-2">
                    <dl>
                        <div>
                            <dd className="text-xs text-gray-500">
                                {rupiah(produk.price)}
                            </dd>
                        </div>
                        <div className="h-10 text-xs mt-1">
                            <dd className="font-medium text-xs line-clamp-2">
                                {produk.title}
                            </dd>
                        </div>
                    </dl>
                    <button
                        type="button"
                        onClick={onClick}
                        className="w-full inline-flex justify-center p-1 col-span-2 bg-yellow-400 text-black text-xs font-semibold rounded-sm"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </>
    );
};
