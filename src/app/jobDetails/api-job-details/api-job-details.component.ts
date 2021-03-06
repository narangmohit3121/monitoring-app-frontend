import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MonitoringService } from 'src/app/Monitoring.service';

@Component({
  selector: 'app-api-job-details',
  templateUrl: './api-job-details.component.html',
  styleUrls: ['./api-job-details.component.css']
})
export class ApiJobDetailsComponent implements OnInit, OnDestroy {
  currentJobFeatureSummary: any;
  featureDetailsSub: Subscription;

  constructor(private monitoringService: MonitoringService) { }

  ngOnInit(): void {
    this.featureDetailsSub = this.monitoringService.currentFeatureDetails.subscribe((apiFeatureSummary) => {
      this.currentJobFeatureSummary = apiFeatureSummary;

    })
  }

  ngOnDestroy(): void {
    this.featureDetailsSub.unsubscribe();
  }

}
