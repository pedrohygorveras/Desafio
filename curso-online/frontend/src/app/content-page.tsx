"use client";

import React, { useState } from "react";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { HomeCard } from "@/components/card/home";

import { HomeNavbar } from "@/components/navbar/home";
import { refreshCache } from "@/components/actions/server";

import { MdArrowForward } from "react-icons/md";

interface ContentPageProps {
  products: {
    category_id: string;
    title: string;
    description: string;
    created_at: Date;
    product_category: [
      {
        product: {
          product_id: string;
          brand_id: string;
          title: string;
          description: string;
          created_at: Date;
          brand: {
            brand_id: string;
            title: string;
            description: string;
            created_at: Date;
          };
        };
      }
    ];
  }[];
  qtd: number;
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

interface ProductCategoryProps {
  product: {
    product_id: string;
    brand_id: string;
    title: string;
    description: string;
    created_at: Date;
    brand: {
      brand_id: string;
      title: string;
      description: string;
      created_at: Date;
    };
  };
}

const ContentPage: React.FC<ContentPageProps> = ({
  products,
  qtd,
  categories,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps | null>(null);

  const [items, setItems] = useState<any[]>(() => {
    const itemsOnStorage = localStorage.getItem("items");

    if (itemsOnStorage) {
      return JSON.parse(itemsOnStorage);
    }

    return [];
  });

  const handleButtonClick = (value: CategoryProps | null) => {
    setSelectedCategory(value);

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("category_id", value ? value.category_id : "");

    const currentQuery = current.toString();
    const query = currentQuery ? `?${currentQuery}` : ``;

    refreshCache({
      keyTag: "product-category-collection",
    });

    router.push(`${pathname}${query}`);
  };

  function addItem(data: any) {
    const newData = data;

    const itemsArray = [newData, ...items];

    setItems(itemsArray);

    localStorage.setItem("items", JSON.stringify(itemsArray));
  }

  function onItemDeleted(product_id: string) {
    const itemsArray = [];
    let product_id_removed = false;

    for (const item of items) {
      if (item.product_id === product_id && !product_id_removed) {
        product_id_removed = true;
      } else {
        itemsArray.push(item);
      }
    }

    setItems(itemsArray);

    localStorage.setItem("items", JSON.stringify(itemsArray));
  }

  return (
    <div>
      <HomeNavbar items={items} onItemDeleted={onItemDeleted} />

      <div className="py-8">
        <h1 className="font-bold text-3xl text-neutral md:text-6xl">
          {selectedCategory ? selectedCategory.title : "Produtos Digitais"}
        </h1>
        <h2 className="font-normal text-lg md:text-2xl mt-5 lg:w-2/3 leading-6 text-slate-500">
          {selectedCategory
            ? selectedCategory.description
            : "Produtos digitais que impulsionam o aprendizado: Explore as ferramentas essenciais para o seu crescimento profissional"}
        </h2>
      </div>

      <div className="space-x-2">
        <div className={"inline-block items-center gap-2 m-0.5"}>
          <button
            className={`btn btn-outline border-slate-400 hover:border-slate-400 hover:bg-slate-400 px-5 max-w-60 rounded-full outline-none ${
              selectedCategory === null &&
              "bg-neutral border-bg-neutral text-white"
            }`}
            onClick={() => handleButtonClick(null)}
          >
            Todos os produtos <MdArrowForward />
          </button>
        </div>

        {categories &&
          categories.map((category) => {
            return (
              <div
                key={category.category_id}
                className={"inline-block items-center gap-2 m-0.5"}
              >
                <button
                  className={`btn btn-outline border-slate-400 hover:border-slate-400 hover:bg-slate-400 px-5 max-w-60 line-clamp-1 rounded-full outline-none ${
                    selectedCategory &&
                    selectedCategory.category_id === category.category_id &&
                    "bg-neutral border-bg-neutral text-white"
                  }`}
                  onClick={() => handleButtonClick(category)}
                >
                  {category.title}
                </button>
              </div>
            );
          })}
      </div>

      <div className="h-px bg-base-200 mt-5"></div>

      <div className="my-10">
        {products &&
          products.map((product) => {
            return (
              <div className="mb-10" key={product.category_id}>
                <div className="">
                  <div>
                    {product.product_category &&
                    product.product_category.length > 0 ? (
                      <div>
                        <div className="mt-10 mb-5">
                          <h1 className="font-bold text-2xl">
                            {product.title}
                          </h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {product.product_category.map(
                            ({ product }: ProductCategoryProps) => {
                              return (
                                <HomeCard
                                  key={product.product_id}
                                  product={product}
                                  qtd={qtd}
                                  addItem={addItem}
                                />
                              );
                            }
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        {selectedCategory && (
                          <div>
                            <div className="mt-5 mb-10">
                              <h1 className="font-bold text-2xl">
                                {product.title}
                              </h1>
                            </div>
                            <div className="ml-4">
                              <h3 className="font-normal text-lg">
                                Hm... Parece que não encontrou exatamente o que
                                estava procurando.
                              </h3>
                              <h4 className="font-normal text-base">
                                Experimente alterar os filtros.
                              </h4>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export { ContentPage };
