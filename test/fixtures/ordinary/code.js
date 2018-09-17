import { createConvertTable } from "encoding-finite-characters.macro";

const converter = createConvertTable({
  characters: "価格税込み報酬1234567890-,. \n",
  from: "UNICODE",
  to: "SJIS"
});
