import Image from "next/image";
import React from "react";
import { ImageContainer } from "./api/imagesSrc";
// import { ImageContainer } from "../assets/img";

export default function Info() {
  return (
    <div className="flex flex-row-reverse justify-around items-center w-full h-4/5">
      <div className="robot relative w-2/5">
        {/* <div className="details-animation_x-10px absolute top-[3%] right-[44%] w-[17%] m-auto">
          <div className=" relative">
            <img
              src={ImageContainer.robot_forward_head.img}
              alt={ImageContainer.robot_forward_head.alt}
              className=""
            />
          </div>
        </div>
        <img
          src={ImageContainer.robot_hello_forward_body.img}
          alt={ImageContainer.robot_hello_forward_body.alt}
        /> */}
        {/* <div className=" rounded-3xl rounded-t-full  relative  w-2/5 "> */}
          <Image
            fill
            src={ImageContainer.info_person.img}
            alt={ImageContainer.info_person.alt}
            className="inset-auto object-cover h-auto w-3/5 relative bottom-0 m-auto"
          />
          {/* <img
            src={ImageContainer.info_person.img}
            alt={ImageContainer.info_person.alt}
            className=" absolute bottom-0 m-auto"
          /> */}
        {/* </div> */}
      </div>
      <div className="info_parent w-3/5 h-full ">
        <h2>
          Peace be upon you, O human or{" "}
          <a
            href="https://en.wikipedia.org/wiki/Web_crawler"
            target={"_blank"}
            rel="noreferrer"
            className="linkStyle">
            <strong>crawler</strong>
          </a>
        </h2>
        <p>my name is ali parsamanesh</p>
        <p>i'm a web and desktop developer</p>
        <p>my language english is weak</p>
        <p>
          that's why I creating this site i hope to better my english language
          skill
        </p>
        <p>
          If you want to know more about me better see my{" "}
          <a
            href="https://www.linkedin.com/in/ali-parsamanesh/"
            rel="noreferrer"
            target={"_blank"}
            className="linkStyle">
            <i>linkedin</i>
          </a>{" "}
          page
        </p>
        <p className=" mt-4 opacity-80">Thank you for taking your time :)</p>
      </div>
    </div>
  );
}
