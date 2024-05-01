import React, { useEffect } from "react";

interface UseClickOutsideProps {
  nodeRef: React.RefObject<HTMLDivElement> | React.RefObject<HTMLDivElement>[];
  condition?: boolean;
  onClick?: () => void;
}

const useClickOutside = ({
  nodeRef,
  condition = true,
  onClick,
}: UseClickOutsideProps) => {
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      let elements = nodeRef;
      if (!(elements instanceof Array)) {
        elements = [elements];
      }
      if (
        elements.filter((el) => !el.current?.contains(e.target as Element))
          .length === elements.length
      ) {
        onClick?.();
        document.removeEventListener("click", onClickOutside);
      }
    };
    if (condition) {
      document.addEventListener("click", onClickOutside);
    }
    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, [nodeRef, condition, onClick]);
};

export default useClickOutside;
