import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarCpf'
})
export class FormatacaoCpfPipe implements PipeTransform {

  transform(cpf: string):String  {
    let cpfFormatado = cpf || ''
    return cpfFormatado!.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

}
