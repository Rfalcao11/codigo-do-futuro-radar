import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarTelefone'
})
export class FormatacaoPipe implements PipeTransform {

  transform(telefone: string):String  {
    let telefoneFormatado = telefone || ''
    return telefoneFormatado!.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

}
