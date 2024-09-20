import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  fetchData()
  {
    const url = 'https://storage.googleapis.com/cbse_solutions/data/CBSE/10/Biology';
    this.http.get(url).subscribe((res)=>{
      console.log("res",res);
    })
  }
}
