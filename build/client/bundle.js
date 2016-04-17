/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var state = __webpack_require__(1);
	var component = __webpack_require__(10);
	state.load();
	component.load();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(2);
	var main_controller_1 = __webpack_require__(4);
	var month_controller_1 = __webpack_require__(6);
	var week_controller_1 = __webpack_require__(8);
	function load() {
	    module_1.loadAsState(main_controller_1.MainController);
	    module_1.loadAsState(month_controller_1.MonthController);
	    module_1.loadAsState(week_controller_1.WeekController);
	    module_1.angularModule.config(function ($urlRouterProvider) {
	        $urlRouterProvider.otherwise('/');
	    });
	}
	exports.load = load;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings/angularjs/angular.d.ts" />
	/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
	/// <reference path="../../typings/node/node.d.ts" />
	/// <reference path="../../typings/angularjs/angular-animate.d.ts" />
	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(3));
	exports.angularModule = angular.module('app', ['ui.router', 'ngAnimate']);
	function Component(name, config) {
	    return function (clazz) {
	        config.controller = clazz;
	        clazz.$$component = {
	            name: name,
	            config: config
	        };
	    };
	}
	exports.Component = Component;
	function loadAsComponent(clazz) {
	    if (!clazz.$$component) {
	        throw new Error("require @Component " + clazz.name);
	    }
	    exports.angularModule.component(clazz.$$component.name, clazz.$$component.config);
	}
	exports.loadAsComponent = loadAsComponent;
	function State(name, config) {
	    return function (clazz) {
	        config.controller = clazz;
	        config.controllerAs = '$ctrl';
	        clazz.$$state = {
	            name: name,
	            config: config
	        };
	    };
	}
	exports.State = State;
	function loadAsState(clazz) {
	    if (!clazz.$$state) {
	        throw new Error("require @State " + clazz.name);
	    }
	    exports.angularModule.config(function ($stateProvider) {
	        $stateProvider.state(clazz.$$state.name, clazz.$$state.config);
	    });
	}
	exports.loadAsState = loadAsState;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var Day = (function () {
	    function Day() {
	    }
	    Day.prototype.toString = function () {
	        return this.year + "/" + this.month + "/" + this.date;
	    };
	    Day.prototype.toDate = function () {
	        return new Date(this.year, this.month - 1, this.date);
	    };
	    Object.defineProperty(Day.prototype, "dayLabel", {
	        get: function () {
	            return Week.WeekLabels[this.day];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Day.prototype, "isToday", {
	        get: function () {
	            return Day.isToday(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Day.eqYear = function (day1, day2) {
	        return day1.year === day2.year;
	    };
	    Day.eqMonth = function (day1, day2) {
	        return day1.month === day2.month
	            && day1.year === day2.year;
	    };
	    Day.eq = function (day1, day2) {
	        return day1.date === day2.date
	            && day1.month === day2.month
	            && day1.year === day2.year;
	    };
	    Day.isToday = function (day) {
	        return Day.eq(day, Day.today);
	    };
	    Object.defineProperty(Day, "today", {
	        get: function () {
	            return Day.of(new Date());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Day.create = function (args) {
	        return Day.of(new Date(args.year, args.month - 1, args.date || 1));
	    };
	    Day.of = function (date) {
	        var day = new Day();
	        day.year = date.getFullYear();
	        day.month = date.getMonth() + 1;
	        day.date = date.getDate();
	        day.day = date.getDay();
	        var firstDay = new Date(day.year, day.month - 1, 1);
	        day.week = Math.ceil((day.date + firstDay.getDay()) / 7) - 1;
	        return day;
	    };
	    return Day;
	}());
	exports.Day = Day;
	var Week = (function () {
	    function Week(year, month, week) {
	        this.year = year;
	        this.month = month;
	        this.week = week;
	        this.days = [];
	        this.init();
	    }
	    Week.prototype.nextWeekFirstDay = function () {
	        var next = this.days[6].toDate();
	        next.setDate(next.getDate() + 1);
	        return Day.of(next);
	    };
	    Week.prototype.init = function () {
	        var day = new Date(this.year, this.month - 1, 1);
	        day.setDate(day.getDate() - day.getDay());
	        day.setDate(day.getDate() + 7 * (this.week));
	        for (var i = 0; i < 7; i++) {
	            this.days.push(Day.of(day));
	            day.setDate(day.getDate() + 1);
	        }
	    };
	    Week.WeekLabels = '日 月 火 水 木 金 土'.split(' ');
	    return Week;
	}());
	exports.Week = Week;
	var Month = (function () {
	    function Month(year, month) {
	        this.year = year;
	        this.month = month;
	        this.weeks = [];
	        this.days = [];
	        this.init();
	    }
	    Month.prototype.isInclude = function (day) {
	        return this.year == day.year && this.month == day.month;
	    };
	    Month.prototype.init = function () {
	        var day = new Date(this.year, this.month - 1, 1);
	        while ((day.getMonth() + 1) % 12 == this.month % 12) {
	            this.days.push(Day.of(day));
	            day.setDate(day.getDate() + 1);
	        }
	        for (var i = 0;; i++) {
	            var week = new Week(this.year, this.month, i);
	            this.weeks.push(week);
	            var next = week.nextWeekFirstDay();
	            if (this.month % 12 != next.month % 12) {
	                break;
	            }
	        }
	    };
	    return Month;
	}());
	exports.Month = Month;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var module_1 = __webpack_require__(2);
	var module_2 = __webpack_require__(2);
	var MainController = (function () {
	    function MainController($state) {
	        this.$state = $state;
	        this.year = 2016;
	        this.selected = module_1.Day.today;
	    }
	    MainController.prototype.select = function (day) {
	        console.log(day);
	        // this.selected = day;
	        this.$state.go('month', {
	            year: day.year,
	            month: day.month
	        });
	    };
	    MainController.prototype.today = function () {
	        this.year = module_1.Day.today.year;
	        this.selected = module_1.Day.today;
	    };
	    MainController = __decorate([
	        module_2.State('main', {
	            url: '/',
	            template: __webpack_require__(5)
	        }), 
	        __metadata('design:paramtypes', [Object])
	    ], MainController);
	    return MainController;
	}());
	exports.MainController = MainController;


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "<div class=\"s-main\">\r\n    \r\n    <!--<div class=\"s-main_head\">\r\n\r\n    </div>-->\r\n    \r\n    <year \r\n        month=\"month\" \r\n        year=\"$ctrl.year\" \r\n        selectmonth=\"$ctrl.select($day)\"\r\n        selected=\"$ctrl.selected\"\r\n    />\r\n\r\n</div>";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var module_1 = __webpack_require__(2);
	var MonthController = (function () {
	    function MonthController($stateParams, $state) {
	        this.$stateParams = $stateParams;
	        this.$state = $state;
	        this.init();
	    }
	    MonthController.prototype.toYear = function () {
	        this.$state.go('main');
	    };
	    MonthController.prototype.init = function () {
	        this.year = parseInt(this.$stateParams.year);
	        this.month = parseInt(this.$stateParams.month);
	    };
	    MonthController.prototype.select = function (day) {
	        // this.selected = day;
	        this.$state.go('week', {
	            year: day.year,
	            month: day.month,
	            date: day.date
	        });
	    };
	    MonthController = __decorate([
	        module_1.State('month', {
	            url: '/month/:year/:month',
	            template: __webpack_require__(7)
	        }), 
	        __metadata('design:paramtypes', [Object, Object])
	    ], MonthController);
	    return MonthController;
	}());
	exports.MonthController = MonthController;


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div class=\"s-month\">\r\n    <div class=\"s-month_head\" ng-click=\"$ctrl.toYear()\">\r\n        <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n         {{$ctrl.year}}\r\n    </div>\r\n    <month \r\n       year=\"$ctrl.year\"\r\n       month=\"$ctrl.month\" \r\n       selected=\"$ctrl.selected\"\r\n       select=\"$ctrl.select($day)\"\r\n    />\r\n</div>";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var module_1 = __webpack_require__(2);
	var WeekController = (function () {
	    function WeekController($stateParams, $state) {
	        this.$stateParams = $stateParams;
	        this.$state = $state;
	        this.hours = [];
	        this.init();
	    }
	    WeekController.prototype.init = function () {
	        for (var i = 0; i < 24; i++) {
	            this.hours.push(i);
	        }
	        this.year = parseInt(this.$stateParams.year);
	        this.month = parseInt(this.$stateParams.month);
	        this.date = parseInt(this.$stateParams.date);
	        this.selected = module_1.Day.create({
	            year: this.year,
	            month: this.month,
	            date: this.date
	        });
	        this.week = new module_1.Week(this.year, this.month, this.selected.week);
	    };
	    WeekController.prototype.toMonth = function () {
	        this.$state.go('month', {
	            year: this.selected.year,
	            month: this.selected.month
	        });
	    };
	    WeekController.prototype.select = function (day) {
	        this.selected = day;
	    };
	    WeekController.prototype.isSelected = function (day) {
	        if (!this.selected) {
	            return false;
	        }
	        return module_1.Day.eq(day, this.selected);
	    };
	    WeekController = __decorate([
	        module_1.State('week', {
	            url: '/week/:year/:month/:date',
	            template: __webpack_require__(9)
	        }), 
	        __metadata('design:paramtypes', [Object, Object])
	    ], WeekController);
	    return WeekController;
	}());
	exports.WeekController = WeekController;


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<div class=\"s-week\">\r\n    <div class=\"s-week_head\">\r\n        <span ng-click=\"$ctrl.toMonth()\">\r\n            <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n            {{$ctrl.selected.month}}月        \r\n         </span>\r\n    </div>    \r\n    <div class=\"s-week_week\">\r\n        <div ng-repeat=\"day in $ctrl.week.days\" class=\"s-week_day\" ng-class=\"{\r\n                's-week_selected':$ctrl.isSelected(day),\r\n                's-week_today':day.isToday\r\n            }\">\r\n            <a ng-if=\"!day.otherMonth\" ng-click=\"$ctrl.select(day)\">\r\n            {{day.date}}\r\n            </a>\r\n            <div class=\"month_have\" ng-if=\"$ctrl.hasTask(day)\">\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"s-week_hours\">\r\n        <div ng-repeat=\"hour in $ctrl.hours\" class=\"s-week_hour\">\r\n            <span class=\"s-week_oclock\">\r\n            {{hour}}:00\r\n                <span class=\"s-week_oclockLine\">\r\n                </span>\r\n            </span>\r\n           \r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(2);
	var year_component_ts_1 = __webpack_require__(11);
	var year_month_component_ts_1 = __webpack_require__(13);
	var month_component_ts_1 = __webpack_require__(15);
	function load() {
	    module_1.loadAsComponent(year_month_component_ts_1.YearMonthComponent);
	    module_1.loadAsComponent(year_component_ts_1.YearComponent);
	    module_1.loadAsComponent(month_component_ts_1.MonthComponent);
	}
	exports.load = load;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var module_1 = __webpack_require__(2);
	var YearComponent = (function () {
	    function YearComponent() {
	    }
	    YearComponent.prototype._select = function (day) {
	        this.select({
	            $day: day
	        });
	    };
	    YearComponent.prototype._selectMonth = function ($day) {
	        this.selectmonth({
	            $day: $day
	        });
	    };
	    YearComponent = __decorate([
	        module_1.Component('year', {
	            template: __webpack_require__(12),
	            bindings: {
	                year: '=',
	                selected: '=',
	                select: '&',
	                selectmonth: '&'
	            }
	        }), 
	        __metadata('design:paramtypes', [])
	    ], YearComponent);
	    return YearComponent;
	}());
	exports.YearComponent = YearComponent;


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "<div class=\"year\">\r\n    <div class=\"year_year\">\r\n        {{$ctrl.year}}年\r\n    </div>\r\n\r\n    <div ng-repeat=\"m in [[1,2,3],[4,5,6],[7,8,9],[10,11,12]]\">\r\n\r\n        <div class=\"year_month\" ng-repeat=\"month in m\">\r\n            <year-month \r\n                month=\"month\" \r\n                year=\"$ctrl.year\" \r\n                selectmonth=\"$ctrl._selectMonth($day)\"\r\n                select=\"$ctrl._select($day)\" \r\n                selected=\"$ctrl.selected\" />\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>";

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var module_1 = __webpack_require__(2);
	var calender_1 = __webpack_require__(3);
	var YearMonthComponent = (function () {
	    function YearMonthComponent($scope) {
	        this.$scope = $scope;
	        this.init();
	    }
	    YearMonthComponent.prototype._select = function (day) {
	        this.select({
	            $day: day
	        });
	    };
	    YearMonthComponent.prototype._selectMonth = function () {
	        console.log('selectMonth', this.selectmonth);
	        this.selectmonth({
	            $day: this.days[0]
	        });
	    };
	    YearMonthComponent.prototype.isIncludeMonth = function (day) {
	        return this.year === day.year && this.month === day.month;
	    };
	    YearMonthComponent.prototype.isSelected = function (day) {
	        if (!this.selected) {
	            return false;
	        }
	        return calender_1.Day.eq(day, this.selected);
	    };
	    YearMonthComponent.prototype.init = function () {
	        var _this = this;
	        this.weekLabels = calender_1.Week.WeekLabels;
	        var reflesh = function () {
	            var month = new calender_1.Month(_this.year, _this.month);
	            _this.days = month.days;
	            _this.weeks = month.weeks;
	        };
	        this.$scope.$watch(function () {
	            return _this.month + _this.year * 12;
	        }, reflesh);
	    };
	    YearMonthComponent = __decorate([
	        module_1.Component('yearMonth', {
	            template: __webpack_require__(14),
	            bindings: {
	                year: '=',
	                month: '=',
	                select: '&',
	                selectmonth: '&',
	                selected: '='
	            },
	        }), 
	        __metadata('design:paramtypes', [Object])
	    ], YearMonthComponent);
	    return YearMonthComponent;
	}());
	exports.YearMonthComponent = YearMonthComponent;


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div class=\"year-month\" ng-click=\"$ctrl._selectMonth()\">\r\n\r\n    <div class=\"year-month_month\">\r\n        {{$ctrl.month}}月\r\n    </div>\r\n\r\n    <div ng-repeat=\"week in $ctrl.weeks\">\r\n\r\n        <div ng-repeat=\"day in week.days\" class=\"year-month_week\" ng-class=\"{\r\n                'year-month_selected':($ctrl.isIncludeMonth(day) && $ctrl.isSelected(day)),\r\n                'year-month_otherMonth':!$ctrl.isIncludeMonth(day),\r\n                'year-month_today':day.isToday\r\n            }\">\r\n            <a ng-if=\"!day.otherMonth\" ng-click=\"$ctrl._select(day)\">\r\n            {{day.date}}\r\n            </a>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var module_1 = __webpack_require__(2);
	var MonthComponent = (function () {
	    function MonthComponent($scope) {
	        this.$scope = $scope;
	        this.init();
	    }
	    MonthComponent.prototype.init = function () {
	        var _this = this;
	        this.weekLabels = module_1.Week.WeekLabels;
	        var reflesh = function () {
	            var month = new module_1.Month(_this.year, _this.month);
	            _this.days = month.days;
	            _this.weeks = month.weeks;
	        };
	        this.$scope.$watch(function () {
	            return _this.month + _this.year * 100;
	        }, reflesh);
	    };
	    MonthComponent.prototype._select = function (day) {
	        if (this.select) {
	            this.select({
	                $day: day
	            });
	        }
	    };
	    MonthComponent.prototype.hasTask = function (day) {
	        return day.day === 2;
	    };
	    MonthComponent.prototype.isIncludeMonth = function (day) {
	        return this.year === day.year && this.month === day.month;
	    };
	    MonthComponent.prototype.isSelected = function (day) {
	        if (!this.selected) {
	            return false;
	        }
	        return module_1.Day.eq(day, this.selected);
	    };
	    MonthComponent = __decorate([
	        module_1.Component('month', {
	            template: __webpack_require__(16),
	            bindings: {
	                year: '=',
	                month: '=',
	                select: '&',
	                selected: '='
	            },
	        }), 
	        __metadata('design:paramtypes', [Object])
	    ], MonthComponent);
	    return MonthComponent;
	}());
	exports.MonthComponent = MonthComponent;


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<div class=\"month\">\r\n\r\n    <div class=\"month_month\">\r\n        {{$ctrl.month}}月 \r\n    </div>\r\n\r\n    <div ng-repeat=\"week in $ctrl.weeks\" class=\"month_week\">\r\n\r\n        <div ng-repeat=\"day in week.days\" class=\"month_day\" ng-class=\"{\r\n                'month_selected':($ctrl.isIncludeMonth(day) && $ctrl.isSelected(day)),\r\n                'month_otherMonth':!$ctrl.isIncludeMonth(day),\r\n                'month_today':day.isToday\r\n            }\">\r\n            <a ng-if=\"!day.otherMonth\" ng-click=\"$ctrl._select(day)\">\r\n            {{day.date}}\r\n            </a>\r\n            <div class=\"month_have\" ng-if=\"$ctrl.hasTask(day)\">\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>";

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjZjNWU3N2M3ZWI3ZGZiOWNkMmUiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NsaWVudC9hcHAudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NsaWVudC9zdGF0ZS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY2xpZW50L21vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9hcHAvc2hhcmUvY2FsZW5kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NsaWVudC9zdGF0ZS9tYWluLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NsaWVudC9zdGF0ZS9tYWluLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NsaWVudC9zdGF0ZS9tb250aC5jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL2FwcC9jbGllbnQvc3RhdGUvbW9udGguaHRtbCIsIndlYnBhY2s6Ly8vLi9hcHAvY2xpZW50L3N0YXRlL3dlZWsuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY2xpZW50L3N0YXRlL3dlZWsuaHRtbCIsIndlYnBhY2s6Ly8vLi9hcHAvY2xpZW50L2NvbXBvbmVudC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY2xpZW50L2NvbXBvbmVudC95ZWFyLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY2xpZW50L2NvbXBvbmVudC95ZWFyLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NsaWVudC9jb21wb25lbnQveWVhci1tb250aC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NsaWVudC9jb21wb25lbnQveWVhci1tb250aC5odG1sIiwid2VicGFjazovLy8uL2FwcC9jbGllbnQvY29tcG9uZW50L21vbnRoLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY2xpZW50L2NvbXBvbmVudC9tb250aC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7Ozs7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEOzs7Ozs7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDLFFBQVE7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDs7Ozs7OztBQ3ZDQSw4Uzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNEMsUUFBUTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDs7Ozs7OztBQ3pDQSw0TEFBMkwsWUFBWSxnTTs7Ozs7O0FDQXZNO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDLFFBQVE7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixRQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7Ozs7Ozs7QUN4REEsb05BQW1OLHNCQUFzQix5S0FBeUssMkhBQTJILGlHQUFpRyxVQUFVLDhUQUE4VCxNQUFNLDhLOzs7Ozs7QUNBNTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE0QyxRQUFRO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7Ozs7Ozs7QUN0Q0Esc0ZBQXFGLFlBQVksd2Q7Ozs7OztBQ0FqRztBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE0QyxRQUFRO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDs7Ozs7OztBQ2hFQSx5SUFBd0ksYUFBYSw0SkFBNEoseU9BQXlPLGtHQUFrRyxVQUFVLHdFOzs7Ozs7QUNBdG9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDLFFBQVE7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDs7Ozs7OztBQzdEQSw2RkFBNEYsYUFBYSw0S0FBNEssME5BQTBOLGtHQUFrRyxVQUFVLHFLIiwiZmlsZSI6Ii4vYnVpbGQvY2xpZW50L2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNjZjNWU3N2M3ZWI3ZGZiOWNkMmVcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIHN0YXRlID0gcmVxdWlyZSgnLi9zdGF0ZScpO1xyXG52YXIgY29tcG9uZW50ID0gcmVxdWlyZSgnLi9jb21wb25lbnQnKTtcclxuc3RhdGUubG9hZCgpO1xyXG5jb21wb25lbnQubG9hZCgpO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwL2NsaWVudC9hcHAudHNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIG1vZHVsZV8xID0gcmVxdWlyZSgnLi4vbW9kdWxlJyk7XHJcbnZhciBtYWluX2NvbnRyb2xsZXJfMSA9IHJlcXVpcmUoJy4vbWFpbi5jb250cm9sbGVyJyk7XHJcbnZhciBtb250aF9jb250cm9sbGVyXzEgPSByZXF1aXJlKCcuL21vbnRoLmNvbnRyb2xsZXInKTtcclxudmFyIHdlZWtfY29udHJvbGxlcl8xID0gcmVxdWlyZSgnLi93ZWVrLmNvbnRyb2xsZXInKTtcclxuZnVuY3Rpb24gbG9hZCgpIHtcclxuICAgIG1vZHVsZV8xLmxvYWRBc1N0YXRlKG1haW5fY29udHJvbGxlcl8xLk1haW5Db250cm9sbGVyKTtcclxuICAgIG1vZHVsZV8xLmxvYWRBc1N0YXRlKG1vbnRoX2NvbnRyb2xsZXJfMS5Nb250aENvbnRyb2xsZXIpO1xyXG4gICAgbW9kdWxlXzEubG9hZEFzU3RhdGUod2Vla19jb250cm9sbGVyXzEuV2Vla0NvbnRyb2xsZXIpO1xyXG4gICAgbW9kdWxlXzEuYW5ndWxhck1vZHVsZS5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvY2xpZW50L3N0YXRlL2luZGV4LnRzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3R5cGluZ3MvYW5ndWxhcmpzL2FuZ3VsYXIuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL2FuZ3VsYXItdWktcm91dGVyL2FuZ3VsYXItdWktcm91dGVyLmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwaW5ncy9ub2RlL25vZGUuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL2FuZ3VsYXJqcy9hbmd1bGFyLWFuaW1hdGUuZC50c1wiIC8+XHJcblwidXNlIHN0cmljdFwiO1xyXG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuX19leHBvcnQocmVxdWlyZSgnLi4vc2hhcmUvY2FsZW5kZXInKSk7XHJcbmV4cG9ydHMuYW5ndWxhck1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlcicsICduZ0FuaW1hdGUnXSk7XHJcbmZ1bmN0aW9uIENvbXBvbmVudChuYW1lLCBjb25maWcpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2xhenopIHtcclxuICAgICAgICBjb25maWcuY29udHJvbGxlciA9IGNsYXp6O1xyXG4gICAgICAgIGNsYXp6LiQkY29tcG9uZW50ID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICBjb25maWc6IGNvbmZpZ1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuQ29tcG9uZW50ID0gQ29tcG9uZW50O1xyXG5mdW5jdGlvbiBsb2FkQXNDb21wb25lbnQoY2xhenopIHtcclxuICAgIGlmICghY2xhenouJCRjb21wb25lbnQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJyZXF1aXJlIEBDb21wb25lbnQgXCIgKyBjbGF6ei5uYW1lKTtcclxuICAgIH1cclxuICAgIGV4cG9ydHMuYW5ndWxhck1vZHVsZS5jb21wb25lbnQoY2xhenouJCRjb21wb25lbnQubmFtZSwgY2xhenouJCRjb21wb25lbnQuY29uZmlnKTtcclxufVxyXG5leHBvcnRzLmxvYWRBc0NvbXBvbmVudCA9IGxvYWRBc0NvbXBvbmVudDtcclxuZnVuY3Rpb24gU3RhdGUobmFtZSwgY29uZmlnKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNsYXp6KSB7XHJcbiAgICAgICAgY29uZmlnLmNvbnRyb2xsZXIgPSBjbGF6ejtcclxuICAgICAgICBjb25maWcuY29udHJvbGxlckFzID0gJyRjdHJsJztcclxuICAgICAgICBjbGF6ei4kJHN0YXRlID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICBjb25maWc6IGNvbmZpZ1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuU3RhdGUgPSBTdGF0ZTtcclxuZnVuY3Rpb24gbG9hZEFzU3RhdGUoY2xhenopIHtcclxuICAgIGlmICghY2xhenouJCRzdGF0ZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInJlcXVpcmUgQFN0YXRlIFwiICsgY2xhenoubmFtZSk7XHJcbiAgICB9XHJcbiAgICBleHBvcnRzLmFuZ3VsYXJNb2R1bGUuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKGNsYXp6LiQkc3RhdGUubmFtZSwgY2xhenouJCRzdGF0ZS5jb25maWcpO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5sb2FkQXNTdGF0ZSA9IGxvYWRBc1N0YXRlO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwL2NsaWVudC9tb2R1bGUudHNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIERheSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBEYXkoKSB7XHJcbiAgICB9XHJcbiAgICBEYXkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnllYXIgKyBcIi9cIiArIHRoaXMubW9udGggKyBcIi9cIiArIHRoaXMuZGF0ZTtcclxuICAgIH07XHJcbiAgICBEYXkucHJvdG90eXBlLnRvRGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoIC0gMSwgdGhpcy5kYXRlKTtcclxuICAgIH07XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGF5LnByb3RvdHlwZSwgXCJkYXlMYWJlbFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBXZWVrLldlZWtMYWJlbHNbdGhpcy5kYXldO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERheS5wcm90b3R5cGUsIFwiaXNUb2RheVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXkuaXNUb2RheSh0aGlzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIERheS5lcVllYXIgPSBmdW5jdGlvbiAoZGF5MSwgZGF5Mikge1xyXG4gICAgICAgIHJldHVybiBkYXkxLnllYXIgPT09IGRheTIueWVhcjtcclxuICAgIH07XHJcbiAgICBEYXkuZXFNb250aCA9IGZ1bmN0aW9uIChkYXkxLCBkYXkyKSB7XHJcbiAgICAgICAgcmV0dXJuIGRheTEubW9udGggPT09IGRheTIubW9udGhcclxuICAgICAgICAgICAgJiYgZGF5MS55ZWFyID09PSBkYXkyLnllYXI7XHJcbiAgICB9O1xyXG4gICAgRGF5LmVxID0gZnVuY3Rpb24gKGRheTEsIGRheTIpIHtcclxuICAgICAgICByZXR1cm4gZGF5MS5kYXRlID09PSBkYXkyLmRhdGVcclxuICAgICAgICAgICAgJiYgZGF5MS5tb250aCA9PT0gZGF5Mi5tb250aFxyXG4gICAgICAgICAgICAmJiBkYXkxLnllYXIgPT09IGRheTIueWVhcjtcclxuICAgIH07XHJcbiAgICBEYXkuaXNUb2RheSA9IGZ1bmN0aW9uIChkYXkpIHtcclxuICAgICAgICByZXR1cm4gRGF5LmVxKGRheSwgRGF5LnRvZGF5KTtcclxuICAgIH07XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGF5LCBcInRvZGF5XCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIERheS5vZihuZXcgRGF0ZSgpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIERheS5jcmVhdGUgPSBmdW5jdGlvbiAoYXJncykge1xyXG4gICAgICAgIHJldHVybiBEYXkub2YobmV3IERhdGUoYXJncy55ZWFyLCBhcmdzLm1vbnRoIC0gMSwgYXJncy5kYXRlIHx8IDEpKTtcclxuICAgIH07XHJcbiAgICBEYXkub2YgPSBmdW5jdGlvbiAoZGF0ZSkge1xyXG4gICAgICAgIHZhciBkYXkgPSBuZXcgRGF5KCk7XHJcbiAgICAgICAgZGF5LnllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgZGF5Lm1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICBkYXkuZGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIGRheS5kYXkgPSBkYXRlLmdldERheSgpO1xyXG4gICAgICAgIHZhciBmaXJzdERheSA9IG5ldyBEYXRlKGRheS55ZWFyLCBkYXkubW9udGggLSAxLCAxKTtcclxuICAgICAgICBkYXkud2VlayA9IE1hdGguY2VpbCgoZGF5LmRhdGUgKyBmaXJzdERheS5nZXREYXkoKSkgLyA3KSAtIDE7XHJcbiAgICAgICAgcmV0dXJuIGRheTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRGF5O1xyXG59KCkpO1xyXG5leHBvcnRzLkRheSA9IERheTtcclxudmFyIFdlZWsgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gV2Vlayh5ZWFyLCBtb250aCwgd2Vlaykge1xyXG4gICAgICAgIHRoaXMueWVhciA9IHllYXI7XHJcbiAgICAgICAgdGhpcy5tb250aCA9IG1vbnRoO1xyXG4gICAgICAgIHRoaXMud2VlayA9IHdlZWs7XHJcbiAgICAgICAgdGhpcy5kYXlzID0gW107XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcbiAgICBXZWVrLnByb3RvdHlwZS5uZXh0V2Vla0ZpcnN0RGF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBuZXh0ID0gdGhpcy5kYXlzWzZdLnRvRGF0ZSgpO1xyXG4gICAgICAgIG5leHQuc2V0RGF0ZShuZXh0LmdldERhdGUoKSArIDEpO1xyXG4gICAgICAgIHJldHVybiBEYXkub2YobmV4dCk7XHJcbiAgICB9O1xyXG4gICAgV2Vlay5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGF5ID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoIC0gMSwgMSk7XHJcbiAgICAgICAgZGF5LnNldERhdGUoZGF5LmdldERhdGUoKSAtIGRheS5nZXREYXkoKSk7XHJcbiAgICAgICAgZGF5LnNldERhdGUoZGF5LmdldERhdGUoKSArIDcgKiAodGhpcy53ZWVrKSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kYXlzLnB1c2goRGF5Lm9mKGRheSkpO1xyXG4gICAgICAgICAgICBkYXkuc2V0RGF0ZShkYXkuZ2V0RGF0ZSgpICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFdlZWsuV2Vla0xhYmVscyA9ICfml6Ug5pyIIOeBqyDmsLQg5pyoIOmHkSDlnJ8nLnNwbGl0KCcgJyk7XHJcbiAgICByZXR1cm4gV2VlaztcclxufSgpKTtcclxuZXhwb3J0cy5XZWVrID0gV2VlaztcclxudmFyIE1vbnRoID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1vbnRoKHllYXIsIG1vbnRoKSB7XHJcbiAgICAgICAgdGhpcy55ZWFyID0geWVhcjtcclxuICAgICAgICB0aGlzLm1vbnRoID0gbW9udGg7XHJcbiAgICAgICAgdGhpcy53ZWVrcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGF5cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG4gICAgTW9udGgucHJvdG90eXBlLmlzSW5jbHVkZSA9IGZ1bmN0aW9uIChkYXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy55ZWFyID09IGRheS55ZWFyICYmIHRoaXMubW9udGggPT0gZGF5Lm1vbnRoO1xyXG4gICAgfTtcclxuICAgIE1vbnRoLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkYXkgPSBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGggLSAxLCAxKTtcclxuICAgICAgICB3aGlsZSAoKGRheS5nZXRNb250aCgpICsgMSkgJSAxMiA9PSB0aGlzLm1vbnRoICUgMTIpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXlzLnB1c2goRGF5Lm9mKGRheSkpO1xyXG4gICAgICAgICAgICBkYXkuc2V0RGF0ZShkYXkuZ2V0RGF0ZSgpICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB3ZWVrID0gbmV3IFdlZWsodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCBpKTtcclxuICAgICAgICAgICAgdGhpcy53ZWVrcy5wdXNoKHdlZWspO1xyXG4gICAgICAgICAgICB2YXIgbmV4dCA9IHdlZWsubmV4dFdlZWtGaXJzdERheSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tb250aCAlIDEyICE9IG5leHQubW9udGggJSAxMikge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE1vbnRoO1xyXG59KCkpO1xyXG5leHBvcnRzLk1vbnRoID0gTW9udGg7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvc2hhcmUvY2FsZW5kZXIudHNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxudmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEoaywgdik7XHJcbn07XHJcbnZhciBtb2R1bGVfMSA9IHJlcXVpcmUoJy4uL21vZHVsZScpO1xyXG52YXIgbW9kdWxlXzIgPSByZXF1aXJlKCcuLi9tb2R1bGUnKTtcclxudmFyIE1haW5Db250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRzdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuJHN0YXRlID0gJHN0YXRlO1xyXG4gICAgICAgIHRoaXMueWVhciA9IDIwMTY7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG1vZHVsZV8xLkRheS50b2RheTtcclxuICAgIH1cclxuICAgIE1haW5Db250cm9sbGVyLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbiAoZGF5KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF5KTtcclxuICAgICAgICAvLyB0aGlzLnNlbGVjdGVkID0gZGF5O1xyXG4gICAgICAgIHRoaXMuJHN0YXRlLmdvKCdtb250aCcsIHtcclxuICAgICAgICAgICAgeWVhcjogZGF5LnllYXIsXHJcbiAgICAgICAgICAgIG1vbnRoOiBkYXkubW9udGhcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBNYWluQ29udHJvbGxlci5wcm90b3R5cGUudG9kYXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy55ZWFyID0gbW9kdWxlXzEuRGF5LnRvZGF5LnllYXI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG1vZHVsZV8xLkRheS50b2RheTtcclxuICAgIH07XHJcbiAgICBNYWluQ29udHJvbGxlciA9IF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIG1vZHVsZV8yLlN0YXRlKCdtYWluJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvJyxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJ2h0bWwhLi9tYWluLmh0bWwnKVxyXG4gICAgICAgIH0pLCBcclxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246cGFyYW10eXBlcycsIFtPYmplY3RdKVxyXG4gICAgXSwgTWFpbkNvbnRyb2xsZXIpO1xyXG4gICAgcmV0dXJuIE1haW5Db250cm9sbGVyO1xyXG59KCkpO1xyXG5leHBvcnRzLk1haW5Db250cm9sbGVyID0gTWFpbkNvbnRyb2xsZXI7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvY2xpZW50L3N0YXRlL21haW4uY29udHJvbGxlci50c1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJzLW1haW5cXFwiPlxcclxcbiAgICBcXHJcXG4gICAgPCEtLTxkaXYgY2xhc3M9XFxcInMtbWFpbl9oZWFkXFxcIj5cXHJcXG5cXHJcXG4gICAgPC9kaXY+LS0+XFxyXFxuICAgIFxcclxcbiAgICA8eWVhciBcXHJcXG4gICAgICAgIG1vbnRoPVxcXCJtb250aFxcXCIgXFxyXFxuICAgICAgICB5ZWFyPVxcXCIkY3RybC55ZWFyXFxcIiBcXHJcXG4gICAgICAgIHNlbGVjdG1vbnRoPVxcXCIkY3RybC5zZWxlY3QoJGRheSlcXFwiXFxyXFxuICAgICAgICBzZWxlY3RlZD1cXFwiJGN0cmwuc2VsZWN0ZWRcXFwiXFxyXFxuICAgIC8+XFxyXFxuXFxyXFxuPC9kaXY+XCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaHRtbC1sb2FkZXIhLi9hcHAvY2xpZW50L3N0YXRlL21haW4uaHRtbFxuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG52YXIgX19tZXRhZGF0YSA9ICh0aGlzICYmIHRoaXMuX19tZXRhZGF0YSkgfHwgZnVuY3Rpb24gKGssIHYpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcclxufTtcclxudmFyIG1vZHVsZV8xID0gcmVxdWlyZSgnLi4vbW9kdWxlJyk7XHJcbnZhciBNb250aENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTW9udGhDb250cm9sbGVyKCRzdGF0ZVBhcmFtcywgJHN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy4kc3RhdGVQYXJhbXMgPSAkc3RhdGVQYXJhbXM7XHJcbiAgICAgICAgdGhpcy4kc3RhdGUgPSAkc3RhdGU7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcbiAgICBNb250aENvbnRyb2xsZXIucHJvdG90eXBlLnRvWWVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLiRzdGF0ZS5nbygnbWFpbicpO1xyXG4gICAgfTtcclxuICAgIE1vbnRoQ29udHJvbGxlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnllYXIgPSBwYXJzZUludCh0aGlzLiRzdGF0ZVBhcmFtcy55ZWFyKTtcclxuICAgICAgICB0aGlzLm1vbnRoID0gcGFyc2VJbnQodGhpcy4kc3RhdGVQYXJhbXMubW9udGgpO1xyXG4gICAgfTtcclxuICAgIE1vbnRoQ29udHJvbGxlci5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24gKGRheSkge1xyXG4gICAgICAgIC8vIHRoaXMuc2VsZWN0ZWQgPSBkYXk7XHJcbiAgICAgICAgdGhpcy4kc3RhdGUuZ28oJ3dlZWsnLCB7XHJcbiAgICAgICAgICAgIHllYXI6IGRheS55ZWFyLFxyXG4gICAgICAgICAgICBtb250aDogZGF5Lm1vbnRoLFxyXG4gICAgICAgICAgICBkYXRlOiBkYXkuZGF0ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIE1vbnRoQ29udHJvbGxlciA9IF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIG1vZHVsZV8xLlN0YXRlKCdtb250aCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL21vbnRoLzp5ZWFyLzptb250aCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCdodG1sIS4vbW9udGguaHRtbCcpXHJcbiAgICAgICAgfSksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgW09iamVjdCwgT2JqZWN0XSlcclxuICAgIF0sIE1vbnRoQ29udHJvbGxlcik7XHJcbiAgICByZXR1cm4gTW9udGhDb250cm9sbGVyO1xyXG59KCkpO1xyXG5leHBvcnRzLk1vbnRoQ29udHJvbGxlciA9IE1vbnRoQ29udHJvbGxlcjtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9jbGllbnQvc3RhdGUvbW9udGguY29udHJvbGxlci50c1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJzLW1vbnRoXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicy1tb250aF9oZWFkXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwudG9ZZWFyKClcXFwiPlxcclxcbiAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLWxlZnRcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj48L2k+XFxyXFxuICAgICAgICAge3skY3RybC55ZWFyfX1cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxtb250aCBcXHJcXG4gICAgICAgeWVhcj1cXFwiJGN0cmwueWVhclxcXCJcXHJcXG4gICAgICAgbW9udGg9XFxcIiRjdHJsLm1vbnRoXFxcIiBcXHJcXG4gICAgICAgc2VsZWN0ZWQ9XFxcIiRjdHJsLnNlbGVjdGVkXFxcIlxcclxcbiAgICAgICBzZWxlY3Q9XFxcIiRjdHJsLnNlbGVjdCgkZGF5KVxcXCJcXHJcXG4gICAgLz5cXHJcXG48L2Rpdj5cIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9odG1sLWxvYWRlciEuL2FwcC9jbGllbnQvc3RhdGUvbW9udGguaHRtbFxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG52YXIgX19tZXRhZGF0YSA9ICh0aGlzICYmIHRoaXMuX19tZXRhZGF0YSkgfHwgZnVuY3Rpb24gKGssIHYpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcclxufTtcclxudmFyIG1vZHVsZV8xID0gcmVxdWlyZSgnLi4vbW9kdWxlJyk7XHJcbnZhciBXZWVrQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBXZWVrQ29udHJvbGxlcigkc3RhdGVQYXJhbXMsICRzdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuJHN0YXRlUGFyYW1zID0gJHN0YXRlUGFyYW1zO1xyXG4gICAgICAgIHRoaXMuJHN0YXRlID0gJHN0YXRlO1xyXG4gICAgICAgIHRoaXMuaG91cnMgPSBbXTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuICAgIFdlZWtDb250cm9sbGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmhvdXJzLnB1c2goaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMueWVhciA9IHBhcnNlSW50KHRoaXMuJHN0YXRlUGFyYW1zLnllYXIpO1xyXG4gICAgICAgIHRoaXMubW9udGggPSBwYXJzZUludCh0aGlzLiRzdGF0ZVBhcmFtcy5tb250aCk7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gcGFyc2VJbnQodGhpcy4kc3RhdGVQYXJhbXMuZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG1vZHVsZV8xLkRheS5jcmVhdGUoe1xyXG4gICAgICAgICAgICB5ZWFyOiB0aGlzLnllYXIsXHJcbiAgICAgICAgICAgIG1vbnRoOiB0aGlzLm1vbnRoLFxyXG4gICAgICAgICAgICBkYXRlOiB0aGlzLmRhdGVcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLndlZWsgPSBuZXcgbW9kdWxlXzEuV2Vlayh0aGlzLnllYXIsIHRoaXMubW9udGgsIHRoaXMuc2VsZWN0ZWQud2Vlayk7XHJcbiAgICB9O1xyXG4gICAgV2Vla0NvbnRyb2xsZXIucHJvdG90eXBlLnRvTW9udGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy4kc3RhdGUuZ28oJ21vbnRoJywge1xyXG4gICAgICAgICAgICB5ZWFyOiB0aGlzLnNlbGVjdGVkLnllYXIsXHJcbiAgICAgICAgICAgIG1vbnRoOiB0aGlzLnNlbGVjdGVkLm1vbnRoXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgV2Vla0NvbnRyb2xsZXIucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uIChkYXkpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gZGF5O1xyXG4gICAgfTtcclxuICAgIFdlZWtDb250cm9sbGVyLnByb3RvdHlwZS5pc1NlbGVjdGVkID0gZnVuY3Rpb24gKGRheSkge1xyXG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtb2R1bGVfMS5EYXkuZXEoZGF5LCB0aGlzLnNlbGVjdGVkKTtcclxuICAgIH07XHJcbiAgICBXZWVrQ29udHJvbGxlciA9IF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIG1vZHVsZV8xLlN0YXRlKCd3ZWVrJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvd2Vlay86eWVhci86bW9udGgvOmRhdGUnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnaHRtbCEuL3dlZWsuaHRtbCcpXHJcbiAgICAgICAgfSksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgW09iamVjdCwgT2JqZWN0XSlcclxuICAgIF0sIFdlZWtDb250cm9sbGVyKTtcclxuICAgIHJldHVybiBXZWVrQ29udHJvbGxlcjtcclxufSgpKTtcclxuZXhwb3J0cy5XZWVrQ29udHJvbGxlciA9IFdlZWtDb250cm9sbGVyO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwL2NsaWVudC9zdGF0ZS93ZWVrLmNvbnRyb2xsZXIudHNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwicy13ZWVrXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicy13ZWVrX2hlYWRcXFwiPlxcclxcbiAgICAgICAgPHNwYW4gbmctY2xpY2s9XFxcIiRjdHJsLnRvTW9udGgoKVxcXCI+XFxyXFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLWxlZnRcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj48L2k+XFxyXFxuICAgICAgICAgICAge3skY3RybC5zZWxlY3RlZC5tb250aH195pyIICAgICAgICBcXHJcXG4gICAgICAgICA8L3NwYW4+XFxyXFxuICAgIDwvZGl2PiAgICBcXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicy13ZWVrX3dlZWtcXFwiPlxcclxcbiAgICAgICAgPGRpdiBuZy1yZXBlYXQ9XFxcImRheSBpbiAkY3RybC53ZWVrLmRheXNcXFwiIGNsYXNzPVxcXCJzLXdlZWtfZGF5XFxcIiBuZy1jbGFzcz1cXFwie1xcclxcbiAgICAgICAgICAgICAgICAncy13ZWVrX3NlbGVjdGVkJzokY3RybC5pc1NlbGVjdGVkKGRheSksXFxyXFxuICAgICAgICAgICAgICAgICdzLXdlZWtfdG9kYXknOmRheS5pc1RvZGF5XFxyXFxuICAgICAgICAgICAgfVxcXCI+XFxyXFxuICAgICAgICAgICAgPGEgbmctaWY9XFxcIiFkYXkub3RoZXJNb250aFxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLnNlbGVjdChkYXkpXFxcIj5cXHJcXG4gICAgICAgICAgICB7e2RheS5kYXRlfX1cXHJcXG4gICAgICAgICAgICA8L2E+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibW9udGhfaGF2ZVxcXCIgbmctaWY9XFxcIiRjdHJsLmhhc1Rhc2soZGF5KVxcXCI+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInMtd2Vla19ob3Vyc1xcXCI+XFxyXFxuICAgICAgICA8ZGl2IG5nLXJlcGVhdD1cXFwiaG91ciBpbiAkY3RybC5ob3Vyc1xcXCIgY2xhc3M9XFxcInMtd2Vla19ob3VyXFxcIj5cXHJcXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwicy13ZWVrX29jbG9ja1xcXCI+XFxyXFxuICAgICAgICAgICAge3tob3VyfX06MDBcXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInMtd2Vla19vY2xvY2tMaW5lXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvc3Bhbj5cXHJcXG4gICAgICAgICAgIFxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlxcclxcblxcclxcblwiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2h0bWwtbG9hZGVyIS4vYXBwL2NsaWVudC9zdGF0ZS93ZWVrLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIG1vZHVsZV8xID0gcmVxdWlyZShcIi4uL21vZHVsZVwiKTtcclxudmFyIHllYXJfY29tcG9uZW50X3RzXzEgPSByZXF1aXJlKFwiLi95ZWFyLmNvbXBvbmVudC50c1wiKTtcclxudmFyIHllYXJfbW9udGhfY29tcG9uZW50X3RzXzEgPSByZXF1aXJlKFwiLi95ZWFyLW1vbnRoLmNvbXBvbmVudC50c1wiKTtcclxudmFyIG1vbnRoX2NvbXBvbmVudF90c18xID0gcmVxdWlyZSgnLi9tb250aC5jb21wb25lbnQudHMnKTtcclxuZnVuY3Rpb24gbG9hZCgpIHtcclxuICAgIG1vZHVsZV8xLmxvYWRBc0NvbXBvbmVudCh5ZWFyX21vbnRoX2NvbXBvbmVudF90c18xLlllYXJNb250aENvbXBvbmVudCk7XHJcbiAgICBtb2R1bGVfMS5sb2FkQXNDb21wb25lbnQoeWVhcl9jb21wb25lbnRfdHNfMS5ZZWFyQ29tcG9uZW50KTtcclxuICAgIG1vZHVsZV8xLmxvYWRBc0NvbXBvbmVudChtb250aF9jb21wb25lbnRfdHNfMS5Nb250aENvbXBvbmVudCk7XHJcbn1cclxuZXhwb3J0cy5sb2FkID0gbG9hZDtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9jbGllbnQvY29tcG9uZW50L2luZGV4LnRzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG52YXIgX19tZXRhZGF0YSA9ICh0aGlzICYmIHRoaXMuX19tZXRhZGF0YSkgfHwgZnVuY3Rpb24gKGssIHYpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcclxufTtcclxudmFyIG1vZHVsZV8xID0gcmVxdWlyZSgnLi4vbW9kdWxlJyk7XHJcbnZhciBZZWFyQ29tcG9uZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFllYXJDb21wb25lbnQoKSB7XHJcbiAgICB9XHJcbiAgICBZZWFyQ29tcG9uZW50LnByb3RvdHlwZS5fc2VsZWN0ID0gZnVuY3Rpb24gKGRheSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0KHtcclxuICAgICAgICAgICAgJGRheTogZGF5XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgWWVhckNvbXBvbmVudC5wcm90b3R5cGUuX3NlbGVjdE1vbnRoID0gZnVuY3Rpb24gKCRkYXkpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdG1vbnRoKHtcclxuICAgICAgICAgICAgJGRheTogJGRheVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFllYXJDb21wb25lbnQgPSBfX2RlY29yYXRlKFtcclxuICAgICAgICBtb2R1bGVfMS5Db21wb25lbnQoJ3llYXInLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCdodG1sIS4veWVhci5odG1sJyksXHJcbiAgICAgICAgICAgIGJpbmRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICB5ZWFyOiAnPScsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogJz0nLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0OiAnJicsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rtb250aDogJyYnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSwgXHJcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbXSlcclxuICAgIF0sIFllYXJDb21wb25lbnQpO1xyXG4gICAgcmV0dXJuIFllYXJDb21wb25lbnQ7XHJcbn0oKSk7XHJcbmV4cG9ydHMuWWVhckNvbXBvbmVudCA9IFllYXJDb21wb25lbnQ7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvY2xpZW50L2NvbXBvbmVudC95ZWFyLmNvbXBvbmVudC50c1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwieWVhclxcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInllYXJfeWVhclxcXCI+XFxyXFxuICAgICAgICB7eyRjdHJsLnllYXJ9feW5tFxcclxcbiAgICA8L2Rpdj5cXHJcXG5cXHJcXG4gICAgPGRpdiBuZy1yZXBlYXQ9XFxcIm0gaW4gW1sxLDIsM10sWzQsNSw2XSxbNyw4LDldLFsxMCwxMSwxMl1dXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInllYXJfbW9udGhcXFwiIG5nLXJlcGVhdD1cXFwibW9udGggaW4gbVxcXCI+XFxyXFxuICAgICAgICAgICAgPHllYXItbW9udGggXFxyXFxuICAgICAgICAgICAgICAgIG1vbnRoPVxcXCJtb250aFxcXCIgXFxyXFxuICAgICAgICAgICAgICAgIHllYXI9XFxcIiRjdHJsLnllYXJcXFwiIFxcclxcbiAgICAgICAgICAgICAgICBzZWxlY3Rtb250aD1cXFwiJGN0cmwuX3NlbGVjdE1vbnRoKCRkYXkpXFxcIlxcclxcbiAgICAgICAgICAgICAgICBzZWxlY3Q9XFxcIiRjdHJsLl9zZWxlY3QoJGRheSlcXFwiIFxcclxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZD1cXFwiJGN0cmwuc2VsZWN0ZWRcXFwiIC8+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG5cXHJcXG4gICAgPC9kaXY+XFxyXFxuXFxyXFxuPC9kaXY+XCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaHRtbC1sb2FkZXIhLi9hcHAvY2xpZW50L2NvbXBvbmVudC95ZWFyLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbnZhciBfX21ldGFkYXRhID0gKHRoaXMgJiYgdGhpcy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xyXG59O1xyXG52YXIgbW9kdWxlXzEgPSByZXF1aXJlKCcuLi9tb2R1bGUnKTtcclxudmFyIGNhbGVuZGVyXzEgPSByZXF1aXJlKCcuLi8uLi9zaGFyZS9jYWxlbmRlcicpO1xyXG52YXIgWWVhck1vbnRoQ29tcG9uZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFllYXJNb250aENvbXBvbmVudCgkc2NvcGUpIHtcclxuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuICAgIFllYXJNb250aENvbXBvbmVudC5wcm90b3R5cGUuX3NlbGVjdCA9IGZ1bmN0aW9uIChkYXkpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdCh7XHJcbiAgICAgICAgICAgICRkYXk6IGRheVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFllYXJNb250aENvbXBvbmVudC5wcm90b3R5cGUuX3NlbGVjdE1vbnRoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzZWxlY3RNb250aCcsIHRoaXMuc2VsZWN0bW9udGgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0bW9udGgoe1xyXG4gICAgICAgICAgICAkZGF5OiB0aGlzLmRheXNbMF1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBZZWFyTW9udGhDb21wb25lbnQucHJvdG90eXBlLmlzSW5jbHVkZU1vbnRoID0gZnVuY3Rpb24gKGRheSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnllYXIgPT09IGRheS55ZWFyICYmIHRoaXMubW9udGggPT09IGRheS5tb250aDtcclxuICAgIH07XHJcbiAgICBZZWFyTW9udGhDb21wb25lbnQucHJvdG90eXBlLmlzU2VsZWN0ZWQgPSBmdW5jdGlvbiAoZGF5KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhbGVuZGVyXzEuRGF5LmVxKGRheSwgdGhpcy5zZWxlY3RlZCk7XHJcbiAgICB9O1xyXG4gICAgWWVhck1vbnRoQ29tcG9uZW50LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy53ZWVrTGFiZWxzID0gY2FsZW5kZXJfMS5XZWVrLldlZWtMYWJlbHM7XHJcbiAgICAgICAgdmFyIHJlZmxlc2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb250aCA9IG5ldyBjYWxlbmRlcl8xLk1vbnRoKF90aGlzLnllYXIsIF90aGlzLm1vbnRoKTtcclxuICAgICAgICAgICAgX3RoaXMuZGF5cyA9IG1vbnRoLmRheXM7XHJcbiAgICAgICAgICAgIF90aGlzLndlZWtzID0gbW9udGgud2Vla3M7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXMubW9udGggKyBfdGhpcy55ZWFyICogMTI7XHJcbiAgICAgICAgfSwgcmVmbGVzaCk7XHJcbiAgICB9O1xyXG4gICAgWWVhck1vbnRoQ29tcG9uZW50ID0gX19kZWNvcmF0ZShbXHJcbiAgICAgICAgbW9kdWxlXzEuQ29tcG9uZW50KCd5ZWFyTW9udGgnLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCdodG1sIS4veWVhci1tb250aC5odG1sJyksXHJcbiAgICAgICAgICAgIGJpbmRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICB5ZWFyOiAnPScsXHJcbiAgICAgICAgICAgICAgICBtb250aDogJz0nLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0OiAnJicsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rtb250aDogJyYnLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6ICc9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pLCBcclxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246cGFyYW10eXBlcycsIFtPYmplY3RdKVxyXG4gICAgXSwgWWVhck1vbnRoQ29tcG9uZW50KTtcclxuICAgIHJldHVybiBZZWFyTW9udGhDb21wb25lbnQ7XHJcbn0oKSk7XHJcbmV4cG9ydHMuWWVhck1vbnRoQ29tcG9uZW50ID0gWWVhck1vbnRoQ29tcG9uZW50O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwL2NsaWVudC9jb21wb25lbnQveWVhci1tb250aC5jb21wb25lbnQudHNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcInllYXItbW9udGhcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5fc2VsZWN0TW9udGgoKVxcXCI+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInllYXItbW9udGhfbW9udGhcXFwiPlxcclxcbiAgICAgICAge3skY3RybC5tb250aH195pyIXFxyXFxuICAgIDwvZGl2PlxcclxcblxcclxcbiAgICA8ZGl2IG5nLXJlcGVhdD1cXFwid2VlayBpbiAkY3RybC53ZWVrc1xcXCI+XFxyXFxuXFxyXFxuICAgICAgICA8ZGl2IG5nLXJlcGVhdD1cXFwiZGF5IGluIHdlZWsuZGF5c1xcXCIgY2xhc3M9XFxcInllYXItbW9udGhfd2Vla1xcXCIgbmctY2xhc3M9XFxcIntcXHJcXG4gICAgICAgICAgICAgICAgJ3llYXItbW9udGhfc2VsZWN0ZWQnOigkY3RybC5pc0luY2x1ZGVNb250aChkYXkpICYmICRjdHJsLmlzU2VsZWN0ZWQoZGF5KSksXFxyXFxuICAgICAgICAgICAgICAgICd5ZWFyLW1vbnRoX290aGVyTW9udGgnOiEkY3RybC5pc0luY2x1ZGVNb250aChkYXkpLFxcclxcbiAgICAgICAgICAgICAgICAneWVhci1tb250aF90b2RheSc6ZGF5LmlzVG9kYXlcXHJcXG4gICAgICAgICAgICB9XFxcIj5cXHJcXG4gICAgICAgICAgICA8YSBuZy1pZj1cXFwiIWRheS5vdGhlck1vbnRoXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuX3NlbGVjdChkYXkpXFxcIj5cXHJcXG4gICAgICAgICAgICB7e2RheS5kYXRlfX1cXHJcXG4gICAgICAgICAgICA8L2E+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG5cXHJcXG4gICAgPC9kaXY+XFxyXFxuXFxyXFxuPC9kaXY+XCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaHRtbC1sb2FkZXIhLi9hcHAvY2xpZW50L2NvbXBvbmVudC95ZWFyLW1vbnRoLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbnZhciBfX21ldGFkYXRhID0gKHRoaXMgJiYgdGhpcy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xyXG59O1xyXG52YXIgbW9kdWxlXzEgPSByZXF1aXJlKCcuLi9tb2R1bGUnKTtcclxudmFyIE1vbnRoQ29tcG9uZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1vbnRoQ29tcG9uZW50KCRzY29wZSkge1xyXG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG4gICAgTW9udGhDb21wb25lbnQucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLndlZWtMYWJlbHMgPSBtb2R1bGVfMS5XZWVrLldlZWtMYWJlbHM7XHJcbiAgICAgICAgdmFyIHJlZmxlc2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb250aCA9IG5ldyBtb2R1bGVfMS5Nb250aChfdGhpcy55ZWFyLCBfdGhpcy5tb250aCk7XHJcbiAgICAgICAgICAgIF90aGlzLmRheXMgPSBtb250aC5kYXlzO1xyXG4gICAgICAgICAgICBfdGhpcy53ZWVrcyA9IG1vbnRoLndlZWtzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLm1vbnRoICsgX3RoaXMueWVhciAqIDEwMDtcclxuICAgICAgICB9LCByZWZsZXNoKTtcclxuICAgIH07XHJcbiAgICBNb250aENvbXBvbmVudC5wcm90b3R5cGUuX3NlbGVjdCA9IGZ1bmN0aW9uIChkYXkpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Qoe1xyXG4gICAgICAgICAgICAgICAgJGRheTogZGF5XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBNb250aENvbXBvbmVudC5wcm90b3R5cGUuaGFzVGFzayA9IGZ1bmN0aW9uIChkYXkpIHtcclxuICAgICAgICByZXR1cm4gZGF5LmRheSA9PT0gMjtcclxuICAgIH07XHJcbiAgICBNb250aENvbXBvbmVudC5wcm90b3R5cGUuaXNJbmNsdWRlTW9udGggPSBmdW5jdGlvbiAoZGF5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueWVhciA9PT0gZGF5LnllYXIgJiYgdGhpcy5tb250aCA9PT0gZGF5Lm1vbnRoO1xyXG4gICAgfTtcclxuICAgIE1vbnRoQ29tcG9uZW50LnByb3RvdHlwZS5pc1NlbGVjdGVkID0gZnVuY3Rpb24gKGRheSkge1xyXG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtb2R1bGVfMS5EYXkuZXEoZGF5LCB0aGlzLnNlbGVjdGVkKTtcclxuICAgIH07XHJcbiAgICBNb250aENvbXBvbmVudCA9IF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIG1vZHVsZV8xLkNvbXBvbmVudCgnbW9udGgnLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCdodG1sIS4vbW9udGguaHRtbCcpLFxyXG4gICAgICAgICAgICBiaW5kaW5nczoge1xyXG4gICAgICAgICAgICAgICAgeWVhcjogJz0nLFxyXG4gICAgICAgICAgICAgICAgbW9udGg6ICc9JyxcclxuICAgICAgICAgICAgICAgIHNlbGVjdDogJyYnLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6ICc9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pLCBcclxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246cGFyYW10eXBlcycsIFtPYmplY3RdKVxyXG4gICAgXSwgTW9udGhDb21wb25lbnQpO1xyXG4gICAgcmV0dXJuIE1vbnRoQ29tcG9uZW50O1xyXG59KCkpO1xyXG5leHBvcnRzLk1vbnRoQ29tcG9uZW50ID0gTW9udGhDb21wb25lbnQ7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvY2xpZW50L2NvbXBvbmVudC9tb250aC5jb21wb25lbnQudHNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcIm1vbnRoXFxcIj5cXHJcXG5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwibW9udGhfbW9udGhcXFwiPlxcclxcbiAgICAgICAge3skY3RybC5tb250aH195pyIIFxcclxcbiAgICA8L2Rpdj5cXHJcXG5cXHJcXG4gICAgPGRpdiBuZy1yZXBlYXQ9XFxcIndlZWsgaW4gJGN0cmwud2Vla3NcXFwiIGNsYXNzPVxcXCJtb250aF93ZWVrXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgIDxkaXYgbmctcmVwZWF0PVxcXCJkYXkgaW4gd2Vlay5kYXlzXFxcIiBjbGFzcz1cXFwibW9udGhfZGF5XFxcIiBuZy1jbGFzcz1cXFwie1xcclxcbiAgICAgICAgICAgICAgICAnbW9udGhfc2VsZWN0ZWQnOigkY3RybC5pc0luY2x1ZGVNb250aChkYXkpICYmICRjdHJsLmlzU2VsZWN0ZWQoZGF5KSksXFxyXFxuICAgICAgICAgICAgICAgICdtb250aF9vdGhlck1vbnRoJzohJGN0cmwuaXNJbmNsdWRlTW9udGgoZGF5KSxcXHJcXG4gICAgICAgICAgICAgICAgJ21vbnRoX3RvZGF5JzpkYXkuaXNUb2RheVxcclxcbiAgICAgICAgICAgIH1cXFwiPlxcclxcbiAgICAgICAgICAgIDxhIG5nLWlmPVxcXCIhZGF5Lm90aGVyTW9udGhcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5fc2VsZWN0KGRheSlcXFwiPlxcclxcbiAgICAgICAgICAgIHt7ZGF5LmRhdGV9fVxcclxcbiAgICAgICAgICAgIDwvYT5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtb250aF9oYXZlXFxcIiBuZy1pZj1cXFwiJGN0cmwuaGFzVGFzayhkYXkpXFxcIj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcblxcclxcbiAgICA8L2Rpdj5cXHJcXG5cXHJcXG48L2Rpdj5cIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9odG1sLWxvYWRlciEuL2FwcC9jbGllbnQvY29tcG9uZW50L21vbnRoLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==