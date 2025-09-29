import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../store";

const SIZE_CONFIG = {
  sm: "max-w-[520px]",
  xl: "max-w-[1000px]",
  "2xl": "max-w-[1200px]",
};

const ModalComponent = ({ size = "xl", children, className }) => {
  const parentRef = useRef(null);
  const childRef = useRef(null);

  const [isChildGreater, setIsChildGreater] = useState(false);

  const { tabViewScreen } = useAppSelector((state) => state.app.app);

  const checkHeights = () => {
    const parentHeight = parentRef.current?.offsetHeight || 0;
    const childHeight = childRef.current?.offsetHeight || 0;

    setIsChildGreater(childHeight > parentHeight);
  };

  useEffect(() => {
    // Initial check
    checkHeights();

    // Re-check on resize
    window.addEventListener("resize", checkHeights);

    return () => window.removeEventListener("resize", checkHeights);
  }, [tabViewScreen]);

  return (
    <div
      ref={parentRef}
      className={classNames(
        "fixed z-50 top-0 left-0 w-full h-screen overflow-auto bg-[#00000050] flex justify-center",
        isChildGreater ? "py-[140px]" : "items-center"
      )}
    >
      <div
        ref={childRef}
        className={classNames(
          "w-full bg-[#ffffff] rounded-[25px] relative h-fit",
          SIZE_CONFIG[size],
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

const Modal = ({ isOpen = false, ...rest }) => {
  if (isOpen) return <ModalComponent {...rest} />;
};

export default Modal;
