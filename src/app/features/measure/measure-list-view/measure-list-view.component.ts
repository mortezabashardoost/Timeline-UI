import { Measure } from './../../../models/measure';
import { MeasureService } from './../measure.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table/table';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-measure-list-view',
  templateUrl: './measure-list-view.component.html',
  styleUrls: ['./measure-list-view.component.scss']
})
export class MeasureListViewComponent implements OnInit, OnDestroy {

  // Subscription
  private readonly subscription = new Subscription();

  // Variables
  measureList: Array<Measure>;
  selectedMeasures: Array<Measure>;
  measure: Measure;
  measureDialog: boolean;
  submitted: boolean;
  listLoading = true;
  saveBtnLoading = false;


  @ViewChild('dt') table: Table;

  constructor(
    public measureService: MeasureService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  // ngOnInit
  ngOnInit(): void {
    // Fetch data
    this.fetchData();
    // Init Listener
    this.initListener();
  }

  // ngOnDestroy
  ngOnDestroy(): void {
    // Unsubscribe subscription
    this.subscription.unsubscribe();
  }

  // fetchData
  fetchData(): void {
    this.subscription.add(
      this.measureService.fetchMeasures$().subscribe(
        (next: Array<Measure>) => {
          // Perserve the data to variable
          this.measureList = this.measureService.measures;
          this.listLoading = false;

          // setTimeout(() => {
          //   this.measureService.measureListFetched$.next(true);
          // }, 0);
        },
      ),
    );
  }

  // initListener
  initListener(): void {

    this.subscription.add(
      this.measureService.newMeasureSubmitted$.subscribe(
        () => {
          this.measureService.createMeasure$(this.measure)
            .subscribe(
              (result: any) => {
                if (result) {
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Measure Created', life: 3000 });
                } else {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Something went wrong while creating new measure.',
                    life: 3000
                  });
                }
                // Turn off button spinner
                this.saveBtnLoading = false;
                // Refresh List
                this.measureList = this.measureService.measures;
                this.listLoading = false;
              },
            );
        },
      )
    );
  }

  openNew(): void {
    this.measure = {
      deleted: true
    };
    this.submitted = false;
    this.measureDialog = true;
  }

  hideDialog(): void {
    this.measureDialog = false;
    this.submitted = false;
  }

  message(): void {
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
  }

  saveMeasure(): void {
    this.submitted = true;

    if (this.measure.name?.trim()) {
      this.saveBtnLoading = true;
      this.measure.deleted = false;
      this.measureService.newMeasureSubmitted$.next(true);

      this.measureList = [...this.measureList];
      this.measureDialog = false;
      this.measure = { deleted: true };
    }
  }

}
