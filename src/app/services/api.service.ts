import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor (private http: HttpClient) {}

  fetchData (){
    const url =
      'https://storage.googleapis.com/cbse_solutions/data/CBSE/10/Biology'
    this.http.get(url).subscribe(res => {
      console.log('res', res)
    })
  }

  fetchCSVData(){
   return this.http
      .get(
        './assets/CBSE_6_English_A House, A Home_long_question_answers.csv',
        { responseType: 'text' }
      )
  }
}
