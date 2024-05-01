import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClickOutside from "hooks/useClickOutside";
import usePopoverPosition from "hooks/usePopoverPosition";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

interface DropdownOption {
  key?: string;
  text: string;
  onClick?: () => void;
}

interface DropdownProps {
  text: string;
  value?: string;
  options?: DropdownOption[];
}

const Dropdown = ({ text, value, options }: DropdownProps): JSX.Element => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    nodeRef: wrapperRef,
    condition: openMenu,
    onClick: () => setOpenMenu(false),
  });

  usePopoverPosition({ nodeRef: menuRef, condition: openMenu });

  return (
    <div ref={wrapperRef} className="text-base relative">
      <button
        className="px-2 h-7 flex items-center text-slate-900 border border-slate-900 rounded-lg hover:bg-slate-900 hover:text-white"
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        {text}
        <FontAwesomeIcon className="ps-2" icon={faCaretDown} />
      </button>
      {openMenu && options?.length && (
        <div
          ref={menuRef}
          role="menu"
          className="absolute p-2 z-10 mt-1 w-52 rounded-lg shadow border-slate-400 bg-slate-50"
        >
          <ul className="text-base">
            {options?.map((item) => {
              return (
                <li
                  key={item.key || item.text}
                  role="menuitem"
                  className={
                    "w-full text-start rounded-md block p-2 hover:bg-slate-300"
                  }
                >
                  <button
                    onClick={() => {
                      item.onClick?.();
                      setOpenMenu(false);
                    }}
                  >
                    {item.text}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
