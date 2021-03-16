import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextPackListComponent } from './contextpack-list.component';

describe('ContextPackListComponent', () => {
  let component: ContextPackListComponent;
  let fixture: ComponentFixture<ContextPackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextPackListComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextPackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
