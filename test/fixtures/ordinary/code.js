import encodingFiniteCharacters from "encoding-finite-characters.macro";

const converter = encodingFiniteCharacters({
  characters: ["価格", "税込み", "報酬", "1234567890-,. \n"].join(""),
  from: "UNICODE",
  to: "SJIS"
});
