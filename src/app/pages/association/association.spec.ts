import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Association } from './association';

describe('Association', () => {
  let component: Association;
  let fixture: ComponentFixture<Association>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Association]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Association);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
