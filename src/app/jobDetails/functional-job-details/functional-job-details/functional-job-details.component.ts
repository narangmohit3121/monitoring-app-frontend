import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MonitoringService } from 'src/app/Monitoring.service';

@Component({
  selector: 'app-functional-job-details',
  templateUrl: './functional-job-details.component.html',
  styleUrls: ['./functional-job-details.component.css']
})
export class FunctionalJobDetailsComponent implements OnInit, OnDestroy {

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
