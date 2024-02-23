"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ItemSidebarProps {
  item: {
    label: string;
    link: string;
    icon: React.ReactNode;
  };
  index: number;
}

const ItemSidebar: React.FC<ItemSidebarProps> = ({ item, index }) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={`/dashboard/${item.link}`}
        className={`group relative flex flex-col items-center justify-center h-24 px-4 duration-300 ease-in-out border-base-200 border-b
       ${index === 0 && "border-t"}
       ${
         pathname.includes(item.link)
           ? "bg-primary border-bg-primary"
           : "hover:bg-base-200"
       }`}
      >
        <div>
          <div className="flex flex-col items-center text-2xl">{item.icon}</div>
          <div className="text-xs mt-2">{item.label}</div>
        </div>
      </Link>
    </li>
  );
};

export { ItemSidebar };
