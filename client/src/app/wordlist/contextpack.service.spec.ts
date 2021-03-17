import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ContextPack } from './contextpack';
import { ContextPackService } from './contextpack.service';
import { WordList } from './wordlist';
import { Word } from './word';

describe('ContextPackService', () => {
  const testList: Array<WordList> = [];
  const testCPs: ContextPack[] = [
    {
      _id: 'bat',
      schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
      name: 'batman',
      icon: '',
      enabled: false,
      wordlist: testList
    },
    {
      _id: 'robin',
      schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
      name: 'robin sidekick',
      icon: '',
      enabled: true,
      wordlist: testList
    },
    {
      _id: 'joker',
      schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
      name: 'joker villain',
      icon: '',
      enabled: true,
      wordlist: testList
    }
  ];
  let service: ContextPackService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ContextPackService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getContextPacks() should call api/wordlists', () => {
    service.getContextPacks().subscribe(
      packs => expect(packs).toBe(testCPs)
    );
  });

  it('getContextPack() calls api/wordlists/id', () => {
    const targetPack: ContextPack= testCPs[1];
    const targetId: string = targetPack._id;

    service.getContextPack(targetId).subscribe(
      pack => expect(pack).toBe(targetPack)
    );
  });

});
