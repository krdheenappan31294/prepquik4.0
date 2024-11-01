import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import * as jsonData from 'src/assets/jsonData/menuItem.json';
import * as questionBankJson from 'src/assets/jsonData/questionBank.json';
import * as Papa from 'papaparse';
import { HttpClient } from '@angular/common/http';
import * as mammoth from 'mammoth';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public menuItemJsonData: any;
  public questionBankjsonData: any;
  public questionAndAnswersArray: any = [];
  public questionBankPayload: any = {};
  public textContent: any = '';
  public aboutTextContent: any = '';
  public pdfSrc: any = null;
  public questionBankdropdowns: any;
  constructor(private http: HttpClient, private apiService: ApiService) { }


  /**
 * to fetch the json data from assests / from DB
 */
  fetchMenuItemFromJson() {
    this.menuItemJsonData = jsonData;
    this.questionBankjsonData = questionBankJson;
  }

  /**
 * get the  JSON data from DB for Long Answers,Short Answers,Multiple Choice options
 * @param url - URL to fetch the response
 */
  loadCSV(url: any) {
    this.questionAndAnswersArray = [];
    this.http
      .get(`http://127.0.0.1:8080/get_file/${url}`)
      .subscribe((data: any) => {
        this.questionAndAnswersArray = JSON.parse(data);
      });
  }

  /**
* get the  PDF data  on PDF is selected
* @param url - URL to fetch the response
*/
  loadPdf(url: any): void {
    this.http
      .get(`http://127.0.0.1:8080/get_pdf/${url}`, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        const fileURL = URL.createObjectURL(response);
        // Open the PDF in a new browser tab
        window.open(fileURL);
      });
  }

  /**
* convert the CSV file into JSON
* @param csvData - CSV Data
*/
  private csvToJson(csvData: string): any[] {
    let jsonResult: any[] = [];
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (result: any) => {
        jsonResult = result.data;
      },
    });
    return jsonResult;
  }

  /**
*fetches the resonse for Summary 
* @param url - URL to fetch the response
*/
  loadText(url: any) {
    this.http
      .get(`http://127.0.0.1:8080/get_file/${url}`)
      .subscribe((response) => {
        this.textContent = response;
      });
  }

  loadAboutContent() {
    this.aboutTextContent = '';
    const url = '/assets/About PrepQuik.docx';
    this.http.get(url, { responseType: 'text' }).subscribe((response: any) => {
      this.loadDocxFile(response);
    });
  }

  loadDocxFile(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const arrayBuffer = event.target.result;
      // Convert .docx to HTML
      mammoth
        .convertToHtml({ arrayBuffer: arrayBuffer })
        .then((result) => {
          this.aboutTextContent = result.value;
        })
        .catch((error) => console.log(error));
    };
    reader.readAsArrayBuffer(file);
  }

  getItemsOfSelectedOption(data: any) {
    return data?.boards
      ?.find((board: any) => board.label == this.questionBankPayload.board)
      .classes?.find(
        (board: any) => board.label == this.questionBankPayload.class
      );
  }

  /**
 * frames the options for the subject,chapter,question type
 * @param data - json data.
 */
  frameDropdownitems(data: any) {
    this.questionBankdropdowns = [];
    const payload = this.questionBankPayload;
    if (data) {
      const boardData = data.boards.find(
        (board: any) => board.label === payload.board
      );
      const classData = boardData.classes.find(
        (cls: any) => cls.label === payload.class
      );
      const subjectData = classData.subjects.find(
        (subj: any) => subj.label === payload.subject
      );
      const chapterData = subjectData.chapters.find(
        (chapterData: any) => chapterData.label === payload.chapter
      );
      const subjectListData = {
        label: 'Subject',
        id: 'subject',
        items: this.updateDefaultDropdownValue(
          classData.subjects.map((subject: any) => {
            return { label: subject.label };
          }),
          payload.subject
        ),
      };
      this.questionBankdropdowns.push(subjectListData);
      const chapterListData = {
        label: 'Chapter',
        id: 'chapter',
        items: this.updateDefaultDropdownValue(
          subjectData.chapters.map((chapter: any) => {
            return { label: chapter.label };
          }),
          payload.chapter
        ),
      };
      this.questionBankdropdowns.push(chapterListData);
      const questionTypeListData = {
        label: 'Question Type',
        id: 'questionType',
        items: this.updateDefaultDropdownValue(
          chapterData.questionTypes.map((questionType: any) => {
            return { label: questionType.label };
          }),
          payload.questionType
        ),
      };
      this.questionBankdropdowns.push(questionTypeListData);
    }
  }

  updateDefaultDropdownValue(listData: any, item: any) {
    const index = listData.findIndex((subject: any) => subject.label === item);
    if (index > -1) {
      const prop = listData.splice(index, 1)[0];
      listData.unshift(prop);
    }
    return listData;
  }
}
