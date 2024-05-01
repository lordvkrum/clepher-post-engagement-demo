import React, { useLayoutEffect } from "react";

interface UsePopoverPositionProps {
  wrapperRef?: React.RefObject<HTMLDivElement>;
  menuRef: React.RefObject<HTMLDivElement>;
  condition?: boolean;
}

const usePopoverPosition = ({
  wrapperRef,
  menuRef,
  condition = true,
}: UsePopoverPositionProps) => {
  useLayoutEffect(() => {
    if (condition && menuRef.current) {
      if (wrapperRef?.current) {
        const wrapperRect = wrapperRef.current.getBoundingClientRect();
        menuRef.current.style.top = `${wrapperRect.top + wrapperRect.height}px`;
        menuRef.current.style.left = `${wrapperRect.left}px`;
      }
      const menuRect = menuRef.current.getBoundingClientRect();
      const overflowX = Math.abs(menuRect.left - window.innerWidth);
      const overflowY = Math.abs(menuRect.top - window.innerHeight);
      let transform = "";
      if (menuRect.left + menuRect.width - window.innerWidth >= 0) {
        transform += `translateX(calc(-100% + ${overflowX}px - .5rem)) `;
      }
      if (menuRect.top + menuRect.height - window.innerHeight >= 0) {
        transform += `translateY(calc(-100% + ${overflowY}px - .5rem)) `;
      }
      menuRef.current.style.transform = transform;
    }
  }, [condition, wrapperRef, menuRef]);
};

export default usePopoverPosition;
