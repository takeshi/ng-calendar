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

angularModule.animation('.s-main', function () {
    return {
        enter: function (element, done) {
            element.css('opacity', 0);
            jQuery(element).animate({
                opacity: 1
            }, done);
            console.log('enter');
            return function (isCancelled) {
                console.log('enter done');
                if (isCancelled) {
                    jQuery(element).stop();
                }
            }
        },
        leave: function (element, done) {
            console.log('leave');
            element.css('opacity', 1);
            jQuery(element).animate({
                opacity: 0
            }, done);

            return function (isCancelled) {
                console.log('leave done');
                if (isCancelled) {
                    jQuery(element).stop();
                }
            }
        },
        move: function (element, done) {
            console.log('move');
            element.css('opacity', 0);
            jQuery(element).animate({
                opacity: 1
            }, done);

            return function (isCancelled) {
                console.log('leave done');
                if (isCancelled) {
                    jQuery(element).stop();
                }
            }
        },

        // you can also capture these animation events
        addClass: function (element, className, done) { },
        removeClass: function (element, className, done) { }
    }
});