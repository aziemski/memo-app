import { defineStore } from 'pinia'

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [],
    categories: [],
    eventCategories: [],
  }),
  actions: {
    saveEvents(events) {
      this.events = events
    },
    findFirstDuplicateCategoryName(categories) {
      const seenNames = new Set()
      for (const category of categories) {
        if (seenNames.has(category.name)) {
          return category.name
        }
        seenNames.add(category.name)
      }
      return null
    },
    getCategories() {
      return this.categories
    },
    saveCategories(categories) {
      const duplicateName = this.findFirstDuplicateCategoryName(categories)
      if (duplicateName) {
        throw new Error(`Category: "${duplicateName}" already exists. Pick a different name.`)
      }

      const newCategoryIds = categories.map((category) => category.id)
      this.eventCategories = this.eventCategories.filter((conn) =>
        newCategoryIds.includes(conn.categoryId),
      )

      this.categories = categories
    },
    saveEventCategories(eventCategories) {
      this.eventCategories = eventCategories
    },
    deleteEvent(eventId) {
      this.events = this.events.filter((event) => event.id !== eventId)
      this.eventCategories = this.eventCategories.filter((conn) => conn.eventId !== eventId)
    },
    getEventsWithCategories(filter = {}) {
      const { selectedCategories = [], timeRange = { from: null, to: null } } = filter

      return this.events
        .map((event) => {
          const eventCategoryIds = this.eventCategories
            .filter((ec) => ec.eventId === event.id)
            .map((ec) => ec.categoryId)

          const eventCategoriesList = this.categories.filter((category) =>
            eventCategoryIds.includes(category.id),
          )

          return {
            ...event,
            categories: eventCategoriesList,
          }
        })
        .filter((event) => {
          if (selectedCategories.length > 0) {
            const eventCategoryIds = event.categories.map((category) => category.id)
            if (!selectedCategories.some((catId) => eventCategoryIds.includes(catId))) {
              return false
            }
          }

          if (timeRange.from || timeRange.to) {
            const eventStart = new Date(event.startDate)
            const eventEnd = new Date(event.endDate || event.startDate)

            if (timeRange.from && eventEnd < new Date(timeRange.from)) {
              return false
            }

            if (timeRange.to && eventStart > new Date(timeRange.to)) {
              return false
            }
          }

          return true
        })
    },
    findEventWithCategories(eventId) {
      return this.getEventsWithCategories().find((evt) => evt.id === eventId) || null
    },
    upsertEventWithCategories(eventWithCategories) {
      if (!eventWithCategories.id || !this.events.some((e) => e.id === eventWithCategories.id)) {
        eventWithCategories.id = Date.now()

        this.events.push({
          id: eventWithCategories.id,
          name: eventWithCategories.name,
          description: eventWithCategories.description,
          startDate: eventWithCategories.startDate,
          endDate: eventWithCategories.endDate,
          imgUrl: eventWithCategories.imgUrl,
        })

        eventWithCategories.categories.forEach((category) => {
          this.eventCategories.push({
            eventId: eventWithCategories.id,
            categoryId: category.id,
          })
        })
      } else {
        const eventIndex = this.events.findIndex((e) => e.id === eventWithCategories.id)
        if (eventIndex !== -1) {
          this.events[eventIndex] = {
            id: eventWithCategories.id,
            name: eventWithCategories.name,
            description: eventWithCategories.description,
            startDate: eventWithCategories.startDate,
            endDate: eventWithCategories.endDate,
            imgUrl: eventWithCategories.imgUrl,
          }
        }

        this.eventCategories = this.eventCategories.filter(
          (ec) => ec.eventId !== eventWithCategories.id,
        )
        eventWithCategories.categories.forEach((category) => {
          this.eventCategories.push({
            eventId: eventWithCategories.id,
            categoryId: category.id,
          })
        })
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'eventStore',
        storage: localStorage,
      },
    ],
  },
})
