import {Day} from '../module';
import {State, angularModule} from '../module';

@State('main', {
    url: '/',
    template: require('html!./main.html')
})
export class MainController {

    year: number = 2016;

    selected: Day;

    constructor(private $state: angular.ui.IStateService) {
        this.selected = Day.today;
    }

    select(day: Day) {
        console.log(day);
        // this.selected = day;
        this.$state.go('month', {
            year: day.year,
            month: day.month
        })
    }

    today() {
        this.year = Day.today.year;
        this.selected = Day.today;
    }

}