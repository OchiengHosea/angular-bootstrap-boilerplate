import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safeHtml'
})

export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(value: any, ...args: any[]): any {
        const res = this.sanitizer.bypassSecurityTrustHtml(value);
        return res;
    }
}

@Pipe({
  name: 'keyToWord'
})
export class KeyToWordPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let words = value.split('_');
    words = words.map(word => word.charAt(0).toUpperCase() + word.substring(1));
    return words.join(' ');
  }

}


@Pipe({
  name: 'numToCurrency'
})
export class NumToCurrencyPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return new Intl.NumberFormat().format(+value.toFixed(2));
  }
}

@Pipe({name: 'snakeCaseToWord'})
export class SnakeCaseToWordPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (args[0] === 'name') {return value.split('_')[1]; }
        if (args[0] === 'id') {return value.split('_')[0]; }
        if (args[0] === 'all') {return value.split('_').map(wrd => wrd.charAt(0).toUpperCase() + wrd.slice(1)).join(' '); }
        return value.split('_');
    }
}

@Pipe({name: 'objectKeys'})
export class ObjectKeysPipe implements PipeTransform {
  transform(value: any, ...args: any[]){
    if (args[0] === 'values') {return Object.values(value); }
    return Object.keys(value);
  }
}