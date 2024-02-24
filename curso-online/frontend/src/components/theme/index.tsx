"use client";

import React, { useEffect, useState } from "react";

const Theme: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      const defaultTheme = storedTheme ? storedTheme : "app";

      document.querySelector("html")?.setAttribute("data-theme", defaultTheme);

      setVisible(true);
    }
  }, []);

  return visible && children;
};

export { Theme };
