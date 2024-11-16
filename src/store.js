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

    toggleView() {
        this.isListView = !this.isListView;
    },

    setIsAuthenticated(status) {
        this.isAuthenticated = status;
    },
});

watch(
    () => ({
        isListView: store.isListView,
        isAuthenticated: store.isAuthenticated
    }),
    (newValues) => {
        localStorage.setItem("store", JSON.stringify(newValues));
    },
    {deep: true}
);