import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlipcardPage } from './flipcard.page';

describe('FlipcardPage', () => {
  let component: FlipcardPage;
  let fixture: ComponentFixture<FlipcardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipcardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
