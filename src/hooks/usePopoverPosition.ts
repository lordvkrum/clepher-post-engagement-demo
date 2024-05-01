import React, { useLayoutEffect } from "react";

interface UsePopoverPositionProps {
  nodeRef: React.RefObject<HTMLDivElement>;
  condition?: boolean;
}

const usePopoverPosition = ({
  nodeRef,
  condition = true,
}: UsePopoverPositionProps) => {
  useLayoutEffect(() => {
    if (condition && nodeRef.current) {
      const { top, left, width, height } =
        nodeRef.current.getBoundingClientRect();
      const overflowX = Math.abs(left - window.innerWidth);
      const overflowY = Math.abs(top - window.innerHeight);
      let transform = "";
      if (left + width - window.innerWidth >= 0) {
        transform += `translateX(calc(-100% + ${overflowX}px - .5rem)) `;
      }
      if (top + height - window.innerHeight >= 0) {
        transform += `translateY(calc(-100% + ${overflowY}px - .5rem)) `;
      }
      nodeRef.current.style.transform = transform;
    }
  }, [condition, nodeRef]);
};

export default usePopoverPosition;
