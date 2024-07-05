import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { switchMap, take, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProposal } from '../../proposal/interfaces/proposal';
import {
  setProposals,
  setSession,
} from '../../proposal/states/proposal-overview.actions';
import { Chat, userType } from '../interfaces/chat';

@Injectable({
  providedIn: 'root',
})
export class SearchEngineService {
  private chatHistory: Chat[] = [];
  private loading = false;

  constructor(private http: HttpClient, private store: Store) {}

  public get ChatHistory(): Chat[] {
    return this.chatHistory;
  }

  public get Loading(): boolean {
    return this.loading;
  }

  public addChat(chat: Chat): void {
    this.chatHistory.push(chat);
    this.loading = true;
    this.sortChatHistory();
    this.http
      .post<{
        response: string;
        filtered_proposals: IProposal[];
        searchSessionId: string;
      }>(environment.apiUrl + '/search', chat.message)
      .pipe(
        take(1),
        tap((response) =>
          this.chatHistory.push({
            message: response.response,
            userType: userType.SYSTEM,
            time: new Date().toISOString(),
          })
        ),
        switchMap(
          (response) => (
            this.store.dispatch(
              new setProposals({ proposals: response.filtered_proposals })
            ),
            this.store.dispatch(
              new setSession({ sessionId: response.searchSessionId })
            )
          )
        ),
        tap(() => (this.loading = false))
      )
      .subscribe();
  }

  private sortChatHistory(): void {
    this.chatHistory = this.chatHistory.sort((a, b) => {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    });
  }
}
