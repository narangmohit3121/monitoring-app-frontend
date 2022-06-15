import { Component, OnInit } from '@angular/core';
import { MonitoringService } from 'src/app/Monitoring.service';

@Component({
  selector: 'app-api-job-details',
  templateUrl: './api-job-details.component.html',
  styleUrls: ['./api-job-details.component.css']
})
export class ApiJobDetailsComponent implements OnInit {
  currentJobFeatureSummary: any;

  constructor(private monitoringService: MonitoringService) { }

  ngOnInit(): void {
    this.monitoringService.apiFeatureDetails.subscribe((apiFeatureSummary) => {
      this.currentJobFeatureSummary = apiFeatureSummary;

    })
  }

}
