import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBottomPanelComponent } from './message-bottom-panel.component';

describe('MessageBottomPanelComponent', () => {
  let component: MessageBottomPanelComponent;
  let fixture: ComponentFixture<MessageBottomPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageBottomPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageBottomPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
