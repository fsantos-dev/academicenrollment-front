export interface EnrollmentRequest {
    subjectId : number;
}

export interface EnrollmentResponse {
    id : number;
    subjectId : number;
    subjectName: string;
    credits: number;
    professorName: string;
}