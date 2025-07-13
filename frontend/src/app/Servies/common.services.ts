import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonServices {
  private apiUrl = 'http://localhost:5000/api/sample';

  constructor(private http: HttpClient) { }

}
