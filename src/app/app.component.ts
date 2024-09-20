import { ThemeService } from './services/theme.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'prepquik';
  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {}
}
