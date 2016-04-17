import {State, Day} from '../module';

interface IStateParams extends angular.ui.IStateParamsService {
    year: string;
    month: string;
}

@State('month', {
    url: '/month/:year/:month',
    template: require('html!./month.html')
})
export class MonthController {

    selected: Day;

    constructor(
        private $stateParams: IStateParams,
        private $state: angular.ui.IStateService

    ) {
        this.selected = Day.today;
        this.init();
    }

    toYear() {
        this.$state.go('main');
    }

    init() {
        this.selected = Day.create({
            year: parseInt(this.$stateParams.year),
            month: parseInt(this.$stateParams.month)
        });
    }

    select(day: Day) {
        this.selected = day;
    }

}
