import { MeasureURL } from './../../models/measure';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { MeasureListViewComponent } from '../measure/measure-list-view/measure-list-view.component';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: MeasureURL.LIST,
        component: MeasureListViewComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    MeasureListViewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    // Third party - ngx-translate
    TranslateModule.forChild(),
    // PrimeNG
    TableModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    ToolbarModule,
    ConfirmDialogModule
    // Shared
    // SharedModule,
  ],
  providers: [MessageService, ConfirmationService]
})
export class MeasureModule { }
