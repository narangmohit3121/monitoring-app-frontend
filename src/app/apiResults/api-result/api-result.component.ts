import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { donutChartOptions } from 'src/app/helpers/donutChartOptions';
import { Options } from 'highcharts';
import { JobResults, MonitoringService } from 'src/app/Monitoring.service';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../alert/placeholder.directive';

@Component({
  selector: 'app-api-result',
  templateUrl: './api-result.component.html',
  styleUrls: ['./api-result.component.css']
})
export class ApiResultComponent implements OnInit, OnDestroy {

  jobName: string = "";
  chart = new Chart(donutChartOptions);
  chart2: Chart = null;
  chart3: Chart = null;
  jobResults: JobResults;
  paramSubscription: Subscription
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  closeAlertSub: Subscription;


  constructor(private activatedRoute: ActivatedRoute,
    private monitoringService: MonitoringService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.paramSubscription = this.activatedRoute.params.subscribe((params) => {
      this.jobName = params['jobName'];
      console.log(`Displaying the results of ${this.jobName}`);
    })

    this.monitoringService.getApiJobResult(this.jobName.replaceAll(" ", "_")).
      subscribe((result) => {
        console.log(result)
        this.jobResults = result.data;
        this.monitoringService.apiFeatureDetails.next(this.jobResults.featureSummary);

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
        this.chart2 = new Chart(updatedChart)
        this.chart3 = new Chart(updatedChart)
      });
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
