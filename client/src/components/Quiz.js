import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);

    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        axios.get('https://quiz-portal-f7qw.onrender.com/api/questions')
            .then(res => setQuestions(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (showScore || questions.length === 0) return;

        if (timeLeft === 0) {
            handleAnswer(null, true);
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, showScore, questions]);

    const handleAnswer = (selectedOption, isTimeout = false) => {
        const currentQ = questions[currentQuestion];
        let newScore = score;
        let status = '';

        if (isTimeout) {
            status = 'Skipped';
        } else if (selectedOption === currentQ.correctAnswer) {
            newScore = score + 4;
            status = 'Correct';
        } else {
            newScore = score - 1;
            status = 'Wrong';
        }

        setScore(newScore);

        const answerRecord = {
            question: currentQ.questionText,
            selected: isTimeout ? "Time Out (Skipped)" : selectedOption,
            correct: currentQ.correctAnswer,
            status: status 
        };
        setUserAnswers([...userAnswers, answerRecord]);

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setTimeLeft(30);
        } else {
            setShowScore(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setUserAnswers([]);
        setTimeLeft(10);
    };

    if (questions.length === 0) return <h2>Loading Questions...</h2>;

    return (
        <div className='quiz-container'>
            {showScore ? (
                <div className='score-section'>
                    <h2>Final Score: {score}</h2>
                    
                    <div className="summary-list">
                        {userAnswers.map((item, index) => (
                            <div key={index} className={`summary-item ${item.status}`}>
                                <p className="q-text"><strong>Q{index + 1}:</strong> {item.question}</p>
                                <p>Your Answer: <b>{item.selected}</b></p>
                                {item.status !== 'Correct' && (
                                    <p className="correct-ans">Correct Answer: {item.correct}</p>
                                )}
                                <span className="status-badge">{item.status}</span>
                            </div>
                        ))}
                    </div>

                    <button className="restart-btn" onClick={handleRestart}>Play Again</button>
                </div>
            ) : (
                <>
                    {/* Header with Timer */}
                    <div className='quiz-header'>
                        <div className='question-count'>
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        {/* TIMER DISPLAY */}
                        <div className={`timer-box ${timeLeft <= 3 ? 'danger' : ''}`}>
                            Time: {timeLeft}s
                        </div>
                    </div>

                    <div className='question-section'>
                        <div className='question-text'>
                            {questions[currentQuestion].questionText}
                        </div>
                    </div>

                    <div className='answer-section'>
                        {questions[currentQuestion].options.map((option, index) => (
                            <button 
                                key={index} 
                                onClick={() => handleAnswer(option, false)}>
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Quiz;