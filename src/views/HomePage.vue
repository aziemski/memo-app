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
import EventTimeline from '@/components/EventTimeline.vue'
import EventList from '@/components/EventList.vue'
import { useUIStore } from '@/stores/ui.js'

export default {
  components: {
    EventTimeline,
    EventList,
  },

  computed: {
    uiStore() {
      return useUIStore()
    },
    isListView() {
      return this.uiStore.isListView
    },
  },
}
</script>
