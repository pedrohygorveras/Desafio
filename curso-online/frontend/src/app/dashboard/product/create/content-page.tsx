"use client";

import React, { ChangeEvent, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { Input, Select, TextArea } from "@/components/form/controls";
import { Header } from "@/components/header/title";
import { ExitConfirmationModal } from "@/components/modal/exit-confirmation";
import { refreshCache } from "@/components/actions/server";

import { MdClose } from "react-icons/md";

interface ContentPageProps {
  brands: {
    brand_id: string;
    title: string;
    description: string;
  }[];
  categories: {
    category_id: string;
    title: string;
    description: string;
  }[];
}

interface CategoryProps {
  category_id: string;
  title: string;
  description: string;
}

const ContentPage: React.FC<ContentPageProps> = ({ brands, categories }) => {
  const exitConfirmationModalRef = useRef<HTMLDialogElement | null>(null);

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, _] = useState("");
  const [brandId, setBrandId] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<CategoryProps[]>(
    []
  );

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleBrandChange(event: ChangeEvent<HTMLSelectElement>) {
    setBrandId(event.target.value);
  }

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId: string = event.target.value;

    const selectedCategory = categories.find(
      (category) => category.category_id === selectedCategoryId
    );

    if (
      selectedCategory &&
      !selectedCategories.some((cat) => cat.category_id === selectedCategoryId)
    ) {
      setSelectedCategories((prevCategories) => [
        ...prevCategories,
        selectedCategory,
      ]);
    }
  };

  const handleRemoveCategory = (categoryId: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.filter((category) => category.category_id !== categoryId)
    );
  };

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }

  async function handleSubmit() {
    try {
      if (!title || !description) return;

      const NEXT_PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

      const res = await fetch(`${NEXT_PUBLIC_BACKEND_API}/product`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          brand_id: brandId,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (res.ok) {
        const responseBody = await res.json();
        const { product_id } = responseBody;

        selectedCategories.map(async (item) => {
          const { category_id } = item;

          await fetch(`${NEXT_PUBLIC_BACKEND_API}/product-category`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              product_id: product_id,
              category_id: category_id,
            },
          });
        });

        refreshCache({
          keyTag: "product-collection",
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
    router.push("/dashboard/product");
  }

  return (
    <>
      <div className="">
        <Header title="Novo Produto" goBack={backToPreviousPage} />

        <form className="flex flex-col gap-3">
          <Input
            label="Título do produto *"
            value={title}
            onChange={handleTitleChange}
          />

          <Select label="Marca" value={brandId} onChange={handleBrandChange}>
            <option value="" disabled selected>
              Selecione uma opção
            </option>
            {brands &&
              brands.map((brand) => (
                <option key={brand.brand_id} value={brand.brand_id}>
                  {brand.title}
                </option>
              ))}
          </Select>

          <div className="mt-6">
            <Select
              label="Categorias"
              value={categoryId}
              onChange={handleCategoryChange}
            >
              <option value="" disabled selected>
                Selecione uma opção
              </option>
              {categories &&
                categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.title}
                  </option>
                ))}
            </Select>

            <p className="text-xs mt-2">
              Você pode selecionar várias categorias.
            </p>

            <div className="my-5">
              {selectedCategories.map((item) => (
                <div
                  key={item.category_id}
                  className="badge badge-ghost h-auto min-w-14 p-1 px-2 inline-flex items-center gap-2 m-0.5"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(item.category_id)}
                  >
                    <MdClose className="text-lg" />
                  </button>
                  <span className="line-clamp-1 text-xs">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <TextArea
              label="Descrição do produto *"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>

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
      </div>

      <ExitConfirmationModal
        modalRef={exitConfirmationModalRef}
        goBack={goBack}
      />
    </>
  );
};

export { ContentPage };
