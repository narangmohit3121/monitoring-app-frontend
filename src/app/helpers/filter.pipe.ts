import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {

    transform(value: any[], filterVal: any) {
        // throw new Error("Method not implemented.");
        return value.filter((jobName) => {
            return (jobName as string).toLocaleLowerCase().
                includes((filterVal as string).toLocaleLowerCase())
        })
    }

}