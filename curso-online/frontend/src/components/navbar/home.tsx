import Link from "next/link";
import React from "react";

const HomeNavbar: React.FC<any> = ({ items, onItemDeleted }) => {
  return (
    <div className="fixed z-[9999] top-0 left-0 right-0">
      <div className="mx-auto mt-12 max-w-6xl space-y-6 px-5">
        <div className="navbar bg-neutral rounded-2xl px-4 w-full">
          <div className="navbar-start">
            <Link href={"/"} className="btn btn-ghost text-xl text-white">
              BetaShop
            </Link>
          </div>

          <div className="navbar-end">
            <div className="dropdown dropdown-end mr-2">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-square text-white"
              >
                <div className="indicator">
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {items.length}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-60 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">
                    {items.length} Items adicionados
                  </span>

                  <div
                    className={`mt-5 overflow-x-hidden overflow-y-auto ${
                      items.length > 2 && "h-40"
                    }`}
                  >
                    {items &&
                      items.map((item: any, index: number) => {
                        return (
                          <div key={index}>
                            <p className="line-clamp-1 capitalize font-bold text-neutral">
                              {item.title}
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              R$ 9.99
                            </p>

                            <button
                              className="text-xs text-error mt-2"
                              onClick={() => onItemDeleted(item.product_id)}
                            >
                              Remover do carrinho
                            </button>

                            {items.length - 1 !== index && (
                              <div className="h-px bg-base-200 mb-4 mt-2"></div>
                            )}
                          </div>
                        );
                      })}
                  </div>

                  <div className="h-px bg-base-200 mt-5"></div>
                  <div className="text-right">
                    <span className="text-neutral">Total: R$ 9.99</span>
                  </div>
                </div>
              </div>
            </div>

            <Link className="btn btn-neutral" href={"/login"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HomeNavbar };
