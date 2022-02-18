var _ = require('lodash');
import { DateTime } from 'luxon';
import * as _themes from '../themes/variances/index'

export var calendar = {
    data: function() {
        return {
            holidays_arr: [],
            current_year: DateTime.now().year,
            week_dates: [],
            week_offset: 0,
            schedule_variances: [],
            week_events: [],
        }
    },
    created() {
        this.holidays(this.current_year);
    },
    methods: {
        weekdays: function (type, week) {
            var dt = DateTime.now()
            if (
                (dt.weekday == 6 || dt.weekday == 7) &&
                (type == "Sat - Fri" || type == "Sun - Sat")
            ){ week += 7}
            dt = dt.plus({days: week});
            switch(type){
                case "Sat - Fri":
                    return [dt.startOf('week').minus({day: 2}), 7];
                case "Sun - Sat":
                    return [dt.startOf('week').minus({day: 1}), 7];
                case "Mon - Sun":
                    return [dt.startOf('week'), 7];
                case "Mon - Fri":
                    return [dt.startOf('week'), 5];
                case "Mon - Thu":
                    return [dt.startOf('week'), 4];
                case "2 Week":
                    return [dt.startOf('week').minus({day: 1}), 14]; 
                default:
                    return [dt.startOf('week').minus({day: 2}), 7];
            }
        },
        getTheme: function(type) {
            return _themes[this.variance_theme][type.toUpperCase()]
        },
        getSchedule: function(date) {
            var schedule = [];
            var next = 1;
            var current = 2;
            if (date.weekNumber % 2 == 0){
                current = 2;
                next = 1;
            }
            else {
                current = 1;
                next = 2;
            }
            switch(this.calendar_type){
                case "Sat - Fri":
                    schedule.push(_.last(this.calendar_schedule[current]));
                    schedule.push(_.slice(this.calendar_schedule[next],0,6));
                    break;
                case "Sun - Sat":
                    schedule.push(this.calendar_schedule[current]);
                    break;
                case "Mon - Sun":
                    schedule.push(_.slice(this.calendar_schedule[current],1,7));
                    break;
                case "Mon - Fri":
                    schedule.push(_.slice(this.calendar_schedule[current],1,6));
                    break;
                case "Mon - Thu":
                    schedule.push(_.slice(this.calendar_schedule[current],1,5));
                    break;
                default:
                    schedule.push(_.last(this.calendar_schedule[current]));
                    schedule.push(_.slice(this.calendar_schedule[next],0,6));
                    break;
            }

            schedule = _.flatten(schedule)
            schedule.forEach((event,index) => {
                event['date'] = this.week_dates[index]
            })
            return _.remove(schedule, function(event) {
                return event.type != null
            })
        },
        condenseEvents: function(passed_events) {
            let combined = new Array()
            _.forEach(passed_events, function(events) {
                if(events){
                    let index = combined.length
                    combined.push(
                        {
                            'type': events[0].type,
                            'date': events[0].date,
                            'start': events[0].start, 
                            'end': events[0].end,
                            'duration': 1.5
                        }
                    );
                    for (var i = 1; i < events.length; i++){
                        if ((combined[index].end >= events[i].start) && (combined[index].type == events[i].type)){
                            combined[index].end = events[i].end;
                        }
                        if ((combined[index].end < events[i].start) || (combined[index].type != events[i].type)){
                            combined.push(
                                {
                                    'type': events[i].type,
                                    'date': events[i].date,
                                    'start': events[i].start, 
                                    'end': events[i].end,
                                    'duration': 1.5
                                }
                            );
                            index++;
                        }
                    }
                }
            })
            return combined;
        },
        splitVariances: function(passed_events) {
            if (passed_events.length > 2){
                let events = new Array()
                _.map(passed_events, event => {
                    events.push(
                        {
                            'type': event.type,
                            'date': event.date,
                            'start': parseFloat(event.start.replaceAll(':','.')),
                            'end': parseFloat(event.end.replaceAll(':','.')),
                            'duration': event.duration
                        }
                    )
                })
                let standard = [_.find(events, {'type':'STANDARD'})]
                if (standard){
                    let last = _.findLast(standard)
                    let new_events = _.filter(events, event => {
                        return (_.inRange(event.start, last.start, last.end)) && (event.type != last.type)
                    })
                    
                    new_events = _.sortBy(new_events, ['start', 'end'])
                    _.forEach(new_events, event => {
                        if (event.start == last.start){
                            last.start = event.end;
                            console.log(last)
                        }
                        else if ((event.start < last.end) && (event.end >= last.end)){
                            last.end = event.start;
                            console.log(last)
                        }
                        else {
                            
                        }
                    })
                    
                    // console.log(new_events)
                }
            }
            
            return passed_events
        },
        getEvents: function(passed_events, date) {
            var today = passed_events
            today = _.sortBy(today, ['start', 'end'])

            let grouped_events = _.groupBy(today,'type')
            if(!_.isEmpty(grouped_events)){
                let condensed_events = this.condenseEvents(grouped_events)
                today = this.splitVariances(condensed_events)
            }
            
            let standard = _.find(today, {'type':'STANDARD'})
            if(standard){
                // Standard Schedule Events get overridden when variance matches same times
                if(_.filter(today, {'start': standard.start, 'end': standard.end}).length > 1){
                    today = _.reject(today, {'type':'STANDARD'})
                }
                // Standard Schedule Events get removed when Holiday is paid
                let holiday = _.get(this.holidays_arr, date)
                if(_.get(this.holidays_arr, date)) {
                    if(holiday.paid){
                        today = _.reject(today, {'type':'STANDARD'})
                    }
                }
            }

            today = _.sortBy(today, ['start', 'end'])
            this.week_events.push(today)
            return today;
        },
        setYear() {
            this.current_year = this.week_dates[0].substring(this.week_dates[0].length - 4, this.week_dates[0].length)
        },
        getHoliday: function(date) {
            date = date.substring(0, date.length - 5)
            return _.get(this.holidays_arr, date)
        },
        holidays: function(year) {
            this.holidays_arr = {
                "1/1": { name:"New Year's Day", paid: true },
                "7/4": { name:"Independence Day", paid: true },
                "9/17": { name:"Constitution Day", paid: true },
                "11/11": { name:"Veterans Day", paid: true },
                "12/25": { name:"Christmas", paid: true },
                "10/25": { name:"test", paid: true }
            }
            
            var holidays_dynamic = [
                { name:"Martin Luther King, Jr. Day", week:2, day:0, month:1, paid: true }, // third Monday in Jan
                { name:"President's Day", week:2, day:0, month:2, paid: true }, // third Monday of Feb
                { name:"Memorial Day", week:5, day:0, month:5, paid: true }, // last Monday in May
                { name:"Labor Day", week:0, day:0, month:9, paid: true }, // first Monday of September
                { name:"Columbus Day", week:1, day:0, month:10, paid: true }, // second Monday of October
                { name:"Thanksgiving", week:3, day:3, month:11, paid: true } // fourth Thursday of November
            ]
            _.forEach(holidays_dynamic, holiday => {
                let dt = DateTime.now()
                if (_.inRange(holiday.week, 0, 4)) {
                    dt = dt.set({ month: holiday.month, year: year}).startOf('month').startOf('week')
                    if (dt.month != holiday.month) {
                        dt = dt.plus({week: 1})
                    }
                    dt = dt.plus({week: holiday.week}).startOf('week').plus({days: holiday.day})
                } else {
                    dt = dt.set({ month: holiday.month, year: year}).endOf('month').startOf('week').plus({days: holiday.day})
                }
                let key = [dt.month, dt.day].join("/")
                this.holidays_arr[key] = { name:holiday.name, paid: holiday.paid}
            })
        },
        reoccurrance: function() {
            // {__th, day}/{__, week}/{__, month} every {__th, day}/{__, week}/{__, month}/{__, year} until XX/XX/XX
        },
        time: function(time) {
            var obj = time.split(':')
            var h_24 = Number(obj[0])
            var h = h_24 % 12;
            if (h === 0){
                h = 12;
            }
            if (obj[1] != '00'){
                time = h.toString() + ':' + obj[1] + ' ' + (h_24 < 12 ? 'AM' : 'PM');
            }
            else {
                time = h.toString() + ' ' + (h_24 < 12 ? 'AM' : 'PM');
            }
            return time
        },
        day: function(day) {
            let suffix = day.toString()
            if (suffix.endsWith('1')){
                day += 'st'
            }
            else if (suffix.endsWith('2')){
                day += 'nd'
            }
            else if (suffix.endsWith('3')){
                day += 'rd'
            }
            else {
                day += 'th'
            }
            return day
        }
    },
    computed: {
        week: function () {
            var [reference, iter] = this.weekdays(this.calendar_type, this.week_offset);

            var days = 0
            this.week_dates = [] // Reset week when next/back triggered
            this.week_events = []
            for(let i = 0; i < iter; i++){
                this.week_dates.push(reference.plus({days: days}).toLocaleString(DateTime.DATE_SHORT))
                days += 1;
            }
            this.current_week_header = reference.monthShort + " " + this.day(reference.day)

            var week = new Array();
            var day_iter = new Number(0);
            var schedule = this.getSchedule(DateTime.now().plus({days: this.week_offset}));
            this.schedule_variances = _.concat(this.calendar_variances, schedule)
            for(let i = 0; i < iter; i++){
                var date = reference.plus({days: day_iter})
                var dateString = date.toLocaleString(DateTime.DATE_SHORT)
                var weekday_short = date.weekdayShort.toUpperCase();
                var day = date.day
                var month = date.monthShort
                var year = date.year
                var events = _.filter(this.schedule_variances, {'date': dateString})
                week.push(
                    {
                        date: dateString, 
                        weekday: weekday_short, 
                        day: (day == 1) ? month + " " + day : day, 
                        month: month,
                        year: year,
                        events: this.getEvents(events, _.join([date.month, day], '/'))
                    }
                );
                day_iter += 1;
            }
            return week;
        },
        legend: function(){
            var week_events = _.flatten(this.week_events)
            var verbose = {
                'STANDARD': 'Standard',
                'OUT': 'Out',
                'IN': 'In',
                'PTO': 'Personal Time Out',
                'WFH': 'Work From Home',
                'OFFSITE': 'Offsite',
                'TRAVEL': 'Travel',
                'MILITARY': 'Military',
                'JURY': 'Jury',
                'TELECOMMUTING': 'Telecommuting',
                'BEREAVEMENT': 'Bereavement'
            }
            var event_types = [];
            var calendar_legend = [];
            for (var index in week_events){
                var type = verbose[week_events[index]['type']]
                var color = this.getTheme(week_events[index]['type'])
                if (event_types.includes(type)){
                    continue
                } else {
                    event_types.push(type)
                    calendar_legend.push(
                        {'name': type, 'color': color}
                    )
                }
            }
            return calendar_legend
        }
    }
}
