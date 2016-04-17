import {angularModule} from '../module';

import {MainController} from './main.controller';

export function load() {
    
    angularModule.config(($stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider:angular.ui.IUrlRouterProvider
    ) => {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('main', {
            url: '/',
            template: require('html!./main.html'),
            controller: MainController,
            controllerAs: '$ctrl'
        });

    });
    
}