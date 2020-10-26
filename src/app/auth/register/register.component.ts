import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormBaseComponent } from 'src/app/app-shared/services/utils/form-base-component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends FormBaseComponent implements OnInit {
  signupForm: FormGroup
  constructor(
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.signupForm = FormBaseComponent.makeEveryFieldRequired(this.fb.group({
      username: '',
      password1: '',
      password2: ''
    }))
  }

}
