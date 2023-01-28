import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VideoImportService {
  private baseUrl = 'https://localhost:44321/api';

  constructor(private http: HttpClient) { }

  

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/VideoImport/PostFile`);
  }
}