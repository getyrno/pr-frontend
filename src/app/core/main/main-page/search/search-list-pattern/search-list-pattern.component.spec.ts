import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListPatternComponent } from './search-list-pattern.component';

describe('SearchListPatternComponent', () => {
  let component: SearchListPatternComponent;
  let fixture: ComponentFixture<SearchListPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchListPatternComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchListPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
