<template>
  <div>
    <div v-if="isListView">
      <p>list</p>
    </div>
    <div v-else>
      <EventTimeline />
    </div>
  </div>
</template>

<script>
import { store } from '@/store';

import EventTimeline from "@/components/EventTimeline.vue";

export default {
  components: { EventTimeline },
  computed: {
    isListView() {
      return store.isListView;
    }
  }
};
</script>