import Image from "next/image";
import { Inter } from "next/font/google";
import { ImageContainer } from "./api/imagesSrc";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div className="flex flex-row-reverse justify-around items-center w-full h-full">
        <div className="robot relative w-2/5 ">
          <Image
            fill
            src={ImageContainer.robot_crooked_head.img}
            alt={ImageContainer.robot_crooked_head.alt}
            className="head-animation_10deg absolute inset-auto object-cover h-auto w-[17%] right-[30%] top-[8%]"
          />
          <Image
            fill
            src={ImageContainer.details_gray_screw_rod.img}
            alt={ImageContainer.details_gray_screw_rod.alt}
            className="inset-auto details-animation_x-10px h-auto absolute w-[7%] right-[60%] top-[9%]"
          />
          <Image
            fill
            src={ImageContainer.details_yellow_screw_rod.img}
            alt={ImageContainer.details_yellow_screw_rod.alt}
            className="inset-auto details-animation_x-10px delay-0 h-auto absolute w-[4%] top-[12%] right-[51%]"
          />
          <Image
            fill
            src={ImageContainer.details_gray_crooked_bar.img}
            alt={ImageContainer.details_gray_crooked_bar.alt}
            className="inset-auto details-animation_xy-10px duration-200 h-auto absolute w-[5%] right-[46%] top-[22%]"
          />
          <Image
            fill
            src={ImageContainer.robot_body_with_laptop.img}
            alt={ImageContainer.robot_body_with_laptop.alt}
            className="inset-auto body body-animation_x-10px relative h-auto w-full"
          />
        </div>
        <div className="info_parent w-3/5 h-full ">
          <h1>Teaching English is easier than fishing</h1>
          <h3>Do you still remember fishing?</h3>
          <p>in this site your trying english with a basic machine</p>
          <p>
            for progress better you try every day but remember this machine just
            checking your fishing skill and It doesn't teach you how to fish
          </p>
          <p>Good luck fisherman...</p>
          <div className="button-container">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <Link href={"/try"}>
              <button className="bn5 mt-2">Lets Start</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
