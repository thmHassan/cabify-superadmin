import React, { useState } from "react";
import useAuth from "../../../utils/hooks/useAuth";
import SettingIcon from "../../svg/SettingIcon";
import NotificationIcon from "../../svg/NotificationIcon";
import userImage from "../../../assets/Images/71067d46ba23cf7a8102bc3d1fab56453de3b958.jpg";
import AppLogoIcon from "../../svg/AppLogoIcon";
import { NAV_ELEMENTS } from "../../../constants/nav.route.constant/nav.route.constant";
import NavElement from "./components/NavElement";
import SearchBar from "../../shared/SearchBar/SearchBar";
import { useAppSelector } from "../../../store";
import UserDropdown from "../../shared/UserDropdown";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_PATH } from "../../../constants/routes.path.constant/user.route.path.constant";
import AppLogoLoader from "../../shared/AppLogoLoader";
import SearchIcon from "../../svg/SearchIcon";

const UserPageContainer = ({ children }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const { signOut } = useAuth();
  const user = useAppSelector((state) => state.auth.user);
  console.log(user, "user======");
  const navigate = useNavigate();

  // Fallback to admin role if superadmin role is not found in NAV_ELEMENTS
  const userRole = user.role || "admin";
  const navElements = NAV_ELEMENTS[userRole] || NAV_ELEMENTS["admin"];

  const handleProfile = () => navigate(ACCOUNT_PATH);
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex">
      <div
        className={`w-[85vw] max-w-[300px] border-r-[0.7px] border-[#7A7A7A] py-[21px] h-screen overflow-auto fixed z-[70] bg-[#ffffff] transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="px-6 lg:px-8 mb-6 lg:mb-10 flex items-center justify-between">
          <AppLogoIcon />
          <button
            type="button"
            className="lg:hidden w-10 h-10 grid place-items-center rounded-md hover:bg-[#f3f3f3]"
            aria-label="Close menu"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="block w-5 h-[2px] bg-[#111] rotate-45 translate-y-[1px]"></span>
            <span className="block w-5 h-[2px] bg-[#111] -rotate-45 -translate-y-[1px] -mt-[2px]"></span>
          </button>
        </div>
        <div className="flex flex-col gap-[30px]">
          {navElements.map(({ title, routes }, index) => (
            <div key={index}>
              <div className="text-[#7A7A7A] px-6 lg:px-8 text-sm leading-[19px] font-semibold mb-[18px]">
                {title}
              </div>
              <div className="flex flex-col gap-5">
                {routes.map((navItem, iIndex) => {
                  return <NavElement key={iIndex} navItem={navItem} />;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* overlay for small screens when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black/40 lg:hidden z-[60] ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        aria-hidden="true"
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <div className="w-full lg:w-[calc(100%-300px)] lg:ml-[300px]">
        <div className="h-[85px] bg-[#F5F5F5] px-3 sm:pl-[15px] sm:pr-[25px] pt-4 pb-[15px] flex items-center justify-between fixed w-full lg:w-[calc(100%-300px)] z-50">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 w-full pr-5">
            <button
              type="button"
              className="lg:hidden w-10 h-10 grid place-items-center rounded-md hover:bg-[#ffffff] border border-[#e5e5e5]"
              aria-label="Open menu"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span className="block w-5 h-[2px] bg-[#111]"></span>
              <span className="block w-5 h-[2px] bg-[#111] my-[5px]"></span>
              <span className="block w-5 h-[2px] bg-[#111]"></span>
            </button>
            <button
              className="flex sm:hidden min-w-[50px] h-[50px] rounded-full bg-[#FFFFFF] justify-center items-center"
              aria-label="Open search"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <SearchIcon />
            </button>
            <div className="min-w-0 flex-1 hidden sm:block">
              <SearchBar />
            </div>
          </div>
          <div className="flex gap-3 sm:gap-5 items-center">
            <div className="flex min-w-[50px] h-[50px] rounded-full bg-[#FFFFFF] justify-center items-center">
              <SettingIcon />
            </div>
            <div className="flex min-w-[50px] h-[50px] rounded-full bg-[#FFFFFF] justify-center items-center">
              <NotificationIcon />
            </div>
            <UserDropdown
              options={[
                {
                  label: "Profile",
                  icon: FaUser,
                  onClick: handleProfile,
                  route: ACCOUNT_PATH,
                },
                {
                  label: isLoggingOut ? "Logging out..." : "Logout",
                  icon: isLoggingOut
                    ? () => <AppLogoLoader size={50} />
                    : FaSignOutAlt,
                  onClick: handleLogout,
                  disabled: isLoggingOut,
                },
              ]}
            >
              <div className="max-w-[200px] w-full rounded-[30px] bg-[#ffffff] py-[5px] px-[5px] sm:pl-[5px] sm:pr-5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden">
                  <img
                    src={userImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden sm:flex font-semibold w-[calc(100%-56px)] text-[18px] leading-[25px] min-w-[119px] truncate capitalize">
                  <span>{user.name}</span>
                </div>
              </div>
            </UserDropdown>
          </div>
        </div>
        {/* Mobile sticky search bar under the header */}
        {isMobileSearchOpen && (
          <div className="sm:hidden fixed top-[64px] left-0 right-0 z-50 bg-[#F5F5F5] border-t border-[#e5e5e5] px-3 py-2 flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <SearchBar />
            </div>
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-[#ffffff] border border-[#e5e5e5] grid place-items-center"
              aria-label="Close search"
              onClick={() => setIsMobileSearchOpen(false)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6L18 18"
                  stroke="#111111"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M18 6L6 18"
                  stroke="#111111"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}
        <div
          className={`${
            isMobileSearchOpen ? "mt-[128px]" : "mt-[64px]"
          } sm:mt-[85px] min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-85px)]`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserPageContainer;
