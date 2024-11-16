<template>
  <div class="container mt-5">
    <div v-if="events.length === 0" class="alert alert-info text-center">
      No events.
    </div>
    <div v-else>
      <div id="timeline-embed" class="min-vh-100"></div>
    </div>
  </div>
</template>

<script>
import {Timeline} from "@knight-lab/timelinejs";
import "@knight-lab/timelinejs/dist/css/timeline.css";

import eventService from "@/services/EventService";
import {store} from "@/store";

export default {
  name: "EventTimeline",
  data() {
    return {
      events: [],
    };
  },
  computed: {
    isAuthenticated() {
      return store.isAuthenticated;
    }
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
            text: "Enjoy.",
          },
        },
        events: this.events,
      });
    }
  },
  methods: {
    loadEvents() {
      const events = eventService.getEventsWithCategories();
      this.events = this.mapToTimelineEvent(events);
    },
    mapToTimelineEvent(src) {
      return src.map((event) => {
        const categories = event.categories.map(
            (cat) =>
                `<span class="badge rounded-pill" style="background-color: ${
                    cat.color || "#6c757d"
                }; color: ${cat.color ? "#fff" : "#000"}; margin-right: 5px;">
              ${cat.name}
            </span>`
        );
        const editButton = this.isAuthenticated
            ? `<a href="/events/edit/${event.id}" target="_self" class="text-secondary text-decoration-none mt-2 d-inline-block">Edit</a>`
            : "";
        const text = `
          <p>${event.description || "No description available."}</p>
          <p>${categories.join(" ")}</p>
          ${editButton}
        `;
        return {
          text: {
            headline: event.name,
            text: text,
          },
          start_date: this.mapToTimelineDate(event.startDate),
          end_date: this.mapToTimelineDate(event.endDate),
          media: event.imgUrl ? {url: event.imgUrl} : undefined,
        };
      });
    },
    mapToTimelineDate(dateStr) {
      const date = new Date(dateStr);
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      };
    },
  },
};
</script>

