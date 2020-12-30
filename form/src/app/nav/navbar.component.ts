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
    $event.preventDefault();
    switch ($event.item) {
      case "Dodaj nową fakturę VAT":

        this.router.navigate(['/invoices/new']);
        break;

      case "Dodaj nową fakturę Proforma":

        this.router.navigate(['createProformaInvoice']);
        break;

      case "Zobacz wszystkie faktury":
        this.router.navigate(['/invoices']);
        this.model = '';
        break;

      case "Raporty":
        this.router.navigate(['/raporty']);
        this.model = '';
        break;

      case "Historia - raporty":
        this.router.navigate(['/hreports']);
        this.model = '';
        break;

      case "Historia - wszystkie faktury":
        this.router.navigate(['/history']);
        this.model = '';
        break;

      case "Dodaj nowego klienta":
        this.router.navigate(['/clients/new']);
        this.model = '';
        break;

      case "Ustawienia użytkownika":
        this.router.navigate(['/user/create']);
        this.model = '';
        break;

      case "Dane firmy":
        this.router.navigate(['/settings']);
        this.settingsMenuOn = true;
        this.model = '';
        break;

      case "Dodaj nowy produkt":
        this.router.navigate(['/item/new']);
        this.model = '';
        break;


      default:
    }
    this.model = '';
  }
}

const states = ['Dodaj nową fakturę VAT', 'Dodaj nową fakturę Proforma', "Zobacz wszystkie faktury", "Raporty", "Historia - raporty", "Historia - wszystkie faktury", "Dodaj nowego klienta", "Ustawienia użytkownika", "Dane firmy", "Dodaj nowy produkt"];
