import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss'],
})
export class QuestionBankComponent implements OnInit {
  public dropdownmodel: any;
  public pdfSrc: any = null;
  csvContent: any;
  convertedArray: Array<any> = [];
  properties: any = '';
  @ViewChild('questionBankForm') questionBankForm: any;

  constructor(public commonService: CommonService, private router: Router) {}

  ngOnInit(): void {
    if (!Object.keys(this.commonService.questionBankPayload).length) {
      window.onbeforeunload = () => {
        // this.commonService.questionBankPayload['board']  = "CBSE";
        // this.commonService.questionBankPayload['class']  = "6";
        this.router.navigateByUrl('/home', { replaceUrl: true });
      };
    } else {
      this.commonService.frameDropdownitems(
        this.commonService.questionBankjsonData.banks
      );
    }
  }

  /**
   * when the dropdown Subject/Chapter/Question type this event is triggered
   * @param event - dropdown event
   * @param dropdown - respective dropdown values
   */
  onDropDownClick(event: any, dropdown: any) {
    this.updateQuestionBankPayload(dropdown.id, event.value.label);
    this.commonService.frameDropdownitems(
      this.commonService.questionBankjsonData.banks
    );
  }

  /**
   * updates the payload to get the data based on the options selected
   * subject updates the subject prop in payload and then re-initate the chapter the question type dropdown options
   * but on selecting chapter the subject and the question stays as it is
   * @param id - dropdown id (like -subject/chapter/questionType)
   * @param label - the value selected from the respective dropdown
   */
  updateQuestionBankPayload(id: any, label: any) {
    const data = this.commonService.getItemsOfSelectedOption(
      this.commonService.questionBankjsonData.banks
    );

    if (id === 'subject') {
      const subject = data.subjects.find((sub: any) => sub.label === label);
      this.commonService.questionBankPayload['subject'] = label;
      this.commonService.questionBankPayload['chapter'] =
        subject.chapters[0].label;
      this.commonService.questionBankPayload['questionType'] =
        subject.chapters[0].questionTypes[0].label;
    } else {
      this.commonService.questionBankPayload[id] = label;
    }
    // if (id === 'chapter') {
    //   const subject = data.subjects.find((sub: any) => sub.label === this.commonService.questionBankPayload['subject']);
    //   const chapter = data.subjects.find((sub: any) => sub.label === label);
    //   this.commonService.questionBankPayload['chapter'] = label;
    //   this.commonService.questionBankPayload['questionType'] = chapter.questionTypes[0].label;
    // }
  }

  /**
   * on Submit the API call happens and the respective value is displayed in the right side of the UI
   * @param event - event is not utilized
   */
  onSubmit(event: any) {
    this.commonService.questionAndAnswersArray = [];
    this.commonService.textContent = '';
    this.commonService.pdfSrc = null;
    const paylaod = this.commonService.questionBankPayload;
    if (paylaod['questionType'] === 'Long Answers') {
      const url = `${paylaod.board}_${paylaod.class}_${paylaod.chapter.replace(
        / /g,
        '_'
      )}_Long Answers`;
      this.commonService.loadCSV(url);
    }
    if (paylaod['questionType'] === 'Short Answers') {
      const url = `${paylaod.board}_${paylaod.class}_${paylaod.chapter.replace(
        / /g,
        '_'
      )}_Short Answers`;
      this.commonService.loadCSV(url);
    }
    if (paylaod['questionType'] === 'Multiple Choice') {
      const url = `${paylaod.board}_${paylaod.class}_${paylaod.chapter.replace(
        / /g,
        '_'
      )}_Multiple Choice`;
      this.commonService.loadCSV(url);
    }
    if (paylaod['questionType'] === 'Summary') {
      const url = `${paylaod.board}_${paylaod.class}_${paylaod.chapter.replace(
        / /g,
        '_'
      )}_Summary`;
      this.commonService.loadText(url);
    }
  }

  /**
   * to open question bank content in PDF format in a new window tab
   */
  OpenPdf() {
    const paylaod = this.commonService.questionBankPayload;
    const getURL = `${paylaod.board}/${paylaod.class}/${paylaod.subject}/${paylaod.chapter}${paylaod.chapter}.pdf`;
    this.commonService.loadPdf(getURL);
  }
}
