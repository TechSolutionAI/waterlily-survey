import { Question } from "@/lib/types";

interface SingleQuestionProps {
    question: Question,
    index: number,
    value: any,
    error: string,
    onChange: (index: number, value: any) => void,
}

export default function SingleQuestion({ question, index, value, error, onChange }: SingleQuestionProps) {
    const inputBaseClass = `w-full p-3 border rounded-md transition-all focus:outline-none focus:ring-2 ${
        error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
    }`;

    return (
        <div className="mb-6">
            <label htmlFor={`question-${index}`} className="block text-base font-semibold text-gray-800 mb-1">
                {question.title}
                {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {question.description && (
                <p className="text-sm text-gray-500 mb-3">{question.description}</p>
            )}

            {/* Number Input */}
            {question.type === "number" && (
                <input
                    id={`question-${index}`}
                    type="number"
                    required={question.required}
                    className={inputBaseClass}
                    value={value ?? ""}
                    onChange={(e) => onChange(index, e.target.value)}
                />
            )}

            {/* Radio Buttons */}
            {question.type === "radio" && question.options && (
                <div className="space-y-2">
                    {question.options.map((option, idx) => (
                        <label key={idx} className="flex items-center gap-2 text-sm">
                            <input
                                type="radio"
                                name={`question-${index}`}
                                value={option}
                                required={question.required}
                                checked={value === option}
                                onChange={(e) => onChange(index, e.target.value)}
                                className="accent-blue-600"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}

            {/* Select Dropdown */}
            {question.type === "select" && question.options && (
                <select
                    id={`question-${index}`}
                    required={question.required}
                    className={inputBaseClass}
                    value={value ?? ""}
                    onChange={(e) => onChange(index, e.target.value)}
                >
                    <option value="" disabled>Select an option</option>
                    {question.options.map((option, idx) => (
                        <option key={idx} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            )}

            {/* Checkboxes */}
            {question.type === "checkbox" && question.options && (
                <div className="space-y-2">
                    {question.options.map((option, idx) => (
                        <label key={idx} className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                value={option}
                                checked={Array.isArray(value) ? value.includes(option) : false}
                                onChange={(e) => {
                                    const prev = Array.isArray(value) ? value : [];
                                    if (e.target.checked) {
                                        onChange(index, [...prev, option]);
                                    } else {
                                        onChange(index, prev.filter((o: string) => o !== option));
                                    }
                                }}
                                className="accent-blue-600"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}

            {/* Error Message */}
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>
    );
}
