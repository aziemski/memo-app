import {reactive} from 'vue';

export const store = reactive({
    isListView: false,
    toggleView() {
        this.isListView = !this.isListView;
    }
});