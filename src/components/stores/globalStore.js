/* eslint-disable no-param-reassign */
const globalStore = {
    state: {
        isLargeDesktop: matchMedia('(min-width: 1400px)').matches,
        isDesktop: matchMedia('(min-width: 1200px)').matches,
        isBigTablet: matchMedia('(min-width: 992px) and (max-width: 1199px)').matches,
        isSmallTablet: matchMedia('(min-width: 768px) and (max-width: 992px)').matches,
        isTablet: matchMedia('(min-width: 768px) and (max-width: 1199px)').matches,
        isMobile: matchMedia('(max-width: 767px)').matches,
        isTouch: ('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0),
        notificationCount: 0
    },

    getters: {
        isMobile(state) {
            return state.isMobile;
        },
        isSmallTablet(state) {
            return state.isSmallTablet;
        },
        isTablet(state) {
            return state.isTablet;
        },
        isBigTablet(state) {
            return state.isBigTablet;
        },
        isDesktop(state) {
            return state.isDesktop;
        },
        isTouch(state) {
            return state.isTouch;
        },
        isLargeDesktop(state) {
            return state.isLargeDesktop;
        },
        getNotificationCount(state) {
            return state.notificationCount;
        }
    },

    mutations: {
        setWinDimensions(state) {
            state.isLargeDesktop = matchMedia('(min-width: 1440px)').matches;
            state.isDesktop = matchMedia('(min-width: 1200px)').matches;
            state.isBigTablet = matchMedia('(min-width: 992px) and (max-width: 1199px)').matches;
            state.isSmallTablet = matchMedia('(min-width: 768px) and (max-width: 992px)').matches;
            state.isTablet = matchMedia('(min-width: 768px) and (max-width: 1199px)').matches;
            state.isMobile = matchMedia('(max-width: 767px)').matches;
        },
        setNotificationCount(state, val = 0) {
            state.notificationCount = val;
        }
    },

    actions: {
        setWinDimensions(context) {
            context.commit('setWinDimensions');
        },

        setNotificationCount(context, val) {
            context.commit('setNotificationCount', val);
        },

        reduceNotificationsCountBy(context, val) {
            const curCount = context?.state?.notificationCount || 0;
            const nextCount = Math.max(curCount - val, 0);
            context.commit('setNotificationCount', nextCount);
        }
    }
};

export default globalStore;
