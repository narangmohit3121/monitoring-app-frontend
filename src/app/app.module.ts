import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http"
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ApiResults } from 'src/app/apiResults/api-results/api.results.component';

import { AppComponent } from './app.component';
import { FunctionalResultsComponent } from './functionalResults/functional-results/functional-results.component';
import { ApiResultComponent } from './apiResults/api-result/api-result.component';
import { FilterPipe } from './helpers/filter.pipe';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { ApiJobDetailsComponent } from './jobDetails/api-job-details/api-job-details.component';
import { AlertComponent } from './helpers/alert/alert.component';
import { PlaceholderDirective } from './helpers/alert/placeholder.directive';
import { FunctionalResultComponent } from './functionalResults/functional-result/functional-result.component';
import { FunctionalJobDetailsComponent } from './jobDetails/functional-job-details/functional-job-details/functional-job-details.component';
import { AuthGuard } from './login/auth.guard';
import { ReplaceUnderScoreBySpace } from './helpers/replaceUnderScore.pipe';


let routes: Routes = [
  { path: '', component: SignInComponent },
  // { path: "apiResults", component: ApiResults, canActivate: [AuthGuard] },
  { path: "apiResults", component: ApiResults },
  // { path: "functionalResults", component: FunctionalResultsComponent, canActivate: [AuthGuard] },
  { path: "functionalResults", component: FunctionalResultsComponent },
  { path: "apiResults/:jobName", component: ApiResultComponent },
  { path: "functionalResults/:jobName", component: FunctionalResultComponent },
  { path: "login", component: SignUpComponent },
  { path: "apiJobDetail", component: ApiJobDetailsComponent },
  { path: "functionalJobDetail", component: FunctionalJobDetailsComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    ApiResults,
    FunctionalResultsComponent,
    ApiResultComponent,
    FilterPipe,
    ReplaceUnderScoreBySpace,
    SignUpComponent,
    SignInComponent,
    ApiJobDetailsComponent,
    AlertComponent,
    PlaceholderDirective,
    FunctionalResultComponent,
    FunctionalJobDetailsComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ChartModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent],
})
export class AppModule { }
