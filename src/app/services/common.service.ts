import { Injectable } from '@angular/core';
import * as jsonData from 'src/assets/menuItem.json'
import * as questionBankJson from 'src/assets/questionBank.json'
import * as Papa from 'papaparse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public menuItemJsonData:any;
  public questionBankjsonData:any;
  public questionAndAnswersArray:any =[];
  public questionBankPayload:any = {}
  public pdfSrc: any = null;

  constructor(private http: HttpClient,) { }
  

  fetchMenuItemFromJson(){
    this.menuItemJsonData = jsonData;
    this.questionBankjsonData = questionBankJson;
  }

  loadCSV()
  {
  this.questionAndAnswersArray =[];

    this.http.get('./assets/CBSE_6_English_A House, A Home_long_question_answers.csv', { responseType: 'text' })
    .subscribe(
      data => {
        console.log(" this.csvToJson(data)", this.csvToJson(data))
        this.questionAndAnswersArray = this.csvToJson(data)

      }
    );
  }

  // loadPdf()
  // {

  //   this.http.get('./assets/Control and Coordination.pdf', { responseType: 'blob' })
  //   .subscribe(
  //     (blob) => {
  //       const fileReader = new FileReader();
  //       fileReader.onload = () => {
  //         this.pdfSrc = fileReader.result; // Store the PDF source
  //       };
  //       fileReader.readAsArrayBuffer(blob);
  //     }
  //   );
  // }

  loadPdf(): void {
    this.http.get('./assets/Control and Coordination.pdf', { responseType: 'blob' })
    .subscribe(
      (blob) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.pdfSrc = fileReader.result as string;
        };
        fileReader.readAsDataURL(blob); // Use readAsDataURL to get a base64 URL
      }
    );
  }

  private csvToJson(csvData: string): any[] {
    let jsonResult: any[] = [];
    Papa.parse(csvData, {
      header: true, 
      skipEmptyLines: true,
      complete: (result:any) => {
        jsonResult = result.data;
      }
    });
    return jsonResult;
  }
}
