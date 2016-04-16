import {angularModule} from "../module";

import {MonthController} from "./month.controller.ts";

export function init() {

    angularModule.component('month', {
        template: require('html!./month.html'),
        bindings: {
            year: '=',
            month: '='
        },
        controller: MonthController
    });

}