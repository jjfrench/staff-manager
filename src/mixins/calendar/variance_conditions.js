var _ = require('lodash');
// import { DateTime } from 'luxon';

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
}

export function splitVariances(passed_events) {
    /*
        Splits STANDARD Type Variances
        1. 
    */
    if (passed_events.length > 2){
        console.log(passed_events)
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
            console.log(new_events)
            _.forEach(new_events, event => {

                if (event.start == last.start){
                    last.start = event.end;
                    // console.log(last)
                }
                else if ((event.start < last.end) && (event.end >= last.end)){
                    last.end = event.start;
                    // console.log(last)
                }
                else {
                    // console.log(last)
                }
            })
            
            // console.log(new_events)
        }
    }
    
    return passed_events
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