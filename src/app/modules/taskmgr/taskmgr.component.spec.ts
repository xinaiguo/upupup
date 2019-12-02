import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmgrComponent } from './taskmgr.component';

describe('TaskmgrComponent', () => {
  let component: TaskmgrComponent;
  let fixture: ComponentFixture<TaskmgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
