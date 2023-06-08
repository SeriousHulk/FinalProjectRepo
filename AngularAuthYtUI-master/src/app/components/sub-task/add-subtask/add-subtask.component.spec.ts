import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubTaskComponent } from './add-subtask.component';

describe('AddSubtaskComponent', () => {
  let component: AddSubTaskComponent;
  let fixture: ComponentFixture<AddSubTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
