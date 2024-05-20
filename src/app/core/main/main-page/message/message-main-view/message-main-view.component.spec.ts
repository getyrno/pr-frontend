import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageMainViewComponent } from './message-main-view.component';

describe('MessageMainViewComponent', () => {
  let component: MessageMainViewComponent;
  let fixture: ComponentFixture<MessageMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageMainViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
