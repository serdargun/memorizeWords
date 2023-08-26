export type Data = {
  id: number;
  category_name: string;
  translate: string;
  top_category: number;
  words: Word[];
};

export type Word = {
  id: number;
  name: string;
  translate: string;
};

export type CategoryOnDb = {
  id: number;
  words: WordOnDb[];
};

export type WordOnDb = {
  id: number;
  level: number;
};

export type WordWithIndex = {
  word: Word;
  index: number;
};

export type Status = 'success' | 'fail';

export type Playground = number | 'finish';

export interface PlaygroundProps {
  batch: Word[];
  selectedWord: WordWithIndex;
  setSelectedWord: (word: WordWithIndex) => void;
  setSelectedPlayground: (playground: Playground) => void;
}
