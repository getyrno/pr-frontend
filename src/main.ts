import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment.prod';
import { AppComponent } from './app/app.component';
import { TuiInputModule, TuiInputPasswordModule, TuiCheckboxLabeledModule, TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DomSanitizer, BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { TUI_ICONS_PATH, tuiIconsPathFactory, TUI_SANITIZER, TuiRootModule, TuiLinkModule, TuiButtonModule, TuiDialogModule, TuiAlertModule } from '@taiga-ui/core';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
          BrowserModule,
          AppRoutingModule,
          ReactiveFormsModule,
          TuiRootModule,
          TuiInputModule,
          TuiInputPasswordModule,
          TuiCheckboxLabeledModule,
          TuiLinkModule,
          TuiButtonModule,
          TuiFieldErrorPipeModule,
          TuiDialogModule,
          TuiAlertModule),
        {
            provide: TUI_ICONS_PATH,
            useValue: tuiIconsPathFactory('assets/taiga-ui/icons/'),
        },
        {
            provide: TUI_SANITIZER,
            useValue: DomSanitizer
        },
        provideAnimations(),
    ]
})
  .catch((err: any) => console.error(err));
