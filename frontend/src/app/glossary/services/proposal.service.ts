import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IGlossary } from '../../proposal/interfaces/glossary';

@Injectable({
  providedIn: 'root',
})
export class GlossaryService {
  constructor(private readonly http: HttpClient) {}

  public getGlossaries(): Observable<IGlossary[]> {
    return this.http.get<IGlossary[]>(environment.apiUrl + '/glossaries');
  }

  public getGlossaryById(id: string): Observable<IGlossary> {
    return this.http.get<IGlossary>(environment.apiUrl + `/glossaries/${id}`);
  }
}
