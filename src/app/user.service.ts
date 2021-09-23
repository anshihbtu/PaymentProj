import { Injectable } from '@angular/core';
import { Cust } from './cust';
import { Transaction } from './transaction';
import { Bank } from './bank';
import { HttpClient, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class UserService {


  url1 = "http://localhost:8282/customer"
  url2 = "http://localhost:8282/receiver"
  url3 = "http://localhost:8282/transaction"

  constructor(private http: HttpClient) { }
  b: any
  getCustById(customerId: string): Observable<Cust> {
    return this.http.get<Cust>(this.url1 + "/" + customerId).pipe(
      tap(cust => console.log(cust.name + " " + cust.balance + " " + cust.overdraft))

    ).pipe(
      tap(status => {
        console.log("status: " + status)

      }),
    );

  }



  /**confirmEmail(customerId : string):Observable<String> {
    return this.http.get(this.url1+"/"+customerId)
      .pipe(map(data => {
        return data.httpStatusCode
          }));
      
  }**/


  getRecById(bic: string): Observable<Bank> {
    return this.http.get<Bank>(this.url2 + "/" + bic).pipe(
      tap(bank => console.log(bank.name))

    );
  }


  createTransaction(transaction: Transaction): Observable<number> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Transaction>(this.url3, transaction, {
      headers: httpHeaders,
      observe: 'response'
    }).pipe(
      map(res => res.status)
    );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

}
