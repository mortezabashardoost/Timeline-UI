import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

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
        // {
        //     path: 'dashboard',
        //     loadChildren: () => import('@flexvm/dashboard/dashboard.module').then(mod => mod.DashboardModule),
        // },
        {
            path: '',
            redirectTo: '', //`${DashboardURL.DASHBOARD}/${DashboardURL.LIST}`,
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
