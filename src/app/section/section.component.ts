import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  constructor(private route: Router) {

  }
  ngOnInit(): void {
    this.addBackgroundimage();
  }

  addBackgroundimage() {
    // document.getElementById('container')?.style.image
  }

  onClick(event: string) {
    if (event === "Chapter") {
      this.route.navigateByUrl('/bank')
    }
    if (event === "pdf") {

    }
    console.log("onclick", event)
  }
}
