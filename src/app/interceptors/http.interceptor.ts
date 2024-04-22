import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthHelper } from "../helpers/auth-helper";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class Http implements HttpInterceptor {
    constructor(
        private _snackbar: MatSnackBar,
        private _authHelper: AuthHelper,
        private _translate:TranslateService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                token: `Bearer ${this._authHelper.getToken()}`,
                lang:  this._translate.currentLang
                
            }
        })
        return next.handle(req).pipe(
            tap(async (event: HttpEvent<any>) => {
                if (!(event instanceof HttpResponse)) return;
                console.log(event);
                
                if(req.method !== 'GET' || event.status !== 200) {
                    this._snackbar.open(event.body.Message, 'close', { duration: 5000 })
                }
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this._snackbar.open(this._translate.instant("Unauthorized"))
                    this._authHelper.removeToken();
                } else if (error.error != null) {
                    {
                        this._snackbar.open(error.error.Message)
                    }
                }
                else {
                    this._snackbar.open(this._translate.instant("Error"))
                }
                return throwError(() => new Error(error.error.Message));
            })
        );

    }
}
