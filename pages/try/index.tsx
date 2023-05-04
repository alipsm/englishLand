import axios from "axios";
import React, { useEffect, useState } from "react";
// import englishWordsJson from "../../config/api/words.json";
import englishWordsJson from '../../config/words.json'

// @ts-ignore
import View from "./view.tsx";

import { translatedWordType } from "./translate";

export default function index() {
  //hangle show animation with state
  const [languageCardAnimation, setLanguageCardAnimation] = useState({
    card: "animate__zoomInDown",
    arrow: "animate__fadeInLeft",
    button: "animate__fadeInDown",
  });

  // english word state
  const [englihsWord, setEnglishWord] = useState("please wait...");

  const [languageCardData, setLanguageCardData] =
    useState<translatedWordType>();

  // moving to right card and set new english word for card
  function nextLanguageCard() {
    setLanguageCardAnimation({
      arrow: "",
      button: "",
      card: "animate__zoomOutRight",
    });
    setTimeout(() => {
      getNewEnglishWord();
      setLanguageCardAnimation({
        arrow: "animate__fadeInLeft",
        button: "animate__fadeInDown ",
        card: "animate__zoomInDown",
      });
    }, 700);
  }

  // getting a new english word
  function getNewEnglishWord() {
    setEnglishWord(
      englishWordsJson[Math.floor(Math.random() * englishWordsJson.length)]
    );
  }

  function setTranslateApiRespone(response: translatedWordType) {
    setLanguageCardData(response);
  }

  async function getWordTranslate() {
    const data = await axios
      .get(`https://www.faraazin.ir/api/dictionary?text=${englihsWord}`)
      .then((response) => {
        let objKeys = Object.keys(response.data.typeToMeanings);
        let wordExpampleBase = (name: string) => {
          return response.data.typeToMeanings[name];
        };
        setTranslateApiRespone({
          word: response.data.name,
          persianMeanings: [
            ...objKeys.map((key) => wordExpampleBase(key)?.meanings),
          ][0],
          examples: [
            ...objKeys.map(
              (key) =>
                wordExpampleBase(key)?.definitionExamples &&
                wordExpampleBase(key)?.definitionExamples[0].example
            ),
          ].filter(Boolean),
          trying:4
        });
      })
      .catch((error) => {
        error.code=="ERR_NETWORK"&&setLanguageCardData(undefined);
        console.log('error :>> ', error);
      });
  }

  function handleTringCount(params:boolean) {
    if (!params&&languageCardData?.trying!=undefined) {
      // languageCardData.trying--
      setLanguageCardData({...languageCardData,trying:languageCardData.trying-1})
    }    
  }

  function tryingToFindTranslateWord(translate: string) {
    var checkingSuccessProcessing = false;

    // Sensitivity to word length
    const avgUserTranslate = Math.floor(translate.length / 3);

    languageCardData?.persianMeanings.forEach((persinaMeaning) => {

      if (checkingSuccessProcessing) {
        return checkingSuccessProcessing;
      }

      if (
        persinaMeaning.length <= translate.length + avgUserTranslate &&
        persinaMeaning.length >= translate.length - avgUserTranslate
      ) {

        // getting words letters
        const persianMeaningLetters = [...persinaMeaning];
        const userTranslateLetters = [...translate];

        let correctLetters = 0;

        // checking correct letters (meaning in userTranslate)
        persianMeaningLetters.forEach((letter) => {
          userTranslateLetters.includes(letter) && correctLetters++;
        });

        // Sensitivity to correct words
        if ((correctLetters / persianMeaningLetters.length) * 100 > 70) {
          checkingSuccessProcessing = true;
        }
      }
    });
    handleTringCount(checkingSuccessProcessing)
    return checkingSuccessProcessing;
  }

  // init word
  useEffect(() => {
    getNewEnglishWord();
  }, []);

  useEffect(() => {
    getWordTranslate();
  }, [englihsWord]);

  return languageCardData ? (
    <View
      languageCardAnimation={languageCardAnimation}
      tryingToFindTranslateWord={tryingToFindTranslateWord}
      nextLanguageCard={nextLanguageCard}
      languageCardData={languageCardData}
    />
  ) : <div className="flex justify-center items-center "><h1 className="">please checking your network connection...</h1></div>;
}
