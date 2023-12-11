import React from "react";
import { useMediaQuery } from "react-responsive";
import LayoutMainMobile from "./LayoutMainMobile";
import LayoutMainDesktop from "./LayoutMainDesktop";


const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return isDesktop ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

export default function LayoutMain() {
  return (
    <div>
      <Desktop>
        <LayoutMainDesktop />
      </Desktop>
      <Mobile>
        <LayoutMainMobile />
      </Mobile>
    </div>
  );
}
