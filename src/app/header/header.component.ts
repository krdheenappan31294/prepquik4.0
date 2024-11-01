import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { ThemeService } from '../services/theme.service';
import { DEFAULT_NAMES, DEFAULT_URL } from '../utils/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('menuBar') menuBar: any;
  public menuitems: any = [];
  public sortedbank: any = [];
  public selectedTheme = 'dark';
  public isDarkTheme = true;
  public defNames = DEFAULT_NAMES;
  public defUrls = DEFAULT_URL;
  constructor(
    private commonService: CommonService,
    private router: Router,
    public themeService: ThemeService
  ) {
    this.commonService.fetchMenuItemFromJson();
  }

  /**
   * set the theme and get the json data through DI and convert it into dropdown readable format
   * and bind the action methods
   */
  ngOnInit(): void {
    this.themeService.activeTheme = this.selectedTheme;
    this.menuitems = this.commonService.menuItemJsonData.menuItems;
    const coursesMenu = this.menuitems.find(
      (menu: any) => menu.label === this.defNames.COURSES
    );
    coursesMenu.items = this.prepareCoursesList();
    this.addCommand(this.menuitems);
  }

  /**
   * Prepares the course list from the JSON into a dropdown readable format.
   */
  prepareCoursesList() {
    const data = this.commonService.questionBankjsonData.banks;
    const items: any = [];
    if (data.boards?.length)
      data.boards.forEach((board: any) => {
        if (board.classes?.length) {
          items.push({
            label: board.label,
            entity: 'course',
            items: board.classes.map((grade: any) => {
              return {
                label: grade.label,
                entity: 'class',
                board: board.label,
                class: grade.label,
              };
            }),
          });
        } else {
          items.push({ label: board.label });
        }
      });
    return items;
  }

  /**
   * Bind the action methods to the respective the items of the courses in the dropdown recursively
   * @param menuitems - Already formatted options prepareCoursesList() method
   * @returns The total price including tax.
   */
  addCommand(menuitems: any) {
    menuitems.forEach((element: any) => {
      if (element.items?.length) {
        this.addCommand(element.items);
      } else {
        element.command = this.command.bind(this);
      }
    });
  }

  /**
   * Routing is configured and if a class option is selected (6,7,8,9)
   * when class is selected default values has to displayed in the Subject, Chapter and Question Type
   * those values are configured
   * @param event - event triggered on clicking the nav bar items
   */
  command(event: any) {
    if (event.item.meta === 'Home') {
      this.router.navigateByUrl('/home');
    } else if (event.item.entity === 'class') {
      this.commonService.questionAndAnswersArray = [];
      this.commonService.questionBankPayload = [];
      this.commonService.questionBankPayload['board'] = event.item.board;
      this.commonService.questionBankPayload['class'] = event.item.label;
      const data = this.commonService.getItemsOfSelectedOption(
        this.commonService.questionBankjsonData.banks
      );
      this.commonService.questionBankPayload['subject'] =
        data.subjects[0].label;
      this.commonService.questionBankPayload['chapter'] =
        data.subjects[0].chapters[0].label;
      this.commonService.questionBankPayload['questionType'] =
        data.subjects[0].chapters[0].questionTypes[0].label;
      this.commonService.frameDropdownitems(
        this.commonService.questionBankjsonData.banks
      );
      this.router.navigateByUrl('/bank');
    } else if (event.item.meta === 'About') {
      this.router.navigateByUrl('/about');
    }
  }

  /**
   * event triggered to update the them change
   */
  onThemeChange(theme: string) {
    this.selectedTheme = theme;
    this.themeService.activeTheme = theme;
  }
}
