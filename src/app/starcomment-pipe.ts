import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starcomment'
})
export class StarcommentPipe implements PipeTransform {

  transform (note: number): string {
      if (!note || note < 1) return '☆☆☆☆☆';

    const filled = '★'.repeat(note);
    const empty = '☆'.repeat(5 - note);

    return filled + empty;
  }
}


