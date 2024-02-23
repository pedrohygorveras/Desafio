"use client";

import React, { ChangeEvent, useState } from "react";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { Input, TextArea } from "@/components/form/controls";
import { Header } from "@/components/header/title";

interface PageProps {
  params: { category_id: string };
}

interface CategoryProps {
  category_id: string;
  title: string;
  description: string;
}

const Edit: React.FC<PageProps> = ({ params }) => {
  const [data, setData] = useState<CategoryProps | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }

  function handleSubmit() {
    try {
      console.log(title);
      console.log(description);
    } catch (error) {
      console.error(error);
    }
  }

  function backToPreviousPage() {}

  return (
    <DashboardLayout>
      <div className="">
        <Header
          title="Editar Categoria"
          subtitle={data ? data.title : null}
          goBack={backToPreviousPage}
        />

        <form className="flex flex-col gap-3">
          <Input
            label="Título da categoria *"
            value={title}
            onChange={handleTitleChange}
          />

          <TextArea
            label="Descrição da categoria *"
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
      </div>
    </DashboardLayout>
  );
};

export default Edit;
