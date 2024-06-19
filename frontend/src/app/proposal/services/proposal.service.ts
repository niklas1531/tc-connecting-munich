import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProposal } from '../interfaces/proposal';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  constructor(private readonly http: HttpClient) {}

  public getProposals(): Observable<IProposal[]> {
    return this.http.get<IProposal[]>(environment.apiUrl + '/proposals');
  }

  public getProposalById(id: number): Observable<IProposal> {
    return this.http.get<IProposal>(environment.apiUrl + `/proposals/${id}`);
  }

  public uploadProposalFile(file: FormData): Observable<any> {
    console.log(file);
    return this.http.post(environment.apiUrl + '/upload', file);
  }
}
