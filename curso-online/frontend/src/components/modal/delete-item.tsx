import React from "react";

import { refreshCache } from "../actions/server";

interface DeleteItemModalProps {
  modalRef: React.RefObject<HTMLDialogElement>;
  keyTag: string;
  route: string;
  field: string;
  value: string;
}

const DeleteItemModal: React.FC<DeleteItemModalProps> = ({
  modalRef,
  keyTag,
  route,
  field,
  value,
}) => {
  async function deleteItem() {
    const NEXT_PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;
    const BASE_URL = NEXT_PUBLIC_BACKEND_API + route;

    const headers = {
      "Content-type": "application/json",
      [field]: value,
    };

    const res = await fetch(BASE_URL, {
      method: "DELETE",
      headers,
    });

    if (res.ok) {
      closeModal();

      refreshCache({
        keyTag: keyTag,
      });
    } else {
      console.error("An error has occurred. Please try again later");
    }
  }

  function closeModal() {
    if (modalRef.current) {
      modalRef.current.close();
    }
  }

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Atenção!</h3>
        <p className="py-4">
          Tem certeza de que deseja excluir este item? Esta ação não pode ser
          desfeita.
        </p>
        <div className="modal-action">
          <button
            type="button"
            className="btn btn-ghost mr-2"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-outline btn-error"
            onClick={deleteItem}
          >
            Continuar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export { DeleteItemModal };
