import { useState, useEffect } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../questions.js";

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({ selectedAnswer: "", isCorrect: null });
  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  useEffect(() => {
    if (answer.selectedAnswer === "") {
      const timeoutId = setTimeout(() => {
      }, timer);

      return () => clearTimeout(timeoutId);
    }
  }, [answer.selectedAnswer, timer]);

  function handleSelectAnswer(selectedAnswer) {
    const isCorrect = QUESTIONS[index].answers[0] === selectedAnswer;

    setAnswer({
      selectedAnswer,
      isCorrect: isCorrect || false,
    });

    setTimeout(() => {
      onSelectAnswer(selectedAnswer);
    }, 2000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
