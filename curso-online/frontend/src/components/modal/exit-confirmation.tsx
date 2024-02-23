import React from "react";

interface ExitConfirmationProps {
  modalRef: React.RefObject<HTMLDialogElement>;
  goBack: () => void;
}

const ExitConfirmation: React.FC<ExitConfirmationProps> = ({
  modalRef,
  goBack,
}) => {
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
          Tem certeza de que deseja sair? As informações não salvas serão
          perdidas.
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
            onClick={goBack}
          >
            Continuar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export { ExitConfirmation };
