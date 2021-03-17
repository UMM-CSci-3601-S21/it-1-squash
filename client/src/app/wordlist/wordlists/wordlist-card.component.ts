import { Component, OnInit, Input } from '@angular/core';
import { WordList } from '../wordlist';

@Component({
  selector: 'app-wordlists-card',
  templateUrl: './wordlist-card.component.html',
  styleUrls: ['./wordlist-card.component.scss']
})
export class WordlistCardComponent implements OnInit {

  @Input() wordList: WordList;
  @Input() simple ? = false;

  constructor() { }

  ngOnInit(): void {
  }

}
