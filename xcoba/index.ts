import { sumBy, omit } from "lodash";

type DataItem = {
  no: number;
  provinceId: number;
  name: string;
  candidate: string;
  value: number;
  trust: number;
  anger: number;
  anticipation: number;
  disgust: number;
  fear: number;
  joy: number;
  sadness: number;
  surprise: number;
};

type SummedData = Omit<DataItem, "no" | "provinceId" | "name" | "candidate">;

const dataA: DataItem[] = [
  {
    no: 1,
    provinceId: 16,
    name: "Jawa Timur",
    candidate: "Prabowo Subianto",
    value: 27427306,
    trust: 6891372,
    anger: 1224347,
    anticipation: 2671986,
    disgust: 3129915,
    fear: 1797872,
    joy: 5644267,
    sadness: 2524025,
    surprise: 3543370,
  },
  {
    no: 2,
    provinceId: 14,
    name: "Jawa Tengah",
    candidate: "Prabowo Subianto",
    value: 21630342,
    trust: 5023227,
    anger: 1097897,
    anticipation: 2337485,
    disgust: 2784239,
    fear: 1288577,
    joy: 4306157,
    sadness: 1423553,
    surprise: 3369074,
  },
];

const dataB: SummedData = {
  value: sumBy(dataA, "value"),
  trust: sumBy(dataA, "trust"),
  anger: sumBy(dataA, "anger"),
  anticipation: sumBy(dataA, "anticipation"),
  disgust: sumBy(dataA, "disgust"),
  fear: sumBy(dataA, "fear"),
  joy: sumBy(dataA, "joy"),
  sadness: sumBy(dataA, "sadness"),
  surprise: sumBy(dataA, "surprise"),
};

console.log(dataB);


export { }