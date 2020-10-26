import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MatDialog } from '@angular/material';

declare const window: any;

@Injectable({
  providedIn: 'root'
})

export class UtilsService {
  picUrl = `${environment.baseUrl}/pictures/`;
  private internalConnectionChanged = new Subject<boolean>();

  static formatToCurrency(value: number) {
    return new Intl.NumberFormat().format(+value.toFixed(2));
  }

  static intersection(setA, setB) {
    // tslint:disable-next-line: variable-name
    const _intersection = new Set();
    for (const elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
  }

  static difference(setA, setB) {
    // tslint:disable-next-line: variable-name
    const _difference = new Set(setA);
    for (const elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
  }
  constructor(
    private http: HttpClient,
    private dbService: NgxIndexedDBService,
    private dialog: MatDialog
  ) {
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
   }

  get isOnline() {
    return !!window.navigator.onLine;
  }

  get connectionChanged() {
    return this.internalConnectionChanged.asObservable();
  }

  private updateOnlineStatus() {
    this.internalConnectionChanged.next(window.navigator.onLine);
  }

  static displayFormServerErrors(srvErr: HttpErrorResponse, form: FormGroup) {
    if (Array.isArray(srvErr.error.errors)) {
      srvErr.error.errors.forEach(key => {
        if (Object.keys(form.controls).includes(key)) {
          form.get(key).setErrors({serverErrors: srvErr.error.errors[key]});
        }
      });
    } else {
      Object.keys(srvErr.error.errors).forEach(key => {
        if (Object.keys(form.controls).includes(key)) {
          form.get(key).setErrors({serverErrors: srvErr.error.errors[key]});
        }
      });
    }
  }

  getFileForm(pic, appName, modelName, pk, bearerName): FormData {
    const uploads = new FormData();
    uploads.append('app_name', appName);
    uploads.append('model_name', modelName);
    uploads.append('pk', pk);
    uploads.append('bearer_name', bearerName);
    uploads.append('pic_name', pic.name);
    uploads.append('pic_file', pic, pic.name);
    return uploads;
  }

  getUser() {
    const userAccount: Subject<any> = new Subject<any>();
    this.dbService.getAll('user').then(userD => {
        userAccount.next(userD[0]);
        userAccount.complete();
    }, err => {
      userAccount.next(false);
      userAccount.complete();
    });
    return userAccount;
  }

  updateUser(user) {
    this.dbService.clear('user').then(() => {
      this.dbService.add('user', user).then(user => {
        console.log('User loged in');
      }, errr => {
        console.log('Unable to persist User!');
      });
    });
  }
}
