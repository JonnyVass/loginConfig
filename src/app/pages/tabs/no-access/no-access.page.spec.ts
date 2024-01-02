import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoAccessPage } from './no-access.page';

describe('NoAccessPage', () => {
  let component: NoAccessPage;
  let fixture: ComponentFixture<NoAccessPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NoAccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
