import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextPackCardComponent } from './contextpack-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { WordList } from '../word-list';

describe('ContextPackCardComponent', () => {
  let cpCard: ContextPackCardComponent;
  let fixture: ComponentFixture<ContextPackCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatCardModule
      ],
      declarations: [ ContextPackCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const testList: Array<WordList> = [];
    fixture = TestBed.createComponent(ContextPackCardComponent);
    cpCard = fixture.componentInstance;
    cpCard.contextPack = {
      _id: 'bat',
      schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
      name: 'batman',
      icon: '',
      enabled: true,
      wordlist: testList
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(cpCard).toBeTruthy();
  });
});
