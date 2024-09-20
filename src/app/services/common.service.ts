import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import * as jsonData from 'src/assets/menuItem.json'
import * as questionBankJson from 'src/assets/questionBank.json'
import * as Papa from 'papaparse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public menuItemJsonData: any;
  public questionBankjsonData: any;
  public questionAndAnswersArray: any = [];
  public questionBankPayload: any = {}
  public textContent: any = ''
  public pdfSrc: any = null;

  constructor(private http: HttpClient, private apiService: ApiService) { }


  fetchMenuItemFromJson() {
    this.menuItemJsonData = jsonData;
    this.questionBankjsonData = questionBankJson;
  }

  loadCSV() {
    this.questionAndAnswersArray = [];
    //   this.apiService.fetchCSVData.subscribe(
    //   (data:any) => {
    //     console.log(" this.csvToJson(data)", this.csvToJson(data))
    //     this.questionAndAnswersArray = this.csvToJson(data)
    //   }
    // );
    this.http
      .get(
        './assets/CBSE_6_English_A House, A Home_long_question_answers.csv',
        { responseType: 'text' }
      ).subscribe(
        (data: any) => {
          console.log(" this.csvToJson(data)", this.csvToJson(data))
          this.questionAndAnswersArray = this.csvToJson(data)
        }
      );
  }

  
  loadPdf(): void {
    const pdfUrl = 'https://assets/test.pdf';
    const url = 'assets/test.pdf'

    // this.pdfSrc = 'assets/test.pdf'
    this.http.get(url, { responseType: 'blob' }).subscribe((response: Blob) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.pdfSrc = fileReader.result;
      };
      fileReader.readAsArrayBuffer(response);
    });
  }

  private csvToJson(csvData: string): any[] {
    let jsonResult: any[] = [];
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (result: any) => {
        jsonResult = result.data;
      }
    });
    return jsonResult;
  }

  loadText() {
    this.textContent = '';
    const url = 'https://storage.googleapis.com/cbse_solutions/data/CBSE/10/Biology/Control%20and%20Coordination/CBSE_10_Biology_Control%20and%20Coordination_chapter_summary.txt'
    const url1 = 'https://storage.cloud.google.com/cbse_solutions/data/CBSE/10/Biology/Control%20and%20Coordination/CBSE_10_Biology_Control%20and%20Coordination_chapter_summary.txt'
    const url3 = 'assets/data_CBSE_10_Biology_Control and Coordination_CBSE_10_Biology_Control and Coordination_chapter_summary.txt'
    this.http.get(url3, { responseType: 'text' }).subscribe((response) => {
      console.log("Res", response);
      this.textContent = response;
    });
  }
}
