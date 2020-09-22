import { UtilService } from './../../shared/services/util.service';
import { Measure } from './../../models/measure';
import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { delay, tap, catchError } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../../app/core';

@Injectable({
  providedIn: 'root'
})
export class MeasureService {

  // Measure Grid
  public measureListFetched$ = new Subject<boolean>();
  // Subject to know when new measure is added
  public newMeasureSubmitted$ = new Subject<boolean>();
  // public pointGridQuickFilterChanged$ = new Subject<string>();

  public measures: Array<Measure> = new Array<Measure>();

  constructor(
    private http: HttpClient,
    private logger: NGXLogger,
    private utilService: UtilService
  ) { }

  // fetch measures
  fetchMeasures$(): Observable<Array<Measure>> {

    // Clearing the cachced data
    this.measures = null;

    // Fetch data from API
    return this.http.get<Array<Measure>>(
      Config.Measures
    ).pipe(
      // TODO: Remove delay after using actual API
      delay(1000),
      tap(
        next => {
          // TODO: add http response model to Check the response error
          // if (next.status.returnCode !== 1) {
          //   return;
          // }

          // Save the result in cache
          // TODO: check if this is requried
          this.setMeasureData(next);
          this.measureListFetched$.next(true);
        },
        catchError(this.utilService.handleError<Array<Measure>>('fetchMeasures$', []))
      ),
    );
  }

  // setMeasureData
  setMeasureData(measureArray: Array<Measure>): void {
    this.measures = [];
    measureArray.forEach(
      (item) => {
        this.measures.push(item);
      },
    );
  }

  // createMeasure$
  createMeasure$(reqData: Measure): Observable<Measure> {
    // Fetch data from API
    return this.http.post<Measure>(Config.Measures, reqData)
      .pipe(
        tap(
          (next: Measure) => {
            // Check the response error
            if (next) {
              this.measures.push(next);
            }
          },
        ),
        catchError(
          this.handleError<Measure>(`createMeasure`, null)
        )
      );
  }

  // patchConfiguration$
  // patchConfiguration$(id: number, reqData: ConfigurationCreateModel): Observable<HttpResponseModel<Configuration>> {

  //   this.logger.debug('configuration-create-view - fetchConfigProgram$ - id - reqData', id,reqData);

  //   // Fetch data from API
  //   //return of(fakeConfigurationCreateResultModel)
  //   return this.http.put<HttpResponseModel<Configuration>>(Config.Configurations + '/' + id, reqData)
  //     .pipe(
  //       tap(
  //         next => {
  //           // Check the response error
  //           if (next.status.returnCode !== 1) {
  //             return;
  //           }
  //           // Save the result in cache
  //           this.cachedConfigCreateResultModel = next.result;
  //         },
  //       ),
  //     );
  // }


  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: better job of transforming error for user consumption
      // this.logger.debug(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
