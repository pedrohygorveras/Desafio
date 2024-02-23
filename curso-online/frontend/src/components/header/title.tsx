import React from "react";

import { MdArrowBack } from "react-icons/md";

interface HeaderProps {
  title: string;
  subtitle?: string | null;
  goBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, goBack }) => {
  return (
    <div className="py-8">
      <div className="flex items-center">
        {goBack && (
          <button
            className="btn btn-circle btn-secondary mr-4"
            onClick={goBack}
          >
            <MdArrowBack className="text-2xl" />
          </button>
        )}
        <div>
          <h1 className="font-bold text-2xl">{title}</h1>
          {subtitle && (
            <div>
              <h2 className="font-normal text-xs">{subtitle}</h2>
            </div>
          )}
        </div>
      </div>

      <div className="h-px bg-base-200 mt-5"></div>
    </div>
  );
};

export { Header };
