import React from "react";
import { Outlet } from "react-router-dom";

interface PageWithMenuProps {
  menu?: React.ReactNode;
}

const PageWithMenu = ({ menu }: PageWithMenuProps): JSX.Element => {
  return (
    <>
      <div className="px-6 col-span-2 hidden lg:block">{menu}</div>
      <div className="lg:col-span-7 h-full overflow-y-auto">
        <Outlet />
      </div>
    </>
  );
};

export default PageWithMenu;
