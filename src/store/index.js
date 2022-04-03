import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'
import createPersistedState from 'vuex-persistedstate'

import * as test from './test'

Vue.use(Vuex)
const set = property => (store, payload) => (store[property] = payload)

const store = new Vuex.Store({
    state: {
        name: "",
        calendar_type: "Sat - Fri",
        dark_mode: false,
        variance_theme: "standard",
        variances: test.variances,
        schedule: test.schedule,
        store_subscriptions: test.store_subscriptions
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