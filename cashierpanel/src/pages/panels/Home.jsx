export const Home = () => {
    return (
        <>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <header className="text-center w-fit m-auto p-4 justify-center ">
                        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl ">
                            Welcome To Olivia Cakes
                        </h2>
                        <p className="mx-auto mt-4 max-w-md text-black ">
                            Choose Your Interface!
                        </p>
                    </header>
                    <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2 px-52">
                        <li>
                            <a
                                href="#"
                                className="group relative block rounded-2xl overflow-hidden"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1618898909019-010e4e234c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                                    alt=""
                                    className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                                    <div className="inline-flex justify-center  text-white bg-yellow-500 rounded-lg px-4 py-1">
                                        <h3 className="text-lg font-medium">
                                            User Panel
                                        </h3>
                                        &nbsp;
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="group relative block rounded-2xl overflow-hidden"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                                    alt=""
                                    className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                                    <div className="inline-flex justify-center  text-white bg-yellow-500 rounded-lg px-4 py-1">
                                        <h3 className="text-lg font-medium">
                                            Dashboard Panel
                                        </h3>
                                        &nbsp;
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};
