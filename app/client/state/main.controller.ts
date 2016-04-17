import {Day} from '../module';

export class MainController {

    year: number = 2016;

    selected: Day;

    constructor() {

    }

    select(day: Day) {
        console.log('main', day);
        this.selected = day;
    }

    today() {
        this.year = new Date().getFullYear();
        this.selected = Day.today;
    }

}
