import {angularModule} from '../module';

import {MainController} from './main.controller';

export function init() {
    
    angularModule.config(($stateProvider: angular.ui.IStateProvider) => {

        $stateProvider.state('main', {
            url: '/',
            template: require('html!./main.html'),
            controller: MainController,
            controllerAs: '$ctrl'
        });

    });
    
}