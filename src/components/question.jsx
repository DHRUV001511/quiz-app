import React, { useContext } from "react";
import { QuizContext } from "../context/quiz-context";

const Question = () => {
  const {
    quizData,
    currentQuestion,
    setCurrentQuestion,
    userAnswers,
    setAnswerForQuestion,
  } = useContext(QuizContext);

  const questionObj = quizData[currentQuestion];
  const selectedAnswer = userAnswers[currentQuestion];

  const handleOptionClick = (option) => {
    // prevent changing answer again (optional)
    if (!selectedAnswer) {
      setAnswerForQuestion(currentQuestion, option);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(currentQuestion + 1); // go to result
    }
  };

  // ✅ Determine answer correctness
  const isCorrect = selectedAnswer === questionObj.answer;

  return (
    <div>
      <h2>Question {currentQuestion + 1}</h2>
      <p className="question">{questionObj.question}</p>

      {questionObj.options.map((option, index) => (
        <button
          key={index}
          className={
            "option" + (selectedAnswer === option ? " selected" : "")
          }
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </button>
      ))}

      {/* ✅ SHOW STATUS MESSAGE AFTER SELECTION */}
      {selectedAnswer && (
        <div
          style={{
            marginTop: "20px",
            fontWeight: "bold",
            color: isCorrect ? "green" : "red",
            textAlign: "center",
          }}
        >
          {isCorrect ? "✅ Correct!" : `❌ Wrong! Correct answer is: ${questionObj.answer}`}
        </div>
      )}

      <div className="nav-buttons">
        <button onClick={goToPrevious} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={goToNext} disabled={!selectedAnswer}>
          {currentQuestion === quizData.length - 1
            ? "Finish Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default Question;
