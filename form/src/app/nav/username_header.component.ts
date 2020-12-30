import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: "username-header",
  templateUrl: './username.component.html',
  styleUrls: ['username.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class UsernameHeaderComponent implements OnInit {
  userName: string = "Trwa ładowanie użytkownika";
  public isLogged = false;


  constructor( private router: Router, private cdr: ChangeDetectorRef,) {
  }

  private changeName(name: string): void {
    this.userName = name;
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    if (localStorage.getItem("username") == null) {

    }
    else {
      this.changeName(localStorage.getItem("username"));
    }

  }

  changeCompany(value: any) {
    localStorage.setItem("selectedCompany", value);
    this.router.navigate(["/main"]);
  }
}
