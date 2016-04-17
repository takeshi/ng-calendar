/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />

export * from '../share/calender';

export let angularModule = angular.module('app', ['ui.router']);

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