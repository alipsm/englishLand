import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { ImageContainer } from "../api/imagesSrc";

export default function Index({
  languageCardAnimation = {
    card: "" as string,
    arrow: "" as string,
    button: "" as string,
    trying:"" as string
  }, //animations
  tryingToFindTranslateWord = () => {}, // checking correct translation
  nextLanguageCard = () => {}, // get new english
  languageCardData={
    word:"" as string,
    persianMeanings:[] as string[],
    examples:[] as string[]|undefined,
    trying:4 as number,
    finishGame:false as boolean
  }
}) {

  const [showingExample, setShowingExample] = useState(() => false);
  const inputRef = useRef(null);

  useEffect(() => {
    setShowingExample(false);
  }, [languageCardData.word]);

  useEffect(() => {
    console.log("inputRef", inputRef);
  }, [inputRef.current]);

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
        <div
          id="languageCord"
          className={`animate__animated ${languageCardAnimation.card}`}>
          <div className=" h-[30%]">
            <p className="word">{languageCardData.word}</p>
            <div>
              <input
                type="text"
                name="inputTranslate"
                id=""
                placeholder="translate"
                ref={inputRef}
              />
              <label htmlFor="inputTranslate"></label>
            </div>
          </div>
          <div className="h-[50%] overflow-y-auto">
            <p className="meanings fle x pr-3 justify-evenly">
              {languageCardData.persianMeanings.map((meaning: string) => (
                <span> {meaning} </span>
              ))}
            </p>
          </div>

          <hr />

          <div className="h-[20%] overflow-y-auto">
            {languageCardData.examples?.length != 0 && showingExample ? (
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
              {Array.from(Array(4),(e,i)=>{
                return <li className={`${languageCardData.trying>i?"bg-[#59CE8F]":"bg-[#F96666]"} animate__animated ${languageCardAnimation.trying} animate__delay-1s`}>{e}</li>
              })
              }
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

          <div
            className={`button-container absolute w-full text-center -bottom-14 left-0 animate__animated ${languageCardAnimation.button} animate__delay-1s`}>
            <button
              className="  m-auto "
              onClick={() => {
                tryingToFindTranslateWord(
                  /* @ts-ignore */
                  inputRef.current && inputRef.current.value
                );
              }}>
              CHECK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
