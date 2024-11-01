import { Component, OnInit } from '@angular/core';
import { DEFAULT_NAMES } from '../utils/constants';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  public defNames = DEFAULT_NAMES;

  constructor() {}
}
