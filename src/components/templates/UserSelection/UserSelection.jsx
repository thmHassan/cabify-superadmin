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
    <div>
      <div className="max-w-[735px] w-full mx-auto py-14">
        <div className="flex flex-col gap-[5px] mb-[50px]">
          <PageTitle title="Select a Dashboard" className="!text-[#3D3D3D]" />
          <CardSubtitle
            variant={1}
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            className="!text-[#3D3D3D]"
          />
        </div>
        <div className="flex flex-col gap-[30px] mb-[30px]">
          {USERS_CONFIG.map(
            ({ title, description, userColor, route }, index) => (
              <Button key={index} onClick={() => setSelectedUserRoute(route)}>
                <CardContainer
                  type={1}
                  className={classNames(
                    "px-5 pt-5 pb-[30px] shadow-[-4px_8px_20px_0px_#0000000D]",
                    { "!border-[#1F41BB4D]": route === selectedUserRoute }
                  )}
                >
                  <div className="flex gap-5">
                    <div className="w-20">
                      <div
                        className="w-full h-20 rounded-[10px]"
                        style={{ background: userColor }}
                      ></div>
                    </div>
                    <div className="w-[calc(100%-178px)] text-left pt-[17px] text-[#3D3D3D] font-semibold">
                      <h2 className="text-[34px] leading-[46px] mb-[27px]">
                        {title}
                      </h2>
                      <p className="text-xl leading-[27px]">{description}</p>
                    </div>
                    <div className="pl-[18px]">
                      <div
                        className={classNames(
                          "w-10 h-10 flex justify-center items-center",
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
