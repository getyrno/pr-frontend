import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListPatternComponent } from './chat-list-pattern.component';

describe('ChatListPatternComponent', () => {
  let component: ChatListPatternComponent;
  let fixture: ComponentFixture<ChatListPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatListPatternComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatListPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
