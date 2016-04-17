/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/angularjs/angular-animate.d.ts" />


export * from '../share/calender';

export let angularModule = angular.module('app', ['ui.router', 'ngAnimate']);

export function Component(name: string, config: angular.IComponentOptions) {
    return function (clazz: any) {
        config.controller = clazz;
        clazz.$$component = {
            name: name,
            config: config
        }
    }
}

export function loadAsComponent(clazz: any) {
    if (!clazz.$$component) {
        throw new Error(`require @Component ${clazz.name}`);
    }
    angularModule.component(clazz.$$component.name, clazz.$$component.config);

}

export function State(name: string, config: angular.ui.IState) {
    return function (clazz: any) {
        config.controller = clazz;
        config.controllerAs = '$ctrl';
        clazz.$$state = {
            name: name,
            config: config
        };
    }
}

export function loadAsState(clazz: any) {

    if (!clazz.$$state) {
        throw new Error(`require @State ${clazz.name}`);
    }

    angularModule.config(($stateProvider: angular.ui.IStateProvider) => {
        $stateProvider.state(clazz.$$state.name, clazz.$$state.config);
    });

}
