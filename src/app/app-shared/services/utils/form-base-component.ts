import { FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

export class FormBaseComponent {

    constructor() { }
    error = '';
    loading = false;
    formAction = 'Login';
    success = '';

    public static makeEveryFieldRequired(form: FormGroup): FormGroup {
        Object.keys(form.controls).forEach(key => form.controls[key].setValidators(Validators.required));
        return form;
    }

    public static makeEveryFieldRequiredExcept(form: FormGroup, except: string[]) {
        Object.keys(form.controls).forEach(key => {
            if (!except.includes(key)) {
              form.controls[key].setValidators(Validators.required);
            }
        });
        return form;
    }

    public static validateRequired(form: FormGroup) {
        Object.keys(form.controls).forEach(key => {
            const validator = form.get(key).validator({} as AbstractControl);
            if (validator && validator.required) {
                if (!form.value[key]) { form.get(key).setErrors({ validationErrors: [`${key} is required`] }); }
            }
        });
    }

    public static displayServerErrors(srvErr: HttpErrorResponse, form: FormGroup) {
        if (Array.isArray(srvErr.error.errors)) {
            srvErr.error.errors.forEach(key => {
                if (Object.keys(form.controls).includes(key)) {
                    form.get(key).setErrors({ serverErrors: [srvErr.error.errors[key].replace('Path', '')] });
                }
            });
        } else {
            Object.keys(srvErr.error.errors).forEach(key => {
                if (Object.keys(form.controls).includes(key)) {
                    form.get(key).setErrors({ serverErrors: [srvErr.error.errors[key].replace('Path', '').replace(/`/g, '')] });
                }
            });
        }
    }

    public static removeAutoFields(fields: string[], form: FormGroup) {
        for (const field of fields) {
            form.removeControl(field);
        }
    }

    showLoading(action: string) {
        this.loading = true;
        this.formAction = action;
    }

    stopLoading(action: string) {
        this.loading = false;
        this.formAction = action;
    }

    showError(message: string) {
        this.error = message;
    }

    showSuccess(message: string) {
        this.success = message;
    }

    formSuccess(message: string) {
        this.loading = false;
        this.showSuccess(message);
    }

    formError(message: string) {
        this.loading = false;
        this.showError(message);
    }
}
