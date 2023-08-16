import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlaComponent } from './bla.component';

describe('BlaComponent', () => {
  let component: BlaComponent;
  let fixture: ComponentFixture<BlaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlaComponent],
    });
    fixture = TestBed.createComponent(BlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
