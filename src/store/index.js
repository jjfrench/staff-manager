import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const set = property => (store, payload) => (store[property] = payload)

// FOR TESTING PURPOSES
const Sunday = "12/31/2021"
const Monday = "12/20/2021"
const Tuesday = "12/21/2021"
const Wednesday = "12/22/2021"
const Thursday = "12/23/2021"
const Friday = "12/24/2021"
const Saturday = "12/25/2021"
// ----------------------------

const store = new Vuex.Store({
    state: {
        name: "",
        calendar_type: "Sat - Fri",
        dark_mode: false,
        variance_theme: "standard",
        variances: [
            {type: "WFH", date: Monday, start: "08:00:00", end: "10:30:00", duration: 8.5},
            {type: "OUT", date: Monday, start: "10:30:00", end: "12:30:00", duration: 8.5},
            {type: "OUT", date: Monday, start: "12:45:00", end: "13:30:00", duration: 8.5},
            {type: "OUT", date: Monday, start: "15:45:00", end: "17:30:00", duration: 8.5},
            {type: "WFH", date: Monday, start: "16:45:00", end: "18:30:00", duration: 8.5},
            {type: "WFH", date: Tuesday, start: "08:00:00", end: "16:30:00", duration: 8.5},
            {type: "WFH", date: Wednesday, start: "08:00:00", end: "16:30:00", duration: 8.5},
            {type: "WFH", date: Thursday, start: "08:00:00", end: "16:30:00", duration: 8.5},
            {type: "WFH", date: Friday, start: "08:00:00", end: "16:30:00", duration: 8.5},
            {type: "OUT", date: Saturday, start: "15:00:00", end: "16:30:00", duration: 1.5 },
            {type: "OUT", date: Saturday, start: "16:30:00", end: "16:40:00", duration: 1.5 },
            {type: "OUT", date: Saturday, start: "17:00:00", end: "18:30:00", duration: 1.5 },
            {type: "OUT", date: Saturday, start: "18:00:00", end: "19:30:00", duration: 1.5 },
            {type: "OUT", date: Saturday, start: "19:00:00", end: "20:30:00", duration: 1.5 },
            {type: "TRAVEL", date: Sunday, start: "21:00:00", end: "23:30:00", duration: 1.5 },
            {type: "TRAVEL", date: Sunday, start: "23:00:00", end: "23:50:00", duration: 1.5 },
            {type: "TRAVEL", date: Sunday, start: "15:00:00", end: "15:50:00", duration: 1.5 }
        ],
        schedule: {
            1: [
                {day: 0, type: null, start: "", end: "", duration: 0},
                {day: 1, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                {day: 2, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                {day: 3, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                {day: 4, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                {day: 5, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                {day: 6, type: null, start: "", end: "", duration: 0}
            ],
            2: [
                {day: 0, type: null, start: "", end: "", duration: 0},
                {day: 1, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                {day: 2, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                {day: 3, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                {day: 4, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                {day: 5, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                {day: 6, type: null, start: "", end: "", duration: 0}
            ]
        },
        store_subscriptions: [
            {
                first: "Meet",
                last: "Patel",
                variances: [
                    {type: "WFH", date: Monday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Tuesday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Wednesday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Thursday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Friday, start: "08:00:00", end: "16:30:00", duration: 8.5}
                ],
                schedule: {
                    1: [
                        {day: 0, type: null, start: "", end: "", duration: 0},
                        {day: 1, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 2, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 3, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 4, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 5, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 6, type: null, start: "", end: "", duration: 0}
                    ],
                    2: [
                        {day: 0, type: null, start: "", end: "", duration: 0},
                        {day: 1, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 2, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 3, type: "STANDARD", start: "08:00:00", end: "17:30:00", duration: 8},
                        {day: 4, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 5, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 6, type: null, start: "", end: "", duration: 0}
                    ]
                }
            },
            {
                first: "Simson",
                last: "Chow",
                variances: [
                    {type: "WFH", date: Monday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Tuesday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Wednesday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Thursday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Friday, start: "08:00:00", end: "16:30:00", duration: 8.5}
                ],
                schedule: {
                    1: [
                        {day: 0, type: null, start: "", end: "", duration: 0},
                        {day: 1, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 2, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 3, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 4, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 5, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 6, type: null, start: "", end: "", duration: 0}
                    ],
                    2: [
                        {day: 0, type: null, start: "", end: "", duration: 0},
                        {day: 1, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 2, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 3, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 4, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 5, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 6, type: null, start: "", end: "", duration: 0}
                    ]
                }
            },
            {
                first: "Jacob",
                last: "Holst",
                variances: [
                    {type: "WFH", date: Monday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Tuesday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Wednesday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Thursday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Friday, start: "08:00:00", end: "16:30:00", duration: 8.5}
                ],
                schedule: {
                    1: [
                        {day: 0, type: null, start: "", end: "", duration: 0},
                        {day: 1, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 2, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 3, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 4, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 5, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 6, type: null, start: "", end: "", duration: 0}
                    ],
                    2: [
                        {day: 0, type: null, start: "", end: "", duration: 0},
                        {day: 1, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 2, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 3, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 4, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 5, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 6, type: null, start: "", end: "", duration: 0}
                    ]
                }
            },
            {
                first: "Aditya",
                last: "Harshvardhan",
                variances: [
                    {type: "WFH", date: Monday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Tuesday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Wednesday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Thursday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Friday, start: "08:00:00", end: "16:30:00", duration: 8.5}
                ],
                schedule: {
                    1: [
                        {day: 0, type: null, start: "", end: "", duration: 0},
                        {day: 1, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 2, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 3, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 4, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 5, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 6, type: null, start: "", end: "", duration: 0}
                    ],
                    2: [
                        {day: 0, type: null, start: "", end: "", duration: 0},
                        {day: 1, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 2, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 3, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 4, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 5, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 6, type: null, start: "", end: "", duration: 0}
                    ]
                }
            },
            {
                first: "Hafidh",
                last: "Satyanto",
                variances: [
                    {type: "WFH", date: Monday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Tuesday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Wednesday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Thursday, start: "08:00:00", end: "16:30:00", duration: 8.5},
                    {type: "WFH", date: Friday, start: "08:00:00", end: "16:30:00", duration: 8.5}
                ],
                schedule: {
                    1: [
                        {day: 0, type: null, start: "", end: "", duration: 0},
                        {day: 1, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 2, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 3, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 4, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 5, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 6, type: null, start: "", end: "", duration: 0}
                    ],
                    2: [
                        {day: 0, type: null, start: "", end: "", duration: 0},
                        {day: 1, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 2, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 3, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 4, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 5, type: "STANDARD", start: "08:00:00", end: "16:30:00", duration: 8},
                        {day: 6, type: null, start: "", end: "", duration: 0}
                    ]
                }
            },
        ]
    },
    mutations: {
        setCalendarType: set('calendar_type'),
        setVarianceTheme: set('variance_theme'),
        setDarkMode: set('dark_mode')
    },
    plugins: [createPersistedState({
        key: 'storage',
        storage: window.localStorage
    })]
})

export default store