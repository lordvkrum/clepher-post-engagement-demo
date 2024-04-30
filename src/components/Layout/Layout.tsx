import React, { useMemo, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import classNames from "classnames";
import {
  faBuilding,
  faCircleCheck,
  faCommentDots,
  faLifeRing,
} from "@fortawesome/free-regular-svg-icons";
import { faker } from "@faker-js/faker";
import {
  faArrowRightFromBracket,
  faBars,
  faBookOpen,
  faCity,
  faFileLines,
  faGauge,
  faGear,
  faHome,
  faLink,
  faMagnet,
  faMoon,
  faShield,
  faTags,
  faUserAlt,
  faUsers,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import NavMenu from "components/UIElements/NavMenu";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";

const Layout = (): JSX.Element => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const companyName = useMemo(() => faker.company.name(), []);

  return (
    <div className="flex flex-col h-screen">
      <nav className="py-2 flex-shrink-0 flex items-center justify-start w-full h-16 border-b border-b-slate-400 bg-slate-100">
        <div className="px-2 w-16 flex justify-center">
          <NavMenu
            className="hidden lg:block"
            linkClassName="border border-slate-400 bg-slate-300"
            href="/home"
            icon={faCity}
          />
          <NavMenu
            className="max-w-10 lg:hidden"
            icon={faBars}
            onClick={() => setOpenMenu((prev) => !prev)}
          />
        </div>
        <div className="flex-1 flex items-center truncate px-2">
          <Link
            className="px-2 py-1 truncate text-base rounded-md border border-slate-300"
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
      <div className="relative flex-1">
        <aside
          className={classNames(
            "absolute top-0 left-0 z-10 w-16 h-full p-2 transition-transform -translate-x-full lg:translate-x-0 border-e border-e-slate-400 bg-slate-100",
            {
              "transform-none": openMenu,
            }
          )}
        >
          <NavMenu icon={faGauge} href="/dashboard" />
          <NavMenu
            icon={faUsers}
            href="/audience"
            options={[
              { text: "Subscribers", icon: faUsers, href: "/subscribers" },
              { text: "Tags", icon: faTags, href: "/tags" },
            ]}
          />
          <NavMenu icon={faCommentDots} href="/messages" />
          <NavMenu
            icon={faMagnet}
            href="/capture-tools"
            options={[
              { text: "Links Library", icon: faLink, href: "/links-library" },
              {
                text: "Post Engagement",
                icon: faFileLines,
                href: "/post-engagement",
              },
              {
                text: "Send To Messenger",
                icon: faFacebookMessenger,
                href: "/send-to-messenger",
              },
            ]}
          />
          <NavMenu icon={faGear} href="/settings" />
        </aside>
        <main className="p-2 lg:ms-16 h-full overflow-y-auto bg-slate-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
