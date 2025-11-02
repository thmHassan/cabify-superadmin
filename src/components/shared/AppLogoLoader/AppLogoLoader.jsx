import React from "react";
import AppLogoIcon from "../../svg/AppLogoIcon";

const AppLogoLoader = ({ size = 120, className = "" }) => {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div className={`flex items-center justify-center `}>
        <div
          style={{
            animation: "logoBlink 1.5s ease-in-out infinite",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppLogoIcon />
        </div>
        <style jsx>{`
          @keyframes logoBlink {
            0% {
              transform: scale(0.8);
              opacity: 0.3;
            }
            50% {
              transform: scale(1.1);
              opacity: 1;
            }
            100% {
              transform: scale(0.8);
              opacity: 0.3;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AppLogoLoader;
