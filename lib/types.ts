export interface Question {
    title: string;
    description: string;
    type: string;
    order: number;
    required: boolean;
    options?: string[];
    
}

export interface SurveyResponse {
    answer: string;
}