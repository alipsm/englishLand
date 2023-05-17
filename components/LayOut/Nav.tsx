import React, { useState } from "react";
import { ImageContainer } from "@/pages/api/imagesSrc";
// @ts-ignore
import { SelectTextBase } from "../modules/language/localizationd/languageBaseType.ts";
import NavLink from "../elements/NavLink";
const initFullScreenBtn = {
  img: ImageContainer.full_screen.img,
  alt: ImageContainer.full_screen.alt,
};
export default function NavBar() {
  const isActive = ({ isActive }: any) => `${isActive ? "active" : ""}`;
  const [toggleFullScreenBtn, setToggleFullScreenBtn] =
    useState(initFullScreenBtn);
  function fullscreen() {
    var isInFullScreen: boolean =
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      // @ts-ignore
      (document.webkitFullscreenElement &&
        // @ts-ignore
        document.webkitFullscreenElement !== null) ||
      // @ts-ignore
      (document.mozFullScreenElement &&
        // @ts-ignore
        document.mozFullScreenElement !== null) ||
      // @ts-ignore
      (document.msFullscreenElement && document.msFullscreenElement !== null);

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
        // @ts-ignore
      } else if (docElm.mozRequestFullScreen) {
        // @ts-ignore
        docElm.mozRequestFullScreen();
        // @ts-ignore
      } else if (docElm.webkitRequestFullScreen) {
        // @ts-ignore
        docElm.webkitRequestFullScreen();
        // @ts-ignore
      } else if (docElm.msRequestFullscreen) {
        // @ts-ignore
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        // @ts-ignore
      } else if (document.webkitExitFullscreen) {
        // @ts-ignore
        document.webkitExitFullscreen();
        // @ts-ignore
      } else if (document.mozCancelFullScreen) {
        // @ts-ignore
        document.mozCancelFullScreen();
        // @ts-ignore
      } else if (document.msExitFullscreen) {
        // @ts-ignore
        document.msExitFullscreen();
      }
    }
    setToggleFullScreenBtn(
      !isInFullScreen
        ? {
            img: ImageContainer.exit_full_screen.img,
            alt: ImageContainer.exit_full_screen.alt,
          }
        : initFullScreenBtn
    );
  }

  return (
    <div className="navBar h-20 w-full flex items-center justify-around">
      <div className="logo">
        <span className="text">English Land</span>
      </div>
      <div className="sections">
        <ul className="flex justify-between">
          <NavLink
            className={isActive}
            href="/englishLand/"
            exact="/englishLand/">
            home
          </NavLink>
          <NavLink className={isActive} href={"/englishLand/try"}>
            Try
          </NavLink>
          <NavLink className={isActive} href={"/englishLand/words"}>
            Words
          </NavLink>
          <NavLink className={isActive} href={"/englishLand/info"}>
            Info
          </NavLink>
        </ul>
      </div>
      <div className="flex justify-between items-center">
        {/* <div className="btn-style mr-4">dark</div> */}
        <div onClick={() => fullscreen()} className=" btn-style ">
          <img
            // fill
            src={toggleFullScreenBtn.img}
            alt={toggleFullScreenBtn.alt}
            className="inset-auto relative h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
