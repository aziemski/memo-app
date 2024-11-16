import {reactive} from 'vue';

export const store = reactive({
    isListView: true,
    toggleView() {
        this.isListView = !this.isListView;
    }
});