import React, { useMemo, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import classNames from "classnames";
import { faker } from "@faker-js/faker";
import {
  faBuilding,
  faCircleCheck,
  faCommentDots,
  faLifeRing,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faBars,
  faBookOpen,
  faCity,
  faGauge,
  faGear,
  faHome,
  faMoon,
  faShield,
  faUserAlt,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import useClickOutside from "hooks/useClickOutside";
import NavMenu, { NavMenuEnum } from "components/UIElements/NavMenu";
import AudienceMenu from "components/Navigation/AudienceMenu";
import CaptureToolsMenu from "components/Navigation/CaptureToolsMenu";

const Layout = (): JSX.Element => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const asideButtonRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);

  const companyName = useMemo(() => faker.company.name(), []);

  useClickOutside({
    nodeRef: [asideRef, asideButtonRef],
    onClick: () => setOpenMenu(false),
  });

  return (
    <div className="text-base flex flex-col h-screen overflow-hidden">
      <nav className="py-2 flex-shrink-0 flex items-center justify-start w-full h-16 border-b border-b-slate-400 bg-slate-50">
        <div className="px-2 w-16 flex justify-center">
          <NavMenu
            className="hidden lg:block"
            linkClassName="border border-slate-400 bg-slate-300"
            href="/home"
            icon={faCity}
          />
          <div ref={asideButtonRef}>
            <NavMenu
              className="max-w-10 lg:hidden"
              icon={faBars}
              onClick={() => setOpenMenu((prev) => !prev)}
            />
          </div>
        </div>
        <div className="flex-1 flex items-center truncate px-2">
          <Link
            className="px-2 py-1 truncate rounded-md border border-slate-300"
            to="/home"
          >
            {companyName}
          </Link>
        </div>
        <div className="ps-2 flex flex-row flex-nowrap hidden md:inline-flex">
          <NavMenu icon={faShield} href="/shield" />
          <NavMenu icon={faMoon} href="/theme" />
          <NavMenu
            icon={faLifeRing}
            options={[
              { text: "Status", icon: faCircleCheck, href: "/status" },
              { text: "Community", icon: faBuilding, href: "/community" },
              {
                text: "Knowledge Base",
                icon: faBookOpen,
                href: "/knowledge-base",
              },
            ]}
          />
        </div>
        <div className="pe-2">
          <NavMenu
            icon={faUserAlt}
            options={[
              { text: "Home", icon: faHome, href: "/home" },
              { text: "Billing", icon: faWallet, href: "/billing" },
              { text: "Account", icon: faUserAlt, href: "/account" },
              {
                text: "Logout",
                icon: faArrowRightFromBracket,
                href: "/logout",
              },
            ]}
          />
        </div>
      </nav>
      <div className="relative flex-1 overflow-hidden">
        <aside
          ref={asideRef}
          className={classNames(
            "absolute top-0 left-0 z-20 w-min-16 w-max-52 lg:w-16 h-full p-2 transition-transform -translate-x-full lg:translate-x-0 border-e border-e-slate-400 bg-slate-50",
            { "transform-none": openMenu }
          )}
        >
          <NavMenu
            variant={NavMenuEnum.SideMenu}
            icon={faGauge}
            href="/dashboard"
          />
          <AudienceMenu />
          <NavMenu
            variant={NavMenuEnum.SideMenu}
            icon={faCommentDots}
            href="/messages"
          />
          <CaptureToolsMenu />
          <NavMenu
            variant={NavMenuEnum.SideMenu}
            icon={faGear}
            href="/settings"
          />
        </aside>
        <main className="px-2 py-5 lg:ms-16 h-full overflow-y-auto bg-slate-200 grid grid-cols-1 gap-0 lg:grid-cols-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
