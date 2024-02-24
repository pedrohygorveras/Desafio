"use client";

import React, { ChangeEvent, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { Input, TextArea } from "@/components/form/controls";
import { Header } from "@/components/header/title";
import { ExitConfirmationModal } from "@/components/modal/exit-confirmation";
import { refreshCache } from "@/components/actions/server";

interface ProductProps {
  product: {
    product_id: string;
    title: string;
    description: string;
  };
}

const ContentPage: React.FC<ProductProps> = ({ product }) => {
  const exitConfirmationModalRef = useRef<HTMLDialogElement | null>(null);

  const router = useRouter();

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [brandId, setBrandId] = useState("");

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

      const res = await fetch(`${NEXT_PUBLIC_BACKEND_API}/product`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          product_id: product.product_id,
          brand_id: brandId,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (res.ok) {
        refreshCache({
          key: "product-collection",
        });

        goBack();
      } else {
        throw new Error("Failed to create a Product");
      }
    } catch (error) {
      console.log(error);
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
    router.push("/dashboard/product");
  }

  return (
    <>
      <Header
        title="Editar Produto"
        subtitle={product ? product.title : null}
        goBack={backToPreviousPage}
      />

      <form className="flex flex-col gap-3">
        <Input
          label="Título do produto *"
          value={title}
          onChange={handleTitleChange}
        />

        <TextArea
          label="Descrição do produto *"
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
