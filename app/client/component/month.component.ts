import {Component, SelectDay, Week, Day, Month} from '../module';


@Component('month', {
    template: require('html!./month.html'),
    bindings: {
        year: '=',
        month: '=',
        select: '&',
        selected: '='
    },
})
export class MonthComponent {

    year: number;
    month: number;
    select: SelectDay;
    selected: Day;

    weekLabels: string[];
    days: Day[];
    weeks: Week[];

    constructor(private $scope: angular.IScope) {
        this.init();
    }

    init() {
        this.weekLabels = Week.WeekLabels;

        let reflesh = () => {
            let month = new Month(this.year, this.month);
            this.days = month.days;
            this.weeks = month.weeks;
        }

        this.$scope.$watch(() => {
            return this.month + this.year * 100;
        }, reflesh);

    }

    _select(day: Day) {
        if (this.select) {
            this.select({
                $day: day
            })
        }
    }

    hasTask(day: Day) {
        return day.day === 2;
    }

    isIncludeMonth(day: Day) {
        return this.year === day.year && this.month === day.month;
    }

    isSelected(day: Day) {
        if (!this.selected) {
            return false;
        }
        return Day.eq(day, this.selected);
    }


}