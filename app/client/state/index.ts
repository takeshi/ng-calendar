import {loadAsState, angularModule} from '../module';

import {MainController} from './main.controller';
import {MonthController} from './month.controller';
import {WeekController} from './week.controller';

export function load() {

    loadAsState(MainController);
    loadAsState(MonthController);
    loadAsState(WeekController);

    angularModule.config(($urlRouterProvider: angular.ui.IUrlRouterProvider) => {
        $urlRouterProvider.otherwise('/');
    });
}