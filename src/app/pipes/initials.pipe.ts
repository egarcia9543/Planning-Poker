import { Pipe } from "@angular/core";

@Pipe({
  name: 'initials',
  standalone: true
})
export class InitialsPipe {
  transform(value: string): string {
    return value.substring(0, 2).toUpperCase();
  }
}
