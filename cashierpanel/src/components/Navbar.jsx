import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    let navigate = useNavigate();

    return (
        <>
            <nav
                className="fixed w-full z-20 top-0 left-0 items-center justify-between bg-gray-800 py-2 shadow-sm shadow-neutral-700/10 lg:flex-wrap lg:justify-start"
                data-te-navbar-ref=""
            >
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="dropdown">
                        <div className="block basis-auto items-center lg:hidden lg:basis-[100%]">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h7"
                                    />
                                </svg>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                {Cookies.get("token") && (
                                    <li>
                                        <Link to={"/dashboard"}>Dashboard</Link>
                                    </li>
                                )}
                                {!Cookies.get("token") && (
                                    <li>
                                        <Link to={"/"}>Homepage</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto">
                        <ul className="mr-auto lg:flex lg:flex-row">
                            {!Cookies.get("token") && (
                                <li className="block ml-4 py-2 pl-4 text-neutral-500 transition duration-150 ease-in-out hover:text-neutral-600 focus:text-neutral-600 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 dark:disabled:text-white/30 lg:px-2">
                                    <Link to={"/"}>Homepage</Link>
                                </li>
                            )}
                            {Cookies.get("token") && (
                                <li className="block ml-4 py-2 pl-4 text-neutral-500 transition duration-150 ease-in-out hover:text-neutral-600 focus:text-neutral-600 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 dark:disabled:text-white/30 lg:px-2">
                                    <Link to={"/dashboard"}>Dashboard</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="my-1 flex items-center lg:my-0 lg:ml-auto">
                        {!Cookies.get("token") && (
                            <>
                                <Link
                                    type="button"
                                    className="mr-2 inline-block rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary-400 transition duration-150 ease-in-out hover:bg-neutral-700 hover:bg-opacity-60 hover:text-primary-600 focus:text-primary-500 focus:outline-none focus:ring-0 active:text-primary-600"
                                    to={"/login"}
                                >
                                    Login
                                </Link>
                                <Link
                                    type="button"
                                    className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                    to={"/register"}
                                >
                                    Sign up for free
                                </Link>
                            </>
                        )}
                        {Cookies.get("token") && (
                            <button
                                type="button"
                                className="mr-2 inline-block rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary-400 transition duration-150 ease-in-out hover:bg-neutral-700 hover:bg-opacity-60 hover:text-primary-600 focus:text-primary-500 focus:outline-none focus:ring-0 active:text-primary-600"
                                onClick={() => {
                                    Cookies.remove("token");
                                    navigate("/login");
                                }}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};
