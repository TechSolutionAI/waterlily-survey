import { Question } from "@/lib/types";

interface SurveyPreviewProps {
    questions: Question[]; 
    values: { [key: number]: any };
}

export default function SurveyPreview({ questions, values }: SurveyPreviewProps) {
    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Survey Preview</h2>

            {questions.length === 0 ? (
                <p className="text-gray-500 text-center">No questions to preview.</p>
            ) : (
                <div className="space-y-6">
                    {questions.map((question) => {
                        const answer = values[question.order];
                        const formattedAnswer = question.type === "checkbox"
                            ? Array.isArray(answer)
                                ? answer.join(", ")
                                : "No answer provided"
                            : answer ?? "No answer provided";

                        return (
                            <div key={question.order} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <h3 className="text-lg font-semibold text-gray-700">{question.title}</h3>
                
                                <p className="text-sm text-gray-800 font-medium">
                                    <span className="text-gray-500">Answer:</span> {formattedAnswer}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}

            <form className="mt-8 text-center">
                <button
                    type="submit"
                    className="inline-block px-6 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                    Retake Survey
                </button>
            </form>
        </div>
    );
}
