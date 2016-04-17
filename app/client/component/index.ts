import {loadAsComponent} from "../module";

import {YearComponent} from "./year.component.ts";
import {YearMonthComponent} from "./year-month.component.ts";
import {MonthComponent} from './month.component.ts';

export function load() {

    loadAsComponent(YearMonthComponent);
    loadAsComponent(YearComponent);
    loadAsComponent(MonthComponent);
    
}
