import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class AuthHelper {
    private _isLoggedIn = new BehaviorSubject<boolean>(this.checkHasToken());
    isLoggedIn = this._isLoggedIn.asObservable();
    constructor(private router: Router) { }
    public static readonly authKey = "RoboostStudentManagementSystemToken";

    public storeToken(token: string): void {
        localStorage.setItem(AuthHelper.authKey, token);
        this._isLoggedIn.next(true);
    }
    public removeToken(): void {
        localStorage.removeItem(AuthHelper.authKey);
        this._isLoggedIn.next(false);
        this.router.navigate(["login"]);
    }

    public getToken(): string | null | undefined {
        return localStorage.getItem(AuthHelper.authKey)
    }

    public checkHasToken(): boolean {
        let token = this.getToken() ?? "";
        return token.length !== 0;
    }
}
