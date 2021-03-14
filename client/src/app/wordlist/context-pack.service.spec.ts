import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ContextPackService } from './context-pack.service';

describe('ContextPackService', () => {
  let service: ContextPackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ContextPackService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
