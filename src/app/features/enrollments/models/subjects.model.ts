export interface SubjectResponse {
    id: number;
    name: string;
    credits: number;
    professorId: number;
    professorName: string;
    estado: string;
    enrollmentId?: number | null;
}