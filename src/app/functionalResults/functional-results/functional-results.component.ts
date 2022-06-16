import { Component, OnInit } from "@angular/core";
import { Chart } from "angular-highcharts";
import * as Highcharts from "highcharts";
import { Options } from "highcharts";
import { MonitoringService } from "../../Monitoring.service";

export interface FunctionalJobResult {
  name: string,
  passed: number,
  failed: number,
  createdDate: string
}

@Component({
  selector: 'app-functional-results',
  templateUrl: './functional-results.component.html',
  styleUrls: ['./functional-results.component.css']
})
export class FunctionalResultsComponent implements OnInit {

  functionalJobs: string[] = [];
  filterValue: string = "";
  barchart: Chart = null;

  constructor(private monitoringService: MonitoringService) {

  }

  ngOnInit(): void {
    this.monitoringService.getApiJobList().subscribe((response) => {
      console.log(typeof response.body)
      let responseBody: any = response.body as FunctionalJobResult[];
      let failedValues: { y: number, jobDate: string }[] = [];
      let passedValues: { y: number, jobDate: string }[] = [];
      let dates: any = {};
      responseBody.data.forEach(jobDetail => {
        this.functionalJobs.push(jobDetail.name as string);
        failedValues.push({
          y: jobDetail.failed, jobDate:
            new Date(jobDetail.createdDate).toDateString()
        });
        // passedValues.push(jobDetail.passed);
        passedValues.push({
          y: jobDetail.passed, jobDate:
            new Date(jobDetail.createdDate).toDateString()
        });;
        dates[jobDetail.name] = jobDetail.createdDate;
      });


      let barChartOptions: Options = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Latest Job Results'
        },
        xAxis: {
          categories: this.functionalJobs
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Count'
          },
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
              color: ( // theme
                Highcharts.defaultOptions.title.style &&
                Highcharts.defaultOptions.title.style.color
              ) || 'gray',
              textOutline: 'none'
            }
          }
        },
        legend: {
          align: 'right',
          x: -30,
          verticalAlign: 'top',
          y: 25,
          floating: true,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
        },
        tooltip: {
          // shared: true,
          useHTML: true,
          headerFormat: `<b>{point.x}</b><br/>`,
          // pointFormatter: function () { return 'Default ' + this.x + '</b> is <b>' + this.index + 'test' + this.y + this.series.name + '</b>'; },
          pointFormat: ' <b>EXECUTED ON : {point.jobDate}</b> <br/> <br> {series.name}: {point.y} <br/>Total: {point.stackTotal}'
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: true
            }
          }
        },
        series: [{
          name: 'Failed',
          type: 'column',
          color: "#ffab91",
          data: failedValues
        }, {
          name: 'Passed',
          type: 'column',
          color: "#a5d6a7",
          data: passedValues
        },
        ]
      }
      this.barchart = new Chart(barChartOptions);
    })
  }

}
