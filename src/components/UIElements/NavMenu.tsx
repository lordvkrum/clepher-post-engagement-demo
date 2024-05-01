import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import useClickOutside from "hooks/useClickOutside";
import usePopoverPosition from "hooks/usePopoverPosition";

export enum NavMenuEnum {
  NavHeader,
  SideMenu,
  NavPage,
}

interface NavMenuOption {
  text?: string;
  key?: string;
  href?: string;
  icon?: IconProp;
}

interface NavMenuProps {
  text?: string;
  href?: string;
  icon?: IconProp;
  options?: NavMenuOption[];
  variant?: NavMenuEnum;
  className?: string;
  linkClassName?: string;
  onClick?: () => void;
}

const NavMenu = ({
  text,
  href = "",
  icon,
  options,
  variant = NavMenuEnum.NavHeader,
  className,
  linkClassName,
  onClick,
}: NavMenuProps): JSX.Element => {
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isNavHeader = variant === NavMenuEnum.NavHeader;
  const isSideMenu = variant === NavMenuEnum.SideMenu;
  const isPageMenu = variant === NavMenuEnum.NavPage;
  const isActive = pathname.startsWith(href);

  useClickOutside({
    nodeRef: wrapperRef,
    condition: openMenu && isNavHeader,
    onClick: () => setOpenMenu(false),
  });

  usePopoverPosition({ nodeRef: menuRef, condition: openMenu && isNavHeader });

  return (
    <div
      ref={wrapperRef}
      className={classNames("text-base relative", className)}
    >
      <Link
        to={href}
        className={classNames("flex items-center", {
          "justify-start w-full p-2 rounded-t-lg shadow bg-slate-50 font-semibold text-slate-500":
            isPageMenu,
        })}
        onClick={(e) => {
          if (options?.length || onClick) {
            if (!isSideMenu) {
              e.preventDefault();
            }
            onClick?.();
            setOpenMenu((prev) => !prev);
          }
        }}
      >
        <div
          className={classNames(
            "flex items-center justify-center",
            linkClassName,
            {
              "hover:bg-slate-300 hover:text-white": !isActive || isNavHeader,
              "bg-slate-900 text-white": isSideMenu && isActive,
              "w-10 h-10 rounded-full": isNavHeader,
              "w-12 h-12 rounded-md": isSideMenu,
              "px-2": isPageMenu,
            }
          )}
        >
          {icon && (
            <FontAwesomeIcon
              className={classNames({ "pe-2": text, hidden: isPageMenu })}
              icon={icon}
            />
          )}
          {text}
        </div>
        {isSideMenu && isActive && options?.length && (
          <FontAwesomeIcon className="ps-2 lg:hidden" icon={faChevronRight} />
        )}
      </Link>
      {((isNavHeader && openMenu) || (isSideMenu && isActive) || isPageMenu) &&
        options?.length && (
          <div
            ref={menuRef}
            role="menu"
            className={classNames(
              "p-2 z-10 shadow border-slate-400 bg-slate-50",
              {
                absolute: isNavHeader,
                "lg:hidden": isSideMenu,
                "mt-3 w-52 rounded-lg": isSideMenu || isNavHeader,
                "w-full rounded-b-lg": isPageMenu,
              }
            )}
          >
            <ul className="text-base">
              {options?.map((item) => {
                const itemHref = `${href}${item.href || "/"}`;
                const itemIsActive = pathname.startsWith(itemHref);

                return (
                  <Link
                    key={item.key || item.text}
                    to={itemHref}
                    onClick={() => setOpenMenu(false)}
                  >
                    <li
                      role="menuitem"
                      className={classNames(
                        "w-full text-start rounded-md block p-2",
                        {
                          "hover:bg-slate-300": !itemIsActive || isNavHeader,
                          "bg-slate-900 text-white":
                            itemIsActive && (isSideMenu || isPageMenu),
                        }
                      )}
                    >
                      {item.icon && (
                        <FontAwesomeIcon
                          className={classNames("w-5", { "pe-2": item.text })}
                          icon={item.icon}
                        />
                      )}
                      {item.text}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        )}
    </div>
  );
};

export default NavMenu;
