<template>
  <div class="container my-4">
    <div v-if="events.length === 0" class="alert alert-info text-center">
      No events.
    </div>
    <div v-else>
      <div id="timeline-embed" class="min-vh-100"></div>
    </div>
  </div>
</template>

<script>
import {Timeline} from '@knight-lab/timelinejs';
import '@knight-lab/timelinejs/dist/css/timeline.css';
import eventService from '@/services/EventService';


export default {
  name: "EventTimeline",
  data() {
    return {
      events: []
    };
  },
  created() {
    this.loadEvents();
  },
  mounted() {
    if (this.events.length) {
      new Timeline("timeline-embed", {
        title: {
          text: {
            headline: "My Memo",
            text: "Enjoy."
          }
        },
        events: this.events
      });
    }
  },
  methods: {
    loadEvents() {
      const events = eventService.getEvents();
      this.events = this.mapToTimelineEvent(events);
    },
    mapToTimelineEvent(src) {
      const out = src.map(event => {
        const categories = eventService.getCategoriesForEvent(event.id);
        const text = `${event.description} ${categories.length ? `<br>Categories: ${categories.join(', ')}` : ''}`
        return {
          text: {
            headline: event.name,
            text: text,
          },
          start_date: this.mapToTimelineDate(event.startDate),
          end_date: this.mapToTimelineDate(event.endDate),
          media: event.imgUrl ? {url: event.imgUrl} : undefined,
          categories: categories,
        };
      });

      return out
    },
    mapToTimelineDate(dateStr) {
      const date = new Date(dateStr);
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    }
  }
};
</script>
