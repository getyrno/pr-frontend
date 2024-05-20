import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTopPanelComponent } from './message-top-panel.component';

describe('MessageTopPanelComponent', () => {
  let component: MessageTopPanelComponent;
  let fixture: ComponentFixture<MessageTopPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageTopPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageTopPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
