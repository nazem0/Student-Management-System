import { AbstractControl, FormGroup } from '@angular/forms';
export class AppHelper {

    public static onlyDigitsPattern =  /^\d+$/;
    public static checkIsFormTouchedOrDirty(form:FormGroup):boolean{
        return form.touched || form.dirty
    }


    public static checkIsControlTouchedOrDirty(control:AbstractControl<any, any> | null):boolean{
        return (control?.touched || control?.dirty) ?? false
    }

    public static checkIsControlHasRequiredError(control:AbstractControl<any, any> | null):boolean{
        return control?.getError('required')
    }

    public static checkTouchedOrDirtyAndRequiredError(control:AbstractControl<any, any> | null):boolean{
        return this.checkIsControlTouchedOrDirty(control) && this.checkIsControlHasRequiredError(control)
    }
}
