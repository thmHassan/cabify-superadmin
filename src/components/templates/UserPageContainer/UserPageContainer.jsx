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

const UserPageContainer = ({ children }) => {
  // const [activeId, setActiveId] = useState(null);

  // const handleToggle = (id) => {
  //   setActiveId((prev) => (prev === id ? null : id));
  // };

  const { signOut } = useAuth();
  const { role } = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleProfile = () => navigate(ACCOUNT_PATH);
  const handleLogout = () => signOut();

  return (
    <div className="flex">
      <div className="w-[300px] border-r-[0.7px] border-[#7A7A7A] py-[21px] h-screen overflow-auto fixed z-10 bg-[#ffffff]">
        <div className="px-8 mb-10">
          <AppLogoIcon />
        </div>
        <div className="flex flex-col gap-[30px]">
          {NAV_ELEMENTS[role].map(({ title, routes }, index) => (
            <div key={index}>
              <div className="text-[#7A7A7A] px-8 text-sm leading-[19px] font-semibold mb-[18px]">
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
      <div className="w-[calc(100%-300px)] ml-[300px]">
        <div className="h-[85px] bg-[#F5F5F5] pl-[15px] pr-[25px] pt-4 pb-[15px] flex justify-between fixed w-[calc(100%-300px)] z-50">
          <SearchBar />
          <div className="flex gap-5">
            <div className="min-w-[50px] h-[50px] rounded-full bg-[#FFFFFF] flex justify-center items-center">
              <SettingIcon />
            </div>
            <div className="min-w-[50px] h-[50px] rounded-full bg-[#FFFFFF] flex justify-center items-center">
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
                  label: "Logout",
                  icon: FaSignOutAlt,
                  onClick: handleLogout,
                },
              ]}
            >
              <div className="max-w-[200px] w-full rounded-[30px] bg-[#ffffff] py-[5px] pl-[5px] pr-5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden">
                  <img
                    src={userImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-semibold text-[18px] leading-[25px] min-w-[119px]">
                  <span>Username...</span>
                </div>
              </div>
            </UserDropdown>
          </div>
        </div>
        <div className="min-h-[calc(100vh-85px)] mt-[85px]">{children}</div>
      </div>
    </div>
  );
};

export default UserPageContainer;
