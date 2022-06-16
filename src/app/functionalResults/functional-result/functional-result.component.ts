import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { donutChartOptions } from 'src/app/helpers/donutChartOptions';
import { Options } from 'highcharts';
import { FeatureSummary, FunctionalJobResults, MonitoringService, PastJobResults } from 'src/app/Monitoring.service';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../../helpers/alert/alert.component';
import { PlaceholderDirective } from '../../helpers/alert/placeholder.directive';

@Component({
  selector: 'app-functional-result',
  templateUrl: './functional-result.component.html',
  styleUrls: ['./functional-result.component.css']
})
export class FunctionalResultComponent implements OnInit {

  jobName: string = "";
  chart = new Chart(donutChartOptions);
  // chart2: Chart = null;
  // chart3: Chart = null;
  jobResults: FunctionalJobResults;
  paramSubscription: Subscription
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  closeAlertSub: Subscription;
  failureTableColumns: string[] = [];
  pastResultsChart: Chart = null;


  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private monitoringService: MonitoringService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.paramSubscription = this.activatedRoute.params.subscribe((params) => {
      this.jobName = params['jobName'];
      console.log(`Displaying the results of ${this.jobName}`);
    })

    this.monitoringService.getFunctionalJobResult(this.jobName.replaceAll(" ", "_")).
      subscribe((result) => {
        console.log(result)
        this.jobResults = result.data;


        let updatedChart: Options = {
          chart: {
            type: 'pie',
            plotShadow: false,
          },
          credits: {
            enabled: false,
          },
          plotOptions: {
            pie: {
              innerSize: '1%',
              borderWidth: 10,
              borderColor: null,
              slicedOffset: 20,
              dataLabels: {
                connectorWidth: 0,
              },
            },
          },
          tooltip: {
            formatter: function () {
              let toolTipText = this.point.y + "%  " + this.point.name;
              return toolTipText
            }
          },
          title: {
            style: {
              color: 'white',
              font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
            },
            verticalAlign: 'middle',
            floating: true,
            text: 'RESULTS %',

          },
          legend: {
            enabled: false,
          },
          series: [
            {
              type: 'pie',
              data: [
                { name: 'PASSED', y: this.jobResults.passed, color: '#506ef9' },
                { name: 'FAILED', y: this.jobResults.failed, color: '#393e46' },
              ],
            },
          ],
        }
        this.chart = new Chart(updatedChart);
        // this.chart2 = new Chart(updatedChart)
        // this.chart3 = new Chart(updatedChart)
      });

    this.monitoringService.getPastFunctionalJobResults(this.jobName.replaceAll(" ", "_")).
      subscribe((pastJobResults) => {
        let pastJobResultData: PastJobResults = pastJobResults.data;

        let pastJobDates: string[] = [];
        // let pastJobPassCounts: number[] = [];
        // let pastJobFailCounts: number[] = [];
        let pastSuccessPercent: number[] = [];
        pastJobResultData.forEach((pastJobResult) => {
          pastJobDates.push(new Date(pastJobResult.createdDate).toDateString());
          // pastJobPassCounts.push(pastJobResult.passed);
          // pastJobFailCounts.push(pastJobResult.failed);
          pastSuccessPercent.push(Math.ceil(
            (
              pastJobResult.passed / (pastJobResult.passed + pastJobResult.failed)
            ) * 100
          ))
        });
        let pastJobResultsChartOptions: Options = {
          chart: {
            type: 'line'
          },
          title: {
            text: 'Monthly Average Temperature'
          },
          subtitle: {
            text: 'Source: WorldClimate.com'
          },
          xAxis: {
            categories: pastJobDates
          },
          yAxis: {
            title: {
              text: 'Temperature (°C)'
            }
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true
              },
              enableMouseTracking: false
            }
          },
          series: [
            //   {
            //   name: 'PASSED',
            //   type: 'line',
            //   data: pastJobPassCounts
            // }, {
            //   name: 'FAILED',
            //   type: 'line',
            //   data: pastJobFailCounts
            // },
            {
              name: 'FAILED',
              type: 'line',
              data: pastSuccessPercent
            }]
        }

        this.pastResultsChart = new Chart(pastJobResultsChartOptions);
      })
  }

  viewJobFeatures() {
    this.monitoringService.currentFeatureDetails.next(this.jobResults.featureSummary);
    this.router.navigate(['/functionalJobDetail']);
  }

  showError(errorMessage: string) {
    console.log(errorMessage);
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostContainerRef = this.alertHost.viewContainerRef;
    hostContainerRef.clear();
    const componentRef = hostContainerRef.createComponent(alertComponentFactory);

    componentRef.instance.errorMessage = errorMessage;
    this.closeAlertSub = componentRef.instance.closeAlertEvent.subscribe(() => {
      this.closeAlertSub.unsubscribe();
      hostContainerRef.clear();
    })

  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
    // this.closeAlertSub.unsubscribe();
  }

}
