import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphConfigMenuComponent } from './graph-config-menu.component';

describe('GraphConfigMenuComponent', () => {
  let component: GraphConfigMenuComponent;
  let fixture: ComponentFixture<GraphConfigMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphConfigMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphConfigMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
