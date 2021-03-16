import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { MockCPService } from 'src/testing/context-pack.service.mock';
import { ContextPack } from '../context-pack';
import { ContextPackCardComponent } from './contextpack-card.component';
import { ContextPackInfoComponent } from './contextpack-info.component';
import { ContextPackService } from '../context-pack.service';

describe('ContextPackInfoComponent', () => {
  let contextPackInfoComponent: ContextPackInfoComponent;
  let fixture: ComponentFixture<ContextPackInfoComponent>;
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule
      ],
      declarations: [ContextPackInfoComponent, ContextPackCardComponent],
      providers: [
        { provide: ContextPackService, useValue: new MockCPService() },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextPackInfoComponent);
    contextPackInfoComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(ContextPackInfoComponent).toBeTruthy();
  });



  it('should return null when it is given an improper ID', () => {
    activatedRoute.setParamMap({ id: 'badID' });

    expect(contextPackInfoComponent.id).toEqual('badID');
    expect(contextPackInfoComponent.contextPack).toBeNull();
  });

  it('should return the proper ID for index 1 when given a context pack', () => {
    const expectedPack: ContextPack = MockCPService.testCPs[1];

    activatedRoute.setParamMap({ id: expectedPack._id });

    expect(contextPackInfoComponent.id).toEqual(expectedPack._id);
    expect(contextPackInfoComponent.contextPack).toEqual(expectedPack);
  });
it('should return the ID for index 2 when given a context pack', () => {
    const expectedPack: ContextPack = MockCPService.testCPs[2];

    activatedRoute.setParamMap({ id: expectedPack._id });

    expect(contextPackInfoComponent.id).toEqual(expectedPack._id);
    expect(contextPackInfoComponent.contextPack).toEqual(expectedPack);
  });
  it('should return the ID for index 0 when given a context pack', () => {
    const expectedPack: ContextPack = MockCPService.testCPs[0];

    activatedRoute.setParamMap({ id: expectedPack._id });

    expect(contextPackInfoComponent.id).toEqual(expectedPack._id);
    expect(contextPackInfoComponent.contextPack).toEqual(expectedPack);
  });
});
