export interface SelectDay {
    (day: { $day: Day }): void;
}

export class Day {

    year: number;
    month: number;
    date: number;
    day: number;

    toString() {
        return `${this.year}/${this.month}/${this.date}`;
    }

    toDate() {
        return new Date(this.year, this.month - 1, this.date);
    }

    get dayLabel() {
        return Week.WeekLabels[this.day];
    }

    get isToday() {
        return Day.isToday(this);
    }

    static eqYear(day1: Day, day2: Day) {
        return day1.year === day2.year;
    }

    static eqMonth(day1: Day, day2: Day) {
        return day1.month === day2.month
            && day1.year === day2.year;
    }

    static eq(day1: Day, day2: Day) {
        return day1.date === day2.date
            && day1.month === day2.month
            && day1.year === day2.year;
    }

    static isToday(day: Day) {
        return Day.eq(day, Day.today);
    }

    static get today() {
        return Day.of(new Date());
    }

    static create(args: {
        year: number,
        month: number,
        date?: number
    }) {
        return Day.of(new Date(args.year, args.month - 1, args.date || 1));
    }

    static of(date: Date) {
        let day = new Day();
        day.year = date.getFullYear();
        day.month = date.getMonth() + 1;
        day.date = date.getDate();
        day.day = date.getDay();
        return day;
    }
}

export class Week {

    days: Day[] = [];

    static WeekLabels = '日 月 火 水 木 金 土'.split(' ');

    constructor(
        public year,
        public month,
        public week
    ) {
        this.init();
    }

    nextWeekFirstDay() {
        let next = this.days[6].toDate();
        next.setDate(next.getDate() + 1);
        return Day.of(next);
    }

    init() {
        let day = new Date(this.year, this.month, 1);
        day.setDate(day.getDate() - day.getDay());
        day.setDate(day.getDate() + 7 * (this.week));
        for (let i = 0; i < 7; i++) {
            this.days.push(Day.of(day));
            day.setDate(day.getDate() + 1);
        }

    }
}

export class Month {

    weeks: Week[] = [];
    days: Day[] = [];

    constructor(
        public year: number,
        public month: number
    ) {
        this.init();
    }

    isInclude(day: Day) {
        return this.year == day.year && this.month == day.month;
    }

    init() {
        let day = new Date(this.year, this.month, 1);

        while (day.getMonth() == this.month) {
            this.days.push(Day.of(day));
            day.setDate(day.getDate() + 1);
        }

        for (let i = 0; ; i++) {
            let week = new Week(this.year, this.month, i);
            this.weeks.push(week);
            let next = week.nextWeekFirstDay();
            if (this.month + 1 != next.month) {
                break;
            }
        }

    }
}