import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/budget';
  private budgetData: any[] = [];

  constructor(private http: HttpClient) { }

  getBudgetData(): Observable<any> {
    if (this.isBudgetDataEmpty()) {
      return this.http.get('http://localhost:3000/budget').pipe(
        tap((data: any) => {
          this.setBudgetData(data);
        })
      );
    } else {
      // If data is already present, return it without making a new HTTP request
      return of(this.budgetData);
    }
  }

  setBudgetData(data: any[]): void {
    this.budgetData = data;
  }

  getStoredBudgetData(): any[] {
    return this.budgetData;
  }

  isBudgetDataEmpty(): boolean {
    return this.budgetData.length === 0;
  }

  getBudget(): Observable<any> {
    return this.http.get('http://localhost:3000/budget');
  }
}
