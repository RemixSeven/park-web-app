import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export  default  new Vuex.Store({
    state: {
        userId:"",
        walletId:""
    },
    mutations: {
        postUserId(state, userId) {
            state.userId=userId;
        },

        postWalletId (state, walletId) {
            state.walletId=walletId;
        }

    }
});