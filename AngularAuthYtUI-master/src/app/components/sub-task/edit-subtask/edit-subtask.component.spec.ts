import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubTaskComponent } from './edit-subtask.component';

describe('EditSubtaskComponent', () => {
  let component: UpdateSubTaskComponent;
  let fixture: ComponentFixture<UpdateSubTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSubTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSubTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
