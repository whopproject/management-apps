import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";

export const ModalPrimary = ({ open, closeModal, header }) => {
    return (
        <>
            <Modal
                closeOnEsc={false}
                closeOnOverlayClick={false}
                showCloseIcon={false}
                open={open}
                onClose={closeModal}
                classNames={{
                    modal: "customModal",
                }}
            >
                <div className="relative">
                    {/* Modal header */}
                    <div className="flex items-center justify-between py-3 border-b border-b-gray-500 rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {header}
                        </h3>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* Modal body */}
                    <div className="px-2 py-5 space-y-4">
                        <p className="text-base leading-relaxed text-black">
                            With less than a month to go before the European
                            Union enacts new consumer privacy laws for its
                            citizens, companies around the world are updating
                            their terms of service agreements to comply.
                        </p>
                        <p className="text-base leading-relaxed text-black">
                            The European Union’s General Data Protection
                            Regulation (G.D.P.R.) goes into effect on May 25 and
                            is meant to ensure a common set of data rights in
                            the European Union. It requires organizations to
                            notify users as soon as possible of high-risk data
                            breaches that could personally affect them.
                        </p>
                    </div>
                    {/* Modal footer */}
                    <div className="flex justify-end py-3 border-t border-t-gray-500 rounded-b">
                        <button
                            type="button"
                            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-red-500 rounded-lg hover:bg-red-600 focus:z-10"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
