import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { CommonService } from '../services/common.service'
import { ThemeService } from '../services/theme.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('menuBar') menuBar: any
  public menuitems: any = []
  public sortedbank: any = []
  public selectedTheme = 'dark'
  public isDarkTheme = true
  constructor (
    private commonService: CommonService,
    private router: Router,
    public themeService: ThemeService
  ) {
    this.commonService.fetchMenuItemFromJson()
  }

  ngOnInit (): void {
    this.themeService.activeTheme = this.selectedTheme
    this.menuitems = this.commonService.menuItemJsonData.menuItems
    this.addCommand(this.menuitems)
  }

  addCommand (menuitems: any) {
    menuitems.forEach((element: any) => {
      if (element.items?.length) {
        this.addCommand(element.items)
      } else {
        element.command = this.command.bind(this)
      }
    })
  }

  command (event: any) {
    console.log('test', event)
    if (event.item.meta === 'Home') {
      this.router.navigateByUrl('/home')
    } else if (event.item.meta === 'Class') {
      this.commonService.questionAndAnswersArray = []
      this.commonService.questionBankPayload['Board'] = event.item.board
      this.commonService.questionBankPayload['Class'] = event.item.label
      this.router.navigateByUrl('/bank')
    } else if (event.item.meta === 'About') {
      this.router.navigateByUrl('/about')
    }
  }

  onThemeChange (theme: string) {
    console.log('theme', theme)
    this.selectedTheme = theme
    this.themeService.activeTheme = theme
    console.log('this.themeService.activeTheme', this.themeService.activeTheme)
  }
}
