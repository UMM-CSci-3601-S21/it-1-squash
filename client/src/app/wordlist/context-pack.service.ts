import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContextPack } from './context-pack';
import { map } from 'rxjs/operators';
import { WordList } from './word-list';


@Injectable({
  providedIn: 'root'
})
export class ContextPackService {
  readonly contextPackUrl: string = environment.apiUrl + 'wordlists';

  constructor(private httpClient: HttpClient) { }

  getPacks(): Observable<ContextPack[]> {
    return this.httpClient.get<ContextPack[]>(this.contextPackUrl, {
      params: new HttpParams(),
    });
  }

  getPack(id: string): Observable<ContextPack> {
    return this.httpClient.get<ContextPack>(this.contextPackUrl + '/' + id);
  }

  addWordList(newWordList: WordList): Observable<string> {
    const url: string[] = location.href.split('/');
    const urlNew: string = url[4];
    return this.httpClient.post<{id: string}>(this.contextPackUrl + '/' + urlNew, newWordList).pipe(map(res => res.id));
  }
}
