import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from './Login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, OnInit, OnDestroy {
  title = 'monitoring-app';
  // tabs : string[] = ["API Results","Functional Results"]
  tabs: string[] = ["apiResults", "functionalResults"]
  currentTab: string = "";
  isApiTabSelected: boolean = true;
  isUserAuthenticated: boolean = false;
  userAuthSubscription: Subscription;

  constructor(private loginService: LoginService, private router: Router) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`Changed tab to ${this.currentTab}`)
  }

  ngOnInit(): void {
    this.userAuthSubscription = this.loginService.isUserLoggedIn.subscribe((isloginSucessful) => {
      console.log('Inside subscription for authentication in App component')
      this.isUserAuthenticated = isloginSucessful;
      if (isloginSucessful) {
        console.log(isloginSucessful);
        console.log('Authentication successful');
        this.router.navigate(['/functionalResults']);
      }
    })
    this.isUserAuthenticated = true;
  }

  selectedTab(event: Event, tabName: string) {
    console.log(tabName);
    this.currentTab = tabName;
    if (tabName == "API Results") {
      this.isApiTabSelected = true;
    }
    else {
      this.isApiTabSelected = false;
    }
  }

  ngOnDestroy(): void {
    this.userAuthSubscription.unsubscribe();
  }
}
