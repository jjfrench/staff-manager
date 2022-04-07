var _ = require('lodash');
import { DateTime } from 'luxon';

export function condenseEvents(passed_events) {
    /*
        Combines Variances
        1. Variance Types are the same
        2. Variance Times overlap
    */
    let combined = new Array()
    _.forEach(passed_events, function(events) {
        if(events){
            let index = combined.length
            combined.push(
                {
                    'type': events[0].type,
                    'date': events[0].date,
                    'start': events[0].start, 
                    'end': events[0].end
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
                            'end': events[i].end
                        }
                    );
                    index++;
                }
            }
        }
    })
    return combined;
}

export function splitVariances(passed_events, passed_type='STANDARD') {
    /*
        Splits STANDARD Type Variances
        1. STANDARD and variance start at the same time
        2. STANDARD end occurs during variance
        3. Variance occurs within STANDARD
    */
    if (passed_events.length >= 2){
        let events = new Array()
        // Copy of events with datatime start/end for time comparisons
        _.map(passed_events, event => {
            events.push(
                {
                    'type': event.type,
                    'date': event.date,
                    'start': DateTime.fromFormat(event.start, "TT"),
                    'end': DateTime.fromFormat(event.end, "TT")
                }
            )
        })
        // Check to see if day is part of standard schedule
        let standard = _.find(passed_events, {'type':passed_type})
        if (standard) {
            let standard_start = DateTime.fromFormat(standard.start, 'TT')
            let standard_end = DateTime.fromFormat(standard.end, 'TT')
            let standard_copy = _.find(events, {'type':passed_type})

            let standard_index = _.indexOf(events, standard_copy)
            let new_events = _.filter(events, event => {
                return (_.inRange(event.start, standard_copy.start, standard_copy.end)) && (event.type != standard_copy.type)
            })
            new_events = _.sortBy(new_events, ['start', 'end'])
            _.forEach(new_events, event => {
                // STANDARD and variance start at the same time
                if (event.start.toLocaleString(DateTime.TIME_24_SIMPLE) == standard_start.toLocaleString(DateTime.TIME_24_SIMPLE)){
                    passed_events[standard_index].start = event.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
                    standard_start = event.end;
                }
                // STANDARD end occurs during variance
                else if (_.inRange(standard_end, event.start, event.end)){
                    passed_events[standard_index].end = event.start.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
                    standard_end = event.start;
                }
                // Variance occurs within STANDARD
                else {
                    passed_events = _.reject(passed_events, standard)
                    let before_variance = {
                        'type': "STANDARD",
                        'date': event.date,
                        'start': standard_start.toLocaleString(DateTime.TIME_24_WITH_SECONDS),
                        'end': event.start.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                    }
                    let after_variance = {
                        'type': "STANDARD",
                        'date': event.date,
                        'start': event.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS),
                        'end': standard_end.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                    }
                    passed_events.push(before_variance, after_variance);
                    // Reset reference STANDARD to latest (last indexed)
                    standard = _.find(passed_events, after_variance)
                    standard_start = DateTime.fromFormat(standard.start, "TT")
                    standard_end = DateTime.fromFormat(standard.end, "TT")
                    standard_index = _.indexOf(passed_events, standard)
                }
            })
        }
    }
    return passed_events;
}

export function replaceStandard(passed_events, holidays, date) {
    /*
        Replace STANDARD variance completely
    */
    let standard = _.find(passed_events, {'type':'STANDARD'})
    if(standard){
        // Standard Schedule Events get overridden when variance matches same times
        if(_.filter(passed_events, {'start': standard.start, 'end': standard.end}).length > 1){
            passed_events = _.reject(passed_events, {'type':'STANDARD'})
        }
        // Standard Schedule Events get removed when Holiday is paid
        let holiday = _.get(holidays, date)
        if(_.get(holidays, date)) {
            if(holiday.paid){
                passed_events = _.reject(passed_events, {'type':'STANDARD'})
            }
        }
    }
    return passed_events;
}

export function varianceReoccurrence(passed_events) {
    /*
        Foreach reoccurring variance, generate a new event based on occurence
        as long as end date is not reached.

        passed_events: array of objects
        returns: array of objects (includes new, reoccurring events)
    */
    const types = {
         daily: {days:1},
         daily_workdays: {days:1},
         weekly: {weeks:1},
         biweekly: {weeks:2},
         monthly: {months: 1},
         yearly: {years: 1}
    }
    // Get only events where 'reoccurrence' is not null
    let reoccurring = _.filter(passed_events, 'reoccurrence')
    _.forEach(reoccurring, event => {
        let date = DateTime.fromFormat(event.date, "D");
        let end_date = DateTime.fromFormat(event.end_date, "D");
        
        while (date <= end_date) {
            // date of would be new event
            date = date.plus(types[event.reoccurrence]);
            if (date <= end_date) {
                // daily_workdays only adds a reoccurring event onto days containing a STANDARD schedule event
                if (event.reoccurrence == "daily_workdays") {
                    if (_.find(passed_events, {'type':'STANDARD', 'date':date.toLocaleString(DateTime.DATE_SHORT) } ) ) {
                        passed_events.push(
                            {
                                'type': event.type,
                                'date': date.toLocaleString(DateTime.DATE_SHORT),
                                'start': event.start,
                                'end': event.end
                            }
                        );
                    }
                    else {
                        // pass
                    }
                }
                else {
                    passed_events.push(
                        {
                            'type': event.type,
                            'date': date.toLocaleString(DateTime.DATE_SHORT),
                            'start': event.start,
                            'end': event.end
                        }
                    );
                }
            }
            else { break }
        }
    })
    return passed_events;
}