import { Component, OnInit, Input } from '@angular/core';
import { ContextPack } from '../context-pack';

@Component({
  selector: 'app-wordlist-card',
  templateUrl: './wordlist-card.component.html',
  styleUrls: ['./wordlist-card.component.scss']
})
export class WordlistCardComponent implements OnInit {

  @Input() contextPack: ContextPack;
  @Input() simple ? = false;

  constructor() { }

  ngOnInit(): void {
  }

}
