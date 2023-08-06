import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeechToBraille = () => {
  const [brailleText, setBrailleText] = useState("");
  const [englishText, setEnglishText] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const toBraille = (text) => {
    const mapping = {
      " ": "⠀",
      A: "⠁",
      B: "⠃",
      C: "⠉",
      D: "⠙",
      E: "⠑",
      F: "⠋",
      G: "⠛",
      H: "⠓",
      I: "⠊",
      J: "⠚",
      K: "⠅",
      L: "⠇",
      M: "⠍",
      N: "⠝",
      O: "⠕",
      P: "⠏",
      Q: "⠟",
      R: "⠗",
      S: "⠎",
      T: "⠞",
      U: "⠥",
      V: "⠧",
      W: "⠺",
      X: "⠭",
      Y: "⠽",
      Z: "⠵",
      0: "⠚",
      1: "⠁",
      2: "⠃",
      3: "⠉",
      4: "⠙",
      5: "⠑",
      6: "⠋",
      7: "⠛",
      8: "⠓",
      9: "⠊",
      ".": "⠲",
      ",": "⠂",
      ":": "⠒",
      ";": "⠔",
      "?": "⠦",
      "!": "⠖",
      "'": "⠄",
      '"': "⠐",
      "-": "⠤",
      "+": "⠖",
      "=": "⠶",
      "/": "⠸",
      "(": "⠦",
      ")": "⠴",
    };

    let brailleText = "";
    for (const char of text) {
      const brailleChar = mapping[char.toUpperCase()];
      brailleText += brailleChar ? brailleChar : "?"; // Handle unrecognized characters
    }

    return brailleText;
  };


  const converter = (txt) => {
    let tmp = "";
    for (const x of txt) {
      tmp += toBraille(x);
    }
    return tmp;
  };

  useEffect(() => {
    setEnglishText(transcript);
    setBrailleText(converter(transcript));
  }, [transcript]);

  const startListeningHandler = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListeningHandler = () => {
    SpeechRecognition.stopListening();
  };

  const resetHandler = () => {
    resetTranscript();
    setEnglishText("");
    setBrailleText("");
  };

  return (
    <div>
      <button onClick={startListeningHandler} disabled={listening}>
        Start Listening
      </button>
      <button onClick={stopListeningHandler} disabled={!listening}>
        Stop Listening
      </button>
      <button onClick={resetHandler} disabled={!transcript}>
        Reset
      </button>

      <div>
        <p>Recognized English Text:</p>
        <p>{englishText}</p>
      </div>
      <div>
        <p>Braille Text:</p>
        <p>{brailleText}</p>
      </div>
    </div>
  );
};

export default SpeechToBraille;
