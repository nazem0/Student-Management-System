import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthHelper } from "../helpers/auth-helper";

@Injectable()
export class Http implements HttpInterceptor {
    constructor(
        private _snackbar: MatSnackBar,
        private _authHelper: AuthHelper,
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                token: `Bearer ${this._authHelper.getToken()}`,
                lang: 'en' // To be changed later.
                
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
                    this._snackbar.open("Unauthorized", 'close', { duration: 5000 })
                    this._authHelper.removeToken();
                } else if (error.error != null) {
                    {
                        this._snackbar.open(error.error.Message, 'close', { duration: 5000 })
                    }
                }
                else {
                    this._snackbar.open("Error", 'close', { duration: 5000 })
                }
                return throwError(() => new Error(error.error.Message));
            })
        );

    }
}
