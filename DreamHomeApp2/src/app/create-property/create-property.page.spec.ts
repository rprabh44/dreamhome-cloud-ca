import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePropertyPage } from './create-property.page';

describe('CreatePropertyPage', () => {
  let component: CreatePropertyPage;
  let fixture: ComponentFixture<CreatePropertyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePropertyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
