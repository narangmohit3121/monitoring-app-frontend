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

export interface CollectionSummary {
    passed: number,
    failed: number,
    scenarios: string[]
}

export interface APIFailureDetail {

    "errorType": string
    "errorMessage": string,
    "requestName": string,
    "folderName": string,
    "requestId": string,
    "testName": string
}

export interface FunctionalJobResults {
    passed: number,
    failed: number,
    failedScenarios: { name: string, error: string }[],

    featureSummary?: {
        [s: string]: FeatureSummary
    }
}

export interface APIJobResults {
    passed: number,
    failed: number,
    failures: APIFailureDetail[],

    collectionSummary?: {
        [s: string]: CollectionSummary
    }
}

export interface AllApiJobResults {
    statusCode: number,
    body: any
}

export type PastJobResults = { passed: number, failed: number, createdDate: string }[];

@Injectable({ providedIn: "root" })
export class MonitoringService {

    currentFeatureDetails: BehaviorSubject<any> = new BehaviorSubject<any>({});

    functionalJobsUrl: string = "https://45563175-c1f3-4be9-8ce1-e314f96243d8.mock.pstmn.io/apiJobs2";
    awsJobUrl: string = "https://13eatbyire.execute-api.ap-south-1.amazonaws.com/dev";
    apiJobsUrl: string = "https://45563175-c1f3-4be9-8ce1-e314f96243d8.mock.pstmn.io/apiJobs2";

    constructor(private httpClient: HttpClient) {

    }

    getFunctionalJobList(): Observable<AllApiJobResults> {
        return this.httpClient.get<AllApiJobResults>(this.functionalJobsUrl);
        // return this.httpClient.get<AllApiJobResults>(this.awsJobUrl + "/api/apiJobResults");

    }


    getFunctionalJobResult(jobName: string): Observable<{ "data": FunctionalJobResults }> {
        console.log(`Fetching the results for ${jobName}`)

        return this.httpClient.get<{ "data": FunctionalJobResults }>(this.functionalJobsUrl + "/v2/" + jobName);

    }

    getApiJobList(): Observable<AllApiJobResults> {
        return this.httpClient.get<AllApiJobResults>(this.apiJobsUrl);
        // return this.httpClient.get<AllApiJobResults>(this.awsJobUrl + "/api/apiJobResults");

    }


    getApiJobResult(jobName: string): Observable<{ "data": APIJobResults }> {
        console.log(`Fetching the results for ${jobName}`)

        return this.httpClient.get<{ "data": APIJobResults }>(this.apiJobsUrl + "/v3/" + jobName);

    }

    getPastFunctionalJobResults(jobName: string, numberOfResults?: number):
        Observable<{ "data": PastJobResults }> {
        return this.httpClient.get<{ "data": PastJobResults }>(this.functionalJobsUrl + "/getPastJobs" + "/" + jobName);
    }

}