import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { TranslateService } from "@ngx-translate/core";
import { NavigationEnd, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";



import { environment } from "../../environments/environment";


@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.component.css'],


})
export class NavbarComponent implements OnInit {

  settingsMenuOn = false;


  constructor( public router: Router, private http: HttpClient,
    private cdr: ChangeDetectorRef, ) {
    router.events.subscribe(value => {

    });
  }

  public model: any;
  public isSearchActive: boolean = false;
  public isCollapsed = true;
  public isLogged = false;
  public registrationInProgress = false;
  public main = false;

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }


  ngOnInit() {
    if (localStorage.getItem('auth_token') === undefined || localStorage.getItem('auth_token') === null) {
      this.main = false
    } else {
      this.isLogged = true;
    }
  }

  blur() {
    this.isSearchActive = false;
  }

  focus() {
  }

  changeSearchState() {
    this.isSearchActive = !this.isSearchActive;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term)))


  formatter = (result: any) => {
    return result.generalNumber;
  };

  searchEntries(term) {
    return this.http
      .get<any>(environment.API_URL + "/api/search/test?query=" + term).pipe(
        map(res => {

          return res.slice(0, 10);

        }
        ))
      ;
  }

  onSelect($event, input) {
  }
}

