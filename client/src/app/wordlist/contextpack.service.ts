import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContextPack } from './contextpack';
import { map } from 'rxjs/operators';
import { WordList } from './wordlist';


@Injectable({
  providedIn: 'root'
})
export class ContextPackService {
  readonly contextPackUrl: string = environment.apiUrl + 'wordlists';

  constructor(private httpClient: HttpClient) { }

  getContextPacks(): Observable<ContextPack[]> {
    return this.httpClient.get<ContextPack[]>(this.contextPackUrl, {
      params: new HttpParams(),
    });
  }

  getContextPack(id: string): Observable<ContextPack> {
    return this.httpClient.get<ContextPack>(this.contextPackUrl + '/' + id);
  }

  // addWordList method borrowed from Team Climate https://github.com/UMM-CSci-3601-S21/it-1-climate

  addWordList(newWordList: WordList): Observable<string> {
    const url: string[] = location.href.split('/');
    const urlNew: string = url[4];
    return this.httpClient.post<{id: string}>(this.contextPackUrl + '/' + urlNew, newWordList).pipe(map(res => res.id));
  }
}
