import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubtaskComponent } from './delete-subtask.component';

describe('DeleteSubtaskComponent', () => {
  let component: DeleteSubtaskComponent;
  let fixture: ComponentFixture<DeleteSubtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSubtaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
