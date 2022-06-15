import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http"
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ApiResults } from 'src/app/apiResults/api.results.component';

import { AppComponent } from './app.component';
import { FunctionalResultsComponent } from './functionalResults/functional-results/functional-results.component';
import { ApiResultComponent } from './apiResults/api-result/api-result.component';
import { FilterPipe } from './apiResults/filter.pipe';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { ApiJobDetailsComponent } from './jobDetails/api-job-details/api-job-details.component';
import { AlertComponent } from './apiResults/alert/alert.component';
import { PlaceholderDirective } from './apiResults/alert/placeholder.directive';


let routes: Routes = [
  { path: '', component: SignInComponent },
  { path: "apiResults", component: ApiResults },
  { path: "functionalResults", component: FunctionalResultsComponent },
  { path: "apiResults/:jobName", component: ApiResultComponent },
  { path: "login", component: SignUpComponent },
  { path: "apiJobDetail", component: ApiJobDetailsComponent }

]
@NgModule({
  declarations: [
    AppComponent,
    ApiResults,
    FunctionalResultsComponent,
    ApiResultComponent,
    FilterPipe,
    SignUpComponent,
    SignInComponent,
    ApiJobDetailsComponent,
    AlertComponent,
    PlaceholderDirective,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent],
})
export class AppModule { }
