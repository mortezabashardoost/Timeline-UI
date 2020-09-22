import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

// PrimeNG
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { TimelineHeaderComponent } from './shared/components/timeline-header/timeline-header.component';
import { TimelineSpinnerComponent } from './shared/components/timeline-spinner/timeline-spinner.component';
import { TimelineFooterComponent } from './shared/components/timeline-footer/timeline-footer.component';
import { TimelineToastComponent } from './shared/components/timeline-toast/timeline-toast.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'measure',
        loadChildren: () => import('./features/measure/measure.module').then(mod => mod.MeasureModule),
      },
      {
        path: '',
        redirectTo: '', // `${DashboardURL.DASHBOARD}/${DashboardURL.LIST}`,
        pathMatch: 'full',
      }
    ]
  },
  // {
  //     path: '404',
  //     component: PageNotFoundComponent,
  // },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TimelineHeaderComponent,
    TimelineSpinnerComponent,
    TimelineFooterComponent,
    TimelineToastComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      useDefaultLang: true,
      defaultLanguage: environment.defaultLanguage
    }),
    LoggerModule.forRoot({
      serverLoggingUrl: environment.logger.apiUrl,
      level: environment.logger.logLevel,
      serverLogLevel: environment.logger.serverLogLevel,
      disableConsoleLogging: false,
    }),
    // PrimeNG
    MenubarModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
// tslint:disable-next-line:typedef
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
