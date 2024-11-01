import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _activeTheme:string = "dark";
  public get activeTheme() {
    return this._activeTheme;
  }
  public set activeTheme(value) {
    
    let themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    if(themeLink)
    {
      themeLink.href = value +'.css';
    }
    
    this._activeTheme = value;
    console.log("themeLink",themeLink);

  }
  constructor() { }
}
