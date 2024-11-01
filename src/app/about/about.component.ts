import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit{
constructor(public commonService:CommonService)
{

}
ngOnInit(): void {
  this.commonService.aboutTextContent = '';
  this.commonService.loadAboutContent();

}



}
