import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'ReplaceUnderscore',
    pure: false
})
export class ReplaceUnderScoreBySpace implements PipeTransform {
    transform(value: any) {
        return value.replaceAll("_", " ")
    }
}