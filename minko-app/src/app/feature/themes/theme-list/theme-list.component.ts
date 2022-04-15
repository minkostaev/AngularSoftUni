import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, map, mergeMap, startWith, switchMap, tap } from 'rxjs/operators';
import { ITheme } from '../../../core/interfaces';
import { ThemeService } from '../../../core/theme.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit, AfterViewInit {

  themeList: ITheme[];

  searchControl = new FormControl('');

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      filter(searchTerm => searchTerm.length > 3),
      startWith(''),
      tap(searchTerm => (console.log('searchTerm', searchTerm))),
      switchMap(searchTerm => this.themeService.loadThemeList(searchTerm))
    )
      .subscribe(themeList => {
        this.themeList = themeList;
      });
  }

  ngAfterViewInit(): void {
    
  }

}
