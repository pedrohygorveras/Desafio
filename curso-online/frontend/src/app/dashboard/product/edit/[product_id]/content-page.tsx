"use client";

import React, { ChangeEvent, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { Input, Select, TextArea } from "@/components/form/controls";
import { Header } from "@/components/header/title";
import { ExitConfirmationModal } from "@/components/modal/exit-confirmation";
import { refreshCache } from "@/components/actions/server";

import { MdClose } from "react-icons/md";

interface ContentPageProps {
  product: {
    product_id: string;
    title: string;
    description: string;
    brand?: {
      brand_id?: string;
      title?: string;
      description?: string;
    };
    product_category: {
      product_category_id: string;
      category_id: string;
      category: {
        category_id: string;
        title: string;
        description: string;
      };
    }[];
  };
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
  product_category_id: string;
  category_id: string;
  category: {
    category_id: string;
    title: string;
    description: string;
  };
}

const ContentPage: React.FC<ContentPageProps> = ({
  product,
  brands,
  categories,
}) => {
  const exitConfirmationModalRef = useRef<HTMLDialogElement | null>(null);

  const router = useRouter();

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [brandId, setBrandId] = useState<string>(product.brand?.brand_id || "");
  const [categoryId, _] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<CategoryProps[]>(
    product.product_category
  );

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleBrandChange(event: ChangeEvent<HTMLSelectElement>) {
    setBrandId(event.target.value);
  }

  const handleCategoryChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategoryId: string = event.target.value;

    const selectedCategory = categories.find(
      (category) => category.category_id === selectedCategoryId
    );

    const NEXT_PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

    if (selectedCategory) {
      const res = await fetch(`${NEXT_PUBLIC_BACKEND_API}/product-category`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          product_id: product.product_id,
          category_id: selectedCategory.category_id,
        },
      });

      if (res.ok) {
        refreshCache({
          keyTag: "product-collection",
        });

        const responseBody = await res.json();

        if (responseBody.success == true) {
          const { result } = responseBody;

          const addValue = {
            product_category_id: result.product_category_id,
            category_id: selectedCategory.category_id,
            category: {
              category_id: selectedCategory.category_id,
              title: selectedCategory.title,
              description: selectedCategory.description,
            },
          };

          const newSelectedCategories = [...selectedCategories, addValue];
          setSelectedCategories(newSelectedCategories);
        }
      } else {
        console.error("An error has occurred. Please try again later");
      }
    }
  };

  const handleRemoveCategory = async (product_category_id: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.filter(
        (category) => category.product_category_id !== product_category_id
      )
    );

    const NEXT_PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

    const res = await fetch(`${NEXT_PUBLIC_BACKEND_API}/product-category`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        product_category_id: product_category_id,
      },
    });

    if (res.ok) {
      refreshCache({
        keyTag: "product-collection",
      });
    } else {
      console.error("An error has occurred. Please try again later");
    }
  };

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
                <option key={category.category_id} value={category.category_id}>
                  {category.title}
                </option>
              ))}
          </Select>

          <p className="text-xs mt-2">
            Você pode selecionar várias categorias.
          </p>

          <div className="my-5">
            {selectedCategories &&
              selectedCategories.map((item) => (
                <div
                  key={item.category_id}
                  className="badge badge-ghost h-auto min-w-14 p-1 px-2 inline-flex items-center gap-2 m-0.5"
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveCategory(item.product_category_id)
                    }
                  >
                    <MdClose className="text-lg" />
                  </button>
                  <span className="line-clamp-1 text-xs">
                    {item.category.title}
                  </span>
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

      <ExitConfirmationModal
        modalRef={exitConfirmationModalRef}
        goBack={goBack}
      />
    </>
  );
};

export { ContentPage };
