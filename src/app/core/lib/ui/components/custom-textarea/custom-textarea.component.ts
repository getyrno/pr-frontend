import { AfterViewInit, Component, ElementRef, Input, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-textarea',
  standalone: true,
  templateUrl: './custom-textarea.component.html',
  styleUrls: ['./custom-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomTextareaComponent),
      multi: true
    }
  ]
})
export class CustomTextareaComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('textarea') textarea!: ElementRef;

  @Input() minHeight: string = '';
  @Input() maxHeight: string = '24px';
  @Input() border: string = 'none';
  @Input() backgroundColor: string = '#f0f0f0';
  @Input() textColor: string = '#333';
  @Input() fontFamily: string = 'Arial, sans-serif';
  @Input() fontSize: string = '14px';
  @Input() placeholder: string = '';

  value: string = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.textarea) {
      this.textarea.nativeElement.focus();
    }
  }

  writeValue(value: string): void {
    this.value = value;
    if (this.textarea) {
      this.textarea.nativeElement.value = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
    this.updateTextareaHeight();
  }

  onBlur(): void {
    this.onTouched();
  }

  onFocus(): void {
  }

  updateTextareaHeight(): void {
    const textareaEl = this.textarea.nativeElement;
    textareaEl.style.height = '0'; // Сбрасываем высоту перед измерением
    textareaEl.style.height = `${textareaEl.scrollHeight}px`; // Устанавливаем новую высоту
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const submitEvent = new CustomEvent('submit', { bubbles: true, cancelable: true });
      this.textarea.nativeElement.dispatchEvent(submitEvent);
    }
  }
}
