import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextPackService } from '../contextpack.service';
import { Subscription } from 'rxjs';
import { ContextPack } from '../contextpack';
import { ActivatedRoute } from '@angular/router';
import { WordList } from '../wordlist';

@Component({
  selector: 'app-wordlist-info',
  templateUrl: './contextpack-info.component.html',
  styleUrls: ['./contextpack-info.component.scss']
})
export class ContextPackInfoComponent implements OnInit, OnDestroy {

  contextPack: ContextPack;
  wordList: Array<WordList>;
  wordlist: Array<WordList>;
  id: string;
  _id: string;
  getCpSub: Subscription;

  constructor(private route: ActivatedRoute, private contextPackService: ContextPackService) { }

  ngOnInit(): void {
       this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      if (this.getCpSub) {
        this.getCpSub.unsubscribe();
      }
      this.getCpSub = this.contextPackService.getContextPack(this.id).subscribe(contextPack => this.contextPack = contextPack);
    });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    if (this.getCpSub) {
      this.getCpSub.unsubscribe();
    }
  }

}
