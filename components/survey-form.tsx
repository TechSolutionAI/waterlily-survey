"use client";

import { useState } from "react";
import { Question } from "@/lib/types";
import SurveyPreview from "./survey-preview";
import SingleQuestion from "./single-question";
import Progress from "./progress";

interface SurveyFormProps {
    questions: Question[];
}

export default function SurveyForm({ questions }: SurveyFormProps) {
    const [answers, setAnswers] = useState<{ [key: number]: any }>({});
    const [error, setError] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(questions[index]);
    const totalQuestions = questions.length;

    const handleChange = (index: number, value: any) => {
        setAnswers((prev) => ({ ...prev, [index]: value }));
        setError(""); 
    };

    const validate = () => {
        let newError = "";
        
        const answer = answers[index];
        if (question.required && answer === "") {
            newError = `Please answer the question: ${question.title}`;
        }
        if (question.type === "number" && isNaN(answers[index])) {
            newError = `Please enter a valid number for: ${question.title}`;
        }
        setError(newError);
        return newError === "";
    };

    const handleSubmit = async () => {
        if (validate()) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/survey`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ response: answers }),
            });

            if (res.ok) {
               setIsSubmitted(true);
            } else {
                setError("Failed to submit the survey. Please try again later.");
            }
        }
    };

    const handlePre = () => {
        if (index > 0) {
            setIndex(index - 1);
            setQuestion(questions[index - 1]);
        }
    };
    const handleNext = () => {
        if (index < totalQuestions - 1) {
            if (validate()) {
                setIndex(index + 1);
                setQuestion(questions[index + 1]);
                setError(""); // Reset error on next question
            }
        } else {
            handleSubmit();
        }
    };
    if (isSubmitted) {
        return (
            <div>
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                <p>Your survey has been submitted successfully.</p>
            </div>
            <SurveyPreview questions={questions} values={answers} />
            </div>
        );
    }

    return (
        <div>
            <Progress current={index + 1} total={totalQuestions} />
            <SingleQuestion 
                question={question} 
                index={index} 
                value={answers[index]} 
                error={error} 
                onChange={handleChange} />
            <div className="flex justify-between mt-4">
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    onClick={handlePre}
                >
                    Back
                </button>
                <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
}