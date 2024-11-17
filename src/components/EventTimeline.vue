<template>
  <div class="container mt-5">
    <div v-if="events.length === 0" class="alert alert-info text-center">
      No events.
    </div>
    <div v-else>
      <div id="timeline-embed" class="min-vh-95"></div>
    </div>
  </div>
</template>

<script>
import {Timeline} from "@knight-lab/timelinejs";
import "@knight-lab/timelinejs/dist/css/timeline.css";

import eventService from "@/services/EventService";
import AuthService from "@/services/authService";
import {store} from "@/store";
import {nextTick} from "vue";

export default {
  name: "EventTimeline",
  data() {
    return {
      timelineInstance: null,
    };
  },
  computed: {
    isAuthenticated() {
      return AuthService.isAuthenticated();
    },
    events() {
      const events = eventService.getEventsWithCategories(store.filters);
      return this.mapToTimelineEvent(events);
    },
  },
  watch: {
    events: {
      handler(newEvents) {
        if (this.timelineInstance) {
          this.destroyTimeline();
        }
        if (newEvents.length) {
          this.initTimeline(newEvents);
        }
      },
      immediate: true,
    },
  },
  methods: {
    async initTimeline(events) {
      await nextTick();
      const container = document.getElementById("timeline-embed");
      if (container) {
        this.timelineInstance = new Timeline("timeline-embed", {
          title: {
            text: {
              headline: "My Memo",
              text: "Enjoy.",
            },
          },
          events,
        });
      } else {
        console.error("Timeline container not found!");
      }
    },
    destroyTimeline() {
      const container = document.getElementById("timeline-embed");
      if (container) {
        container.innerHTML = "";
      }
      this.timelineInstance = null;
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
<style scoped>
#timeline-embed {
  height: 80vh;
}
</style>

