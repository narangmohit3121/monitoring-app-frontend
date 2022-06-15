import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

// export interface JobResults {
//     passed : number,
//     failed : number,
//     failedScenarios : string[],
//     summary? : {
//         [s : string] :{
//             "passed" : number,
//             "failed" : number
//         }
//     }
// }

export interface FeatureSummary {
    resultSummary: { "passed": number, "failed": number },
    scenarios: { "scenarioName": string, "status": string }[]
}

export interface JobResults {
    passed: number,
    failed: number,
    failedScenarios: { name: string, error: string }[],

    featureSummary?: {
        [s: string]: FeatureSummary
    }
}

export interface AllApiJobResults {
    statusCode: number,
    body: any
}

@Injectable({ providedIn: "root" })
export class MonitoringService {

    apiFeatureDetails: BehaviorSubject<any> = new BehaviorSubject<any>({});

    apiJobsUrl: string = "https://45563175-c1f3-4be9-8ce1-e314f96243d8.mock.pstmn.io/apiJobs2";
    awsJobUrl: string = "https://jt1slccfce.execute-api.ap-south-1.amazonaws.com/dev";

    constructor(private httpClient: HttpClient) {

    }

    getApiJobList(): Observable<AllApiJobResults> {
        return this.httpClient.get<AllApiJobResults>(this.apiJobsUrl)
        // return this.httpClient.get<AllApiJobResults>(this.awsJobUrl + "/getallapijobs");

    }

    getApiJobResult(jobName: string): Observable<{ "data": JobResults }> {
        console.log(`Fetching the results for ${jobName}`)

        return this.httpClient.get<{ "data": JobResults }>(this.apiJobsUrl + "/v2/" + jobName);

    }

}