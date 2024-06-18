import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductingDialogComponent } from './add-producting-dialog.component';

describe('AddProductingDialogComponent', () => {
  let component: AddProductingDialogComponent;
  let fixture: ComponentFixture<AddProductingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductingDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
