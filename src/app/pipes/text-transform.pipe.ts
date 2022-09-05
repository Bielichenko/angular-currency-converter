import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'appTextTransform'
})
export class TextTransformPipe implements PipeTransform {
  transform(value: number | undefined): string | undefined {
    return value
      ? (Math.round(value * 100) / 100).toString().replace('.', ',')
      : undefined;
  };
}
