"use client";

import React, { ChangeEvent, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { Input, TextArea } from "@/components/form/controls";
import { Header } from "@/components/header/title";
import { ExitConfirmationModal } from "@/components/modal/exit-confirmation";
import { refreshCache } from "@/components/actions/server";

interface BrandProps {
  brand: {
    brand_id: string;
    title: string;
    description: string;
  };
}

const ContentPage: React.FC<BrandProps> = ({ brand }) => {
  const exitConfirmationModalRef = useRef<HTMLDialogElement | null>(null);

  const router = useRouter();

  const [title, setTitle] = useState(brand.title);
  const [description, setDescription] = useState(brand.description);

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }

  async function handleSubmit() {
    try {
      if (!title || !description) return;

      const NEXT_PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

      const res = await fetch(`${NEXT_PUBLIC_BACKEND_API}/brand`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          brand_id: brand.brand_id,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (res.ok) {
        refreshCache({
          keyTag: "brand-collection",
        });

        goBack();
      } else {
        console.error("An error has occurred. Please try again later");
      }
    } catch (error) {
      console.error("An error has occurred. Please try again later");
    }
  }

  function backToPreviousPage() {
    const shouldShowConfirmation = title !== "" || description !== "";

    if (shouldShowConfirmation && exitConfirmationModalRef.current) {
      exitConfirmationModalRef.current.showModal();
    } else {
      goBack();
    }
  }

  function goBack() {
    router.push("/dashboard/brand");
  }

  return (
    <>
      <Header
        title="Editar Marca"
        subtitle={brand ? brand.title : null}
        goBack={backToPreviousPage}
      />

      <form className="flex flex-col gap-3">
        <Input
          label="Título da marca *"
          value={title}
          onChange={handleTitleChange}
        />

        <TextArea
          label="Descrição da marca *"
          value={description}
          onChange={handleDescriptionChange}
        />

        <div className="text-right py-10">
          <button
            className="btn btn-outline btn-error mr-2"
            type="button"
            onClick={backToPreviousPage}
          >
            Cancelar
          </button>
          <button
            className="btn btn-success text-white w-32"
            type="button"
            onClick={handleSubmit}
          >
            Salvar
          </button>
        </div>
      </form>

      <ExitConfirmationModal
        modalRef={exitConfirmationModalRef}
        goBack={goBack}
      />
    </>
  );
};

export { ContentPage };
