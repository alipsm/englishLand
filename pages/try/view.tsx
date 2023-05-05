import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { ImageContainer } from "../api/imagesSrc";

export default function Index({
  languageCardAnimation = {
    card: "" as string,
    arrow: "" as string,
    button: "" as string,
    trying: "" as string,
  }, //animations
  tryingToFindTranslateWord = () => {}, // checking correct translation
  nextLanguageCard = () => {}, // get new english
  languageCardData = {
    word: "" as string,
    persianMeanings: [] as string[],
    examples: [] as string[] | undefined,
    trying: 4 as number,
    finishGame: { end: false as boolean, win: false as boolean },
  },
  finishingTrying = (winStatus: boolean | undefined) => {},
}) {
  const [showingExample, setShowingExample] = useState(() => false);
  const inputRef = useRef(null);

  useEffect(() => {
    setShowingExample(false);
    if (inputRef.current != null) {
      // @ts-ignore
      inputRef.current.value = "";
      // @ts-ignore
      inputRef.current.focus();
    }
  }, [languageCardData.word]);

  useEffect(() => {
    console.log("inputRef", inputRef);
  }, [inputRef.current]);

  const getLanguageCardStatusColor = {
    undefined: "animate__fadeIn showingData",
    true: "animate__fadeIn win",
    false: "animate__fadeIn los",
  };

  return (
    <div className="flex flex-row-reverse justify-around items-center w-full h-full">
      <div className="robot relative w-2/5 ">
        <Image
          fill
          src={ImageContainer.details_black_cube.img}
          alt={ImageContainer.robot_head_focus.alt}
          className="details-animation_xy-10px absolute inset-auto object-cover right-[85%] top-[22%] w-[7.4%] h-auto "
        />{" "}
        <Image
          fill
          src={ImageContainer.details_orange_cube.img}
          alt={ImageContainer.robot_head_focus.alt}
          className="details-animation_xy-10px absolute inset-auto object-cover right-[23.7%] top-[9%] w-[10.6%] h-auto"
        />
        <Image
          fill
          src={ImageContainer.robot_head_focus.img}
          alt={ImageContainer.robot_head_focus.alt}
          className="details-animation_y-10px absolute inset-auto object-cover right-[44%] top-[6.4%] w-[13.4%] m-auto h-auto"
        />
        <Image
          fill
          src={ImageContainer.robot_body_focus.img}
          alt={ImageContainer.robot_body_focus.alt}
          className="inset-auto object-cover h-auto w-full body relative"
        />
      </div>
      <div className="flex justify-center items-center w-3/5 h-full">
        <form
          id="languageCord"
          onSubmit={(e) => e.preventDefault()}
          className={`animate__animated ${languageCardAnimation.card}`}>
          <div
            className={`parentCard animate__animated ${
              languageCardData.finishGame.end
                ? getLanguageCardStatusColor[
                    `${languageCardData.finishGame.win}`
                  ]
                : ""
            } `}>
            {/* card option */}
            <div className="options absolute right-0 top-0 ">
              <ul>
                <li>
                  <Image
                    fill
                    src={ImageContainer.hidden.img}
                    alt={ImageContainer.hidden.alt}
                    className="inset-auto object-cover w-8 body relative"
                  />
                </li>
                <li>
                  <Image
                    fill
                    src={ImageContainer.bookmark.img}
                    alt={ImageContainer.bookmark.alt}
                    className="inset-auto object-cover w-8 body relative"
                  />
                </li>
                <li>
                  <Image
                    fill
                    src={ImageContainer.show_property.img}
                    alt={ImageContainer.show_property.alt}
                    onClick={() => finishingTrying(undefined)}
                    className="inset-auto object-cover w-8 body relative"
                  />
                </li>
              </ul>
            </div>

            <div className=" h-[30%]">
              <p className="word">{languageCardData.word}</p>
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="translate"
                  ref={inputRef}
                />
                <div
                  className={`button-container inline-block text-center animate__animated animate__slideInRight `}>
                  <button
                    type="submit"
                    className=""
                    onClick={() => {
                      tryingToFindTranslateWord(
                        /* @ts-ignore */
                        inputRef.current && inputRef.current.value
                      );
                    }}>
                    <Image
                      fill
                      src={ImageContainer.whiteArrow.img}
                      alt={ImageContainer.whiteArrow.alt}
                      onClick={() => finishingTrying(undefined)}
                      className="inset-auto object-cover relative rotate-180"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="h-[50%] overflow-y-auto">
              <p className="meanings fle x pr-3 justify-evenly">
                {languageCardData.finishGame.end &&
                  languageCardData.persianMeanings.map((meaning: string) => (
                    <span> {meaning} </span>
                  ))}
              </p>
            </div>

            <hr />

            <div className="h-[20%] overflow-y-auto">
              {languageCardData.finishGame.end ||
              (languageCardData.examples?.length != 0 && showingExample) ? (
                languageCardData.examples?.map((example: string) => (
                  <p className="examples animate__animated animate__fadeIn">
                    {example}
                  </p>
                ))
              ) : (
                <div onClick={() => setShowingExample(true)}>
                  <Skeleton
                    width={"100%"}
                    height={"100%"}
                    containerClassName={""}
                    baseColor={"rgba(148,187,233,.2)"}
                    highlightColor={"rgba(148,187,233,.1)"}
                    className="   cursor-pointer "
                    count={languageCardData.examples?.length}
                  />
                </div>
              )}
            </div>

            {/* trying cout */}
            <div className="tringCount">
              <ul>
                {Array.from(Array(4), (e, i) => {
                  return (
                    <li
                      className={`${
                        languageCardData.trying > i
                          ? "bg-[#59CE8F]"
                          : "bg-[#F96666]"
                      } animate__animated ${
                        languageCardAnimation.trying
                      } animate__delay-1s`}>
                      {e}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="absolute -right-[10%] details-animation_x-10px-1s h-[10%]">
              <img
                src={ImageContainer.arrow.img}
                alt={ImageContainer.arrow.alt}
                onClick={() => nextLanguageCard()}
                className={`h-full  cursor-pointer animate__animated ${languageCardAnimation.arrow}   animate__delay-1s`}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
