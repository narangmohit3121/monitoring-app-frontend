import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession } from "amazon-cognito-identity-js";

const POOL_DATA = {
    UserPoolId: 'ap-south-1_MjP5QfEmT',
    ClientId: 'h3u37ae94935fit5nj8ad5ijg'
};
const userPool = new CognitoUserPool(POOL_DATA);


@Injectable({ providedIn: 'root' })
export class LoginService {

    isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    setNewPasswordFlow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    userAttributes: any;
    cognitoUser: CognitoUser;

    verifySignIn(username: string, password: string): void {
        console.log(username);
        console.log(password);
        let authData = {
            Username: username,
            Password: password
        }
        const userAttributes: CognitoUserAttribute[] = [];
        const authDetails = new AuthenticationDetails(authData);
        const userData = {
            Username: username,
            Pool: userPool
        }
        this.cognitoUser = new CognitoUser(userData);
        const that = this;
        that.cognitoUser.authenticateUser(authDetails, {
            onSuccess(result: CognitoUserSession) {
                console.log('Token received');
                console.log(result)
                that.isUserLoggedIn.next(true);
            },
            onFailure(err) {
                console.log('Authentication Failed');
                console.log(err)
                that.isUserLoggedIn.next(false);
            },
            newPasswordRequired: function (userAttributes, requiredAttributes) {

                // the api doesn't accept this field back
                delete userAttributes.email_verified;

                // store userAttributes on global variable
                // sessionUserAttributes = userAttributes;
                console.log('Must set a new password');
                that.setNewPasswordFlow.next(true);
                that.userAttributes = userAttributes;
            }
        })
    }

    setNewPassword(newPassword: string) {
        this.cognitoUser.completeNewPasswordChallenge(newPassword, this.userAttributes, {
            onSuccess(result) {
                console.log(result)
            },
            onFailure(err) {
                console.log(err);
            }
        })
    }


}