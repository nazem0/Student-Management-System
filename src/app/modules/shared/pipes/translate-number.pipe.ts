import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translateNumber'
})
export class TranslateNumberPipe implements PipeTransform {
  constructor(private translateService:TranslateService) {
  }
  transform(value: number): string {

    return value.toLocaleString(this.translateService.currentLang);
  }

}
