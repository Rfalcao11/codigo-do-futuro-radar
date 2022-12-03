import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarCep'
})
export class FormatacaoCepPipe implements PipeTransform {

  transform(cep: string):String  {
    let cepFormatado = cep || ''
    return cepFormatado!.replace(/(\d{5})(\d{3})/, "$1-$2");
  }


}
