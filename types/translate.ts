export type translatedWordType = {
  word: string;
  persianMeanings: string[];
  examples: string[]|undefined;
  trying:number,
  finishGame:{end:boolean,win:boolean|undefined}
};
