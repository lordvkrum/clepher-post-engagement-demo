import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import { Link } from "react-router-dom";

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
  className?: string;
  linkClassName?: string;
  onClick?: () => void;
}

const NavMenu = ({
  text,
  href = "/",
  icon,
  options,
  className,
  linkClassName,
  onClick,
}: NavMenuProps): JSX.Element => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (openMenu && menuRef.current) {
      const { left, width } = menuRef.current.getBoundingClientRect();
      const overflowX = Math.abs(left - window.innerWidth);
      if (left + width - window.innerWidth >= 0) {
        menuRef.current.style.transform = `translateX(calc(-100% + ${overflowX}px - .5rem))`;
      }
    }
  }, [openMenu]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Element)) {
        setOpenMenu(false);
        document.removeEventListener("click", onClickOutside);
      }
    };
    if (openMenu) {
      document.addEventListener("click", onClickOutside);
    }
    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, [openMenu]);

  return (
    <div ref={wrapperRef} className={classNames("relative", className)}>
      <Link
        to={href}
        onClick={(e) => {
          if (options?.length || onClick) {
            e.preventDefault();
            onClick?.();
            setOpenMenu((prev) => !prev);
          }
        }}
      >
        <div
          className={classNames(
            "w-10 h-10 text-base flex items-center justify-center rounded-full hover:bg-slate-300 hover:text-white",
            linkClassName
          )}
        >
          {icon && (
            <FontAwesomeIcon
              className={classNames({ "pe-2": text })}
              icon={icon}
            />
          )}
          {text}
        </div>
      </Link>
      {openMenu && options?.length && (
        <div
          ref={menuRef}
          role="menu"
          className="absolute p-2 mt-3 w-52 z-10 shadow rounded-lg border-slate-400 bg-slate-100"
        >
          <ul className="text-base">
            {options?.map((item) => {
              return (
                <Link
                  key={item.key || item.text}
                  to={`${href}${item.href || "/"}`}
                  onClick={() => setOpenMenu(false)}
                >
                  <li
                    role="menuitem"
                    className="w-full text-start rounded-md block p-2 hover:bg-slate-300 hover:text-white"
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
