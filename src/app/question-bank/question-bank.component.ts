import { HttpClient } from '@angular/common/http'
import { Component, ViewChild } from '@angular/core'
import { ApiService } from '../services/api.service'
import { CommonService } from '../services/common.service'
// const Papa = require('papaparse');

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss']
})
export class QuestionBankComponent {
  public questionBankdropdowns: any
  public dropdownmodel: any
  public pdfSrc: any = null
  csvContent: any
  convertedArray: Array<any> = []
  properties: any = ''
  @ViewChild('questionBankForm') questionBankForm: any

  constructor (
    public commonService: CommonService,
    private apiService: ApiService,
    private http: HttpClient
  ) {
    this.questionBankdropdowns = this.commonService.questionBankjsonData.bank
  }

  onDropDownClick (event: any) {
    console.log('onDropDownClick', event.value.label)
  }

  onSubmit (event: any) {
    let payload: any = {}
    console.log('onSubmit(', event)

    Object.keys(this.questionBankForm.form.controls).forEach(key => {
      payload[key] = this.questionBankForm.form.controls[key].value.label
    })
    Object.keys(payload).forEach(key => {
      this.commonService.questionBankPayload[key] = payload[key]
    })
    console.log('obj(', this.commonService.questionBankPayload)

    this.commonService.loadCSV()
    // this.commonService.loadPdf();
    // this.apiService.fetchData();
  }

  loadPdf (): void {
    this.http
      .get('./assets/Control and Coordination.pdf', { responseType: 'blob' })
      .subscribe(blob => {
        const fileReader = new FileReader()
        fileReader.onload = () => {
          this.pdfSrc = fileReader.result as string
        }
        fileReader.readAsDataURL(blob) // Use readAsDataURL to get a base64 URL
      })
  }
}
