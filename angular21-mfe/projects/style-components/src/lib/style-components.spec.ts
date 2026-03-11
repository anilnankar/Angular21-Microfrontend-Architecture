import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleComponents } from './style-components';

describe('StyleComponents', () => {
  let component: StyleComponents;
  let fixture: ComponentFixture<StyleComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StyleComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(StyleComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
