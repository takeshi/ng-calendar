import {loadAsComponent} from "../module";

import {MonthComponent} from "./month.component.ts";
import {YearComponent} from "./year.component.ts";

export function load() {
    loadAsComponent(MonthComponent);
    loadAsComponent(YearComponent);
}
