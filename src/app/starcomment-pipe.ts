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
// transform(note: number): string {
//   let html = '';
//   for (let i = 1; i <= 5; i++) {
//     html += i <= note
//       ? '<i class="bi bi-star-fill text-warning"></i>'
//       : '<i class="bi bi-star text-warning"></i>';
//   }
//   return html;
// }

