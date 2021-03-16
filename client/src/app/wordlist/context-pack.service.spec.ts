import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ContextPack } from './context-pack';
import { ContextPackService } from './context-pack.service';
import { WordList } from './word-list';
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

  it('getPacks() should call api/wordlists', () => {
    service.getPacks().subscribe(
      packs => expect(packs).toBe(testCPs)
    );
  });

  it('getPackById() calls api/wordlists/id', () => {
    const targetPack: ContextPack= testCPs[1];
    const targetId: string = targetPack._id;

    service.getPack(targetId).subscribe(
      pack => expect(pack).toBe(targetPack)
    );
  });

});
