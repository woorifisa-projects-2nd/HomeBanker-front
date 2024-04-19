import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function useSpeechToText() {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({
        language: "ko-KR",
        continuous: true,
      });
    }
  };

  const stopListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    }
  };

  const quitSpeechToText = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    }
  };

  return {
    transcript,
    listening,
    quitSpeechToText,
    toggleListening,
    resetTranscript,
  };
}
