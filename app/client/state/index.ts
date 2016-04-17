import {loadAsState} from '../module';

import {MainController} from './main.controller';
import {MonthController} from './month.controller';

export function load() {
    loadAsState(MainController);
    loadAsState(MonthController);
}