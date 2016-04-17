import {Component} from '../module';
import {SelectDay, Day} from '../module';

@Component('year', {
    template: require('html!./year.html'),
    bindings: {
        year: '=',
        selected: '=',
        select: '&'
    }
})
export class YearComponent {

    selected: Day;
    select: SelectDay;

    _select(day: Day) {
        this.select({
            $day: day
        });        
    }

}