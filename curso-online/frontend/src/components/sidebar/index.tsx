import { ItemSidebar } from "./item";

import {
  MdCategory,
  MdCollectionsBookmark,
  MdOutlineShoppingCart,
} from "react-icons/md";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

interface MenuItem {
  label: string;
  link: string;
  icon: React.ReactNode;
}

const menu: MenuItem[] = [
  {
    label: "Categorias",
    link: "category",
    icon: <MdCategory />,
  },
  {
    label: "Marcas",
    link: "brand",
    icon: <MdCollectionsBookmark />,
  },
  {
    label: "Produtos",
    link: "product",
    icon: <MdOutlineShoppingCart />,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <aside
      className={`absolute left-0 top-0 z-50 h-screen w-32 bg-base-300  transition-transform duration-300 ease-in-out md:static md:translate-x-0 transform ${
        sidebarOpen ? "absolute translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="no-scrollbar flex flex-col overflow-y-auto">
        <nav className="my-2 py-4 text-center">
          <div>
            <h3 className="mb-5 text-sm font-semibold">MENU</h3>

            <ul className="flex flex-col">
              {menu.map((item: MenuItem, index: number) => {
                return (
                  <ItemSidebar item={item} index={index} key={item.label} />
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export { Sidebar };
