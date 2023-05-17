import axios from "axios";
import React, { useEffect, useState } from "react";
// import englishWordsJson from "../../config/api/words.json";
import englishWordsJson from "../../../config/words.json";

// @ts-ignore
import View from "./view.tsx";

import { translatedWordType } from "../../../types/translate";
import { config } from "process";

export default function Index() {
  var http = require("http");
  // console.log('http', http)
  //hangle show animation with state
  const [languageCardAnimation, setLanguageCardAnimation] = useState({
    card: "animate__zoomInDown",
    arrow: "animate__fadeInLeft",
    button: "animate__fadeInDown",
    trying: "animate__flash",
  });

  // english word state
  const [englihsWord, setEnglishWord] = useState("please wait...");

  const [languageCardData, setLanguageCardData] = useState<translatedWordType>({
    word: "",
    persianMeanings: [],
    examples: undefined,
    trying: 0,
    finishGame: { end: false, win: undefined },
  });

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

  // Node.js program to demonstrate the
  // response.setHeaders() Method

  // Importing http module
  // var http = require('http');
  // console.log('http :>> ', http);
  // // Setting up PORT
  // const PORT = process.env.PORT || 3000;

  // // Creating http Server
  // var httpServer = http.createServer(
  //        function(request:any, response:any) {

  //   // Setting up Headers
  //   response.setHeader('Content-Type', 'text/html');
  //   response.setHeader('Set-Cookie', ['type=ninja',
  //   'language=javascript']);

  //   // Checking and  printing the headers
  //   console.log("When Header is set a string:",
  //   response.getHeader('Content-Type'));
  //   console.log("When Header is set an Array:",
  //   response.getHeader('Set-Cookie'));

  //   // Getting the set Headers
  //   const headers = response.getHeaders();

  //   // Printing those headers
  //   console.log(headers);

  //   // Prints Output on the browser in response
  //   response.writeHead(200,
  //     { 'Content-Type': 'text/plain' });
  //   response.end('ok');
  // });
  // console.log('httpServer', httpServer)

  async function getWordTranslate(word: string) {
    // const h= new Headers();
    // const http = require('http');
    // h.append("Access-Control-Allow-Origin","*")
    // console.log('http', http)
    var apiFind = false;
    const headerRegisterUser = {
      "access-control-allow-methods": "*",
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    };
    // axios.defaults.headers.common['Remote Address'] = "185.130.78.123:443"
    // axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'
    // axios.defaults.headers.get=headerRegisterUser;
    // response.setHeader('Content-Type', 'text/html');
    const data = await axios
      .get(`https://www.faraazin.ir/api/dictionary?text=${word}`, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
      })
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
        setTimeout(() => {
          getNewEnglishWord();
        }, 3000);
        // error.code == "ERR_NETWORK" && setLanguageCardData({...languageCardData,word:""});
        console.log("error :>> ", error);
      });
    // axios.defaults.headers.common["Authorization"] = `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDY4MmU4OGZhZDQ2ZGNjYzZkZDE4YzkwYjM3MWNlMjc4ZGRiY2Q3NGFlNDFiZWE0ODcyNTAzMDcwZTQzYjQyNGZjYWI4ZDFmNTY2MTkwYzMiLCJpYXQiOjE2NzYwMTgwNDYuODE3ODI2LCJuYmYiOjE2NzYwMTgwNDYuODE3ODI5LCJleHAiOjE3MDc1NTQwNDYuNzgyMjUxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.C3aZSp8LQBQDvas4sDmh_yd6YDl9oUZum-MFWpg8ijXMDnKQsl7l1nvhKzIOIi1x9FicE_Q6VeDGrM3dQcfWvbbmux2KV96oBjdIKxORsOVZapf1vHlV0n_r54GYGIeVGEH1lE5l4Lh9zU6onjUFjXf6Ai7YTknshvLpCHM726s5dKfWWeyKuXzc8bA5ggv7mcKRongCMj3phWKVeCYksrcwFMssIRsVsVGSadan1xhjWdv7wgI_9kOjMV8dKhmfEVoJYxdzBiQvd7GJaIBuasyA8abgIEyhVyQmfHDH0RkdOiBpZFi0Ao1IK1TrKQ_MdJknQkhnQv7pJT1rsxFR8QkoxWnevSAAMVvZU9Ivgj76YPRKXJhRUShpTLWC1YZbjxkpTPT91VpsW5gxjsDWkichCLbymAa0JbuzPwNXsXOal5OLFhAVHApjOe5itr1w0fT1gb3WsTl5OT1fq4SmU2hog4nQqFaxu7wbKdpgRHkjuYtSMxuqCd_tdUzqpJh8o4R1T-IL51eqX1nZqv9FvEAFi6iIiOPqWlIh_2ZvwmMlN0UU8LF8A4MIhyeqYeJ98fbyZFgeVe0h5lBNhzwqZQEu5TZj9CpWwGzHE1dhbepttTlwwuFYP5UIaWDAkkC8Fn6e1g1pioNQGmb0VtMmtVCFju6WDUTmd5Y_WnP3Of8"}`
    // const data =await axios.get("https://toplearnapi.ghorbany.dev/api/courses")
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
      cardData && setLanguageCardData(cardData);
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
    checkingAndCreatingLocalStorage();
    var localBookMark = localStorage.getItem(localStorageKey);
    if (localBookMark != null) {
      const jsonParse = JSON.parse(localBookMark);
      debugger;
      jsonParse["bookMark"]?.includes(word) && jsonParse.bookMark.push(word);
      localStorage.setItem(localStorageKey, JSON.stringify(jsonParse));
    }
  }

  // init word
  useEffect(() => {
    // httpServer()
    getNewEnglishWord();
  }, []);

  return languageCardData.word != "" ? (
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
      <h1 className=" text-sm">
        <i>please checking your network connection...</i>
      </h1>
    </div>
  );
}
