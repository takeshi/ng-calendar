import {Component} from '../module';
import {SelectDay, Day} from '../module';

@Component('year', {
    template: require('html!./year.html'),
    bindings: {
        year: '=',
        selected: '=',
        select: '&',
        selectmonth: '&'
    }
})
export class YearComponent {

    selected: Day;
    select: SelectDay;
    selectmonth: SelectDay;

    _select(day: Day) {
        this.select({
            $day: day
        });
    }

    _selectMonth($day: Day) {
        this.selectmonth({
            $day: $day
        });
    }


}