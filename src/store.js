import {reactive, watch} from "vue";

const savedState = JSON.parse(localStorage.getItem("store")) || {};

export const store = reactive({
    isListView:
        savedState.isListView
        !== undefined
            ? savedState.isListView : false,

    isAuthenticated:
        savedState.isAuthenticated !== undefined
            ? savedState.isAuthenticated : false,
    users:
        savedState.users !== undefined
            ? savedState.users : [],

    currentUser:
        savedState.currentUser !== undefined
            ? savedState.currentUser : [],

    toggleView() {
        this.isListView = !this.isListView;
    },
});

watch(
    () => ({
        isListView: store.isListView,
        isAuthenticated: store.isAuthenticated,
        users: store.users,
        currentUser: store.currentUser,
    }),
    (newValues) => {
        localStorage.setItem("store", JSON.stringify(newValues));
    },
    {deep: true}
);