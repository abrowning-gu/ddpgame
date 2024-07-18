import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilegamePage } from './tilegame.page';

describe('TilegamePage', () => {
  let component: TilegamePage;
  let fixture: ComponentFixture<TilegamePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TilegamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
