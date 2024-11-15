<template>
  <div>
    <div v-if="isListView">
      <EventList />
    </div>
    <div v-else>
      <EventTimeline />
    </div>
  </div>
</template>

<script>
import { store } from '@/store';

import EventTimeline from "@/components/EventTimeline.vue";
import EventList from "@/components/EventList.vue";

export default {
  components: {
    EventTimeline,
    EventList,
   },
  computed: {
    isListView() {
      return store.isListView;
    }
  }
};
</script>