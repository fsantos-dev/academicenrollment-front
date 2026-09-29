import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClassmatesResponse } from "../models/classmates.model";
import { APP_CONFIG } from "../../../core/config/app.config";

@Injectable({providedIn: 'root'})
export class ClassmatesService {
    
    private readonly http = inject(HttpClient);

    getAll(): Observable<ClassmatesResponse[]>{
        return this.http.get<ClassmatesResponse[]>(`${APP_CONFIG.apiUrl}/Classmate`);
    }
    
}