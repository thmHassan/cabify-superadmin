import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Base from "../../animations/Base";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

const UserDropdown = ({ children, options = [], className }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const { pathname } = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative inline-block text-left select-none" ref={ref}>
      <div className="cursor-pointer" onClick={() => setOpen(!open)}>
        {children}
      </div>

      <AnimatePresence>
        {open && (
          <Base
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border"
          >
            <ul className="py-2">
              {options.map((opt, idx) => {
                const Icon = opt.icon;
                return (
                  <li
                    key={idx}
                    className="px-2 group"
                    onClick={() => {
                      opt.onClick();
                      setOpen(false);
                    }}
                  >
                    <div
                      className={classNames(
                        "hover:bg-gray-100 mb-1 group-last:mb-0 flex items-center gap-2.5 cursor-pointer px-4 py-2 rounded-lg",
                        {
                          "bg-[#1F41BB] text-[#ffffff]":
                            pathname === opt?.route,
                        },
                        className
                      )}
                    >
                      {opt.icon && (
                        <span>
                          <Icon
                            color={
                              pathname === opt?.route ? "#ffffff" : "#000000"
                            }
                          />
                        </span>
                      )}
                      {opt.label}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Base>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
