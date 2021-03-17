import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextPack } from '../contextpack';
import { WordList } from '../wordlist';
import { ContextPackService } from '../contextpack.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wordlist-list',
  templateUrl: './contextpack-list.component.html',
  styleUrls: ['./contextpack-list.component.scss']
})
export class ContextPackListComponent implements OnInit, OnDestroy {

  public contextPacks: ContextPack[];

  public name: string;
  public icon: string;
  public enabled: boolean;
  public wordlist: Array<WordList>;
  getPackSub: Subscription;

  constructor(private packService: ContextPackService) { }

  getPacksFromServer(): void {
    this.unsub();
    this.getPackSub = this.packService.getContextPacks().subscribe(
      returnedPacks => {
        this.contextPacks = returnedPacks;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.getPacksFromServer();
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  unsub(): void {
    if(this.getPackSub) {
      this.getPackSub.unsubscribe();
    }
  }
}
