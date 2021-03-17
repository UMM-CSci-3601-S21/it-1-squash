import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContextPack } from '../app/wordlist/context-pack';
import { ContextPackService } from '../app/wordlist/context-pack.service';
import { WordList } from '../app/wordlist/word-list';

@Injectable()
export class MockCPService extends ContextPackService {
    static testList: Array<WordList> = [];
    static testCPs: ContextPack[] = [
        {
            _id: 'bat',
            schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
            name: 'batman',
            icon: '',
            enabled: false,
            wordlist: MockCPService.testList
        },
        {
            _id: 'robin',
            schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
            name: 'robin sidekick',
            icon: '',
            enabled: true,
            wordlist: MockCPService.testList
        },
        {
            _id: 'joker',
            schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
            name: 'batman villains',
            icon: '',
            enabled: true,
            wordlist: MockCPService.testList
        }
    ];
    constructor() {
        super(null);
    }

    getPacks(): Observable<ContextPack[]> {
        return of(MockCPService.testCPs);
    }

    // getPack test borrowed from Team Climate https://github.com/UMM-CSci-3601-S21/it-1-climate

    getPack(id: string): Observable<ContextPack> {
        if (id === MockCPService.testCPs[0]._id) {
            return of(MockCPService.testCPs[0]);
        } else if (id === MockCPService.testCPs[1]._id) {
            return of(MockCPService.testCPs[1]);
        } else if (id === MockCPService.testCPs[2]._id) {
            return of(MockCPService.testCPs[2]);
        }
        else {
            return of(null);
        }
    }
}
