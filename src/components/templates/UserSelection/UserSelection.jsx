import React, { useState } from "react";
import PageTitle from "../../ui/PageTitle";
import CardSubtitle from "../../ui/CardSubtitle";
import CardContainer from "../../shared/CardContainer";
import SelectedDoneIcon from "../../svg/SelectedDoneIcon";
import Button from "../../ui/Button/Button";
import {
  CLIENT_SIGN_IN_PATH,
  DISPATCHER_SIGN_IN_PATH,
  SIGN_IN_PATH,
} from "../../../constants/routes.path.constant/auth.route.path.constant";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const USERS_CONFIG = [
  {
    title: "Admin Dashboard",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    userColor: "#EEEDFF",
    route: SIGN_IN_PATH,
  },
  {
    title: "Client Admin Portal",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    userColor: "#E5F9F1",
    route: CLIENT_SIGN_IN_PATH,
  },
  {
    title: "Dispatcher Panel",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    userColor: "#FDF3E6",
    route: DISPATCHER_SIGN_IN_PATH,
  },
];

const UserSelection = () => {
  const [selectedUserRoute, setSelectedUserRoute] = useState(
    USERS_CONFIG[0].route
  );

  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-[735px] w-full mx-auto py-6 sm:py-8 lg:py-10 xl:py-14 px-4 sm:px-6">
        <div className="flex flex-col gap-[5px] mb-6 sm:mb-8 lg:mb-10 xl:mb-[50px]">
          <PageTitle title="Select a Dashboard" className="!text-[#3D3D3D]" />
          <CardSubtitle
            variant={1}
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            className="!text-[#3D3D3D]"
          />
        </div>
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 xl:gap-[30px] mb-6 sm:mb-8 lg:mb-10 xl:mb-[30px]">
          {USERS_CONFIG.map(
            ({ title, description, userColor, route }, index) => (
              <Button key={index} onClick={() => setSelectedUserRoute(route)}>
                <CardContainer
                  type={1}
                  className={classNames(
                    "px-3 sm:px-4 lg:px-5 pt-3 sm:pt-4 lg:pt-5 pb-4 sm:pb-6 lg:pb-[30px] shadow-[-4px_8px_20px_0px_#0000000D]",
                    { "!border-[#1F41BB4D]": route === selectedUserRoute }
                  )}
                >
                  <div className="flex gap-3 sm:gap-4 lg:gap-5">
                    <div className="w-12 sm:w-16 lg:w-20 flex-shrink-0">
                      <div
                        className="w-full h-12 sm:h-16 lg:h-20 rounded-[8px] sm:rounded-[10px]"
                        style={{ background: userColor }}
                      ></div>
                    </div>
                    <div className="flex-1 text-left pt-2 sm:pt-3 lg:pt-[17px] text-[#3D3D3D] font-semibold min-w-0">
                      <h2 className="text-xl sm:text-2xl lg:text-[28px] xl:text-[34px] leading-7 sm:leading-9 lg:leading-[40px] xl:leading-[46px] mb-3 sm:mb-4 lg:mb-5 xl:mb-[27px]">
                        {title}
                      </h2>
                      <p className="text-sm sm:text-base lg:text-lg xl:text-xl leading-5 sm:leading-6 lg:leading-[24px] xl:leading-[27px]">
                        {description}
                      </p>
                    </div>
                    <div className="pl-2 sm:pl-3 lg:pl-[18px] flex-shrink-0">
                      <div
                        className={classNames(
                          "w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex justify-center items-center",
                          {
                            "rounded-full border-2 border-[#3D3D3D]":
                              route !== selectedUserRoute,
                          }
                        )}
                      >
                        {route === selectedUserRoute && <SelectedDoneIcon />}
                      </div>
                    </div>
                  </div>
                </CardContainer>
              </Button>
            )
          )}
        </div>
        <div>
          <Button type="bgOutlined" onClick={() => navigate(selectedUserRoute)}>
            <CardSubtitle subtitle="Next" className="!text-[#1F41BB]" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
