import axios from "axios";
import React, { useEffect, useState } from "react";
// import englishWordsJson from "../../config/api/words.json";
import englishWordsJson from "../../config/words.json";

// @ts-ignore
import View from "./view.tsx";

import { translatedWordType } from "./translate";

export default function index() {
  //hangle show animation with state
  const [languageCardAnimation, setLanguageCardAnimation] = useState({
    card: "animate__zoomInDown",
    arrow: "animate__fadeInLeft",
    button: "animate__fadeInDown",
    trying: "animate__flash",
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
      trying: "",
    });
    setTimeout(() => {
      getNewEnglishWord();
      setLanguageCardAnimation({
        arrow: "animate__fadeInLeft",
        button: "animate__fadeInDown ",
        card: "animate__zoomInDown",
        trying: "animate__flash",
      });
    }, 700);
  }

  // getting a new english word
  function getNewEnglishWord() {
    let word =
      englishWordsJson[Math.floor(Math.random() * englishWordsJson.length)];
    // setEnglishWord((prevState)=>englishWordsJson[Math.floor(Math.random() * englishWordsJson.length)]);
    // console.log('englishWord :>> ', word);
    // ReactDOM.createPortal()
    getWordTranslate(word);
  }

  function setTranslateApiRespone(response: translatedWordType) {
    setLanguageCardData(response);
  }

  async function getWordTranslate(word: string) {
    var apiFind = false;

    const data = await axios
      .get(`https://www.faraazin.ir/api/dictionary?text=${word}`)
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
          trying: 4,
          finishGame: { end: false, win: false },
        });
        apiFind = true;
      })
      .catch((error) => {
        error.code == "ERR_NETWORK" && setLanguageCardData(undefined);
        console.log("error :>> ", error);
      });
  }

  function handleTringCount(params: boolean) {
    let cardData;
    if (languageCardData?.trying != undefined) {
      if (!params) {
        let limit = languageCardData.trying - 1;
        cardData = {
          ...languageCardData,
          trying: limit,
          finishGame: { end: limit <= 0, win: false },
        };
      } else if (params) {
        cardData = {
          ...languageCardData,
          finishGame: { end: true, win: true },
        };
      }
      setLanguageCardData(cardData);
    }
  }

  function tryingToFindTranslateWord(translate: string) {
    var checkingSuccessProcessing = false;
    debugger;
    if (!languageCardData?.finishGame.end) {
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
      handleTringCount(checkingSuccessProcessing);
    }
    return checkingSuccessProcessing;
  }

  function finishingTrying(winStatus: boolean | undefined) {
    languageCardData?.trying != undefined &&
      setLanguageCardData({
        ...languageCardData,
        finishGame: { end: true, win: winStatus },
      });
  }



  const localStorageKey = "englishLand";

  function checkingAndCreatingLocalStorage() {
    var localBookMark = localStorage.getItem(localStorageKey);
    if (localBookMark == null) {
      localStorage.setItem(localStorageKey, '{"bookMark":[],"hiddensWord":[]}');
    }
  }

  // bookmarking words
  function addingToTheBookMark(word: string) {
    checkingAndCreatingLocalStorage()
    var localBookMark = localStorage.getItem(localStorageKey);
    if (localBookMark!=null) {
      const jsonParse = JSON.parse(localBookMark);
      debugger
      jsonParse["bookMark"]?.includes(word) && jsonParse.bookMark.push(word);
      localStorage.setItem(localStorageKey, JSON.stringify(jsonParse));
    }
  }

  // init word
  useEffect(() => {
    getNewEnglishWord();
  }, []);

  return languageCardData ? (
    <View
      languageCardAnimation={languageCardAnimation}
      tryingToFindTranslateWord={tryingToFindTranslateWord}
      nextLanguageCard={nextLanguageCard}
      languageCardData={languageCardData}
      finishingTrying={finishingTrying}
      addingToTheBookMark={addingToTheBookMark}
    />
  ) : (
    <div className="flex justify-center items-center h-full flex-col">
      <h1 className=" text-xl">the goat ate the internet cable</h1>
      <h1 className=" text-sm"><i>please checking your network connection...</i></h1>
    </div>
  );
}
