import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/app-shared/services/notification.service';
import { FormBaseComponent } from 'src/app/app-shared/services/utils/form-base-component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBaseComponent implements OnInit {
  loginForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private noteService: NotificationService,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {
    super();
  }

  ngOnInit(): void {
    this.loginForm = FormBaseComponent.makeEveryFieldRequired(this.fb.group({
      username: '',
      password: ''
    }));
  }

  onSubmit() {
    this.noteService.showInfo('Yes', 'Loging in')
  }

}
