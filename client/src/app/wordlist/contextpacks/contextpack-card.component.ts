import { Component, OnInit, Input } from '@angular/core';
import { ContextPack } from '../contextpack';

@Component({
  selector: 'app-contextpack-card',
  templateUrl: './contextpack-card.component.html',
  styleUrls: ['./contextpack-card.component.scss']
})
export class ContextPackCardComponent implements OnInit {

  @Input() contextPack: ContextPack;
  @Input() simple ? = false;

  constructor() { }

  ngOnInit(): void {
  }

}
