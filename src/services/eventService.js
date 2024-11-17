const EventService = {
  eventKey: 'events',
  categoryKey: 'categories',
  eventCategoriesKey: 'eventCategories',

  getEvents() {
    return JSON.parse(localStorage.getItem(this.eventKey)) || []
  },

  saveEvents(events) {
    localStorage.setItem(this.eventKey, JSON.stringify(events))
  },

  getCategories() {
    return JSON.parse(localStorage.getItem(this.categoryKey)) || []
  },

  saveCategories(categories) {
    const duplicateName = this.findFirstDuplicateCategoryName(categories)
    if (duplicateName) {
      throw new Error(`Category: "${duplicateName}" already exists. Pick a different name.`)
    }

    let eventCategories = this.getEventCategories()
    const newCategoryIds = categories.map((category) => category.id)
    eventCategories = eventCategories.filter((conn) => newCategoryIds.includes(conn.categoryId))
    this.saveEventCategories(eventCategories)

    localStorage.setItem(this.categoryKey, JSON.stringify(categories))
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

  getEventCategories() {
    return JSON.parse(localStorage.getItem(this.eventCategoriesKey)) || []
  },

  saveEventCategories(eventCategories) {
    localStorage.setItem(this.eventCategoriesKey, JSON.stringify(eventCategories))
  },

  deleteEvent(eventId) {
    const events = this.getEvents().filter((event) => event.id !== eventId)
    this.saveEvents(events)

    const eventCategories = this.getEventCategories().filter((conn) => conn.eventId !== eventId)
    this.saveEventCategories(eventCategories)
  },

  getEventsWithCategories(filter = {}) {
    const { selectedCategories = [], timeRange = { from: null, to: null } } = filter
    const events = this.getEvents()
    const categories = this.getCategories()
    const eventCategories = this.getEventCategories()

    return events
      .map((event) => {
        const eventCategoryIds = eventCategories
          .filter((ec) => ec.eventId === event.id)
          .map((ec) => ec.categoryId)

        const eventCategoriesList = categories.filter((category) =>
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
    const events = this.getEvents()
    const eventCategories = this.getEventCategories()

    if (!eventWithCategories.id || !events.some((e) => e.id === eventWithCategories.id)) {
      eventWithCategories.id = Date.now()

      events.push({
        id: eventWithCategories.id,
        name: eventWithCategories.name,
        description: eventWithCategories.description,
        startDate: eventWithCategories.startDate,
        endDate: eventWithCategories.endDate,
        imgUrl: eventWithCategories.imgUrl,
      })

      eventWithCategories.categories.forEach((category) => {
        eventCategories.push({
          eventId: eventWithCategories.id,
          categoryId: category.id,
        })
      })
    } else {
      const eventIndex = events.findIndex((e) => e.id === eventWithCategories.id)
      if (eventIndex !== -1) {
        events[eventIndex] = {
          id: eventWithCategories.id,
          name: eventWithCategories.name,
          description: eventWithCategories.description,
          startDate: eventWithCategories.startDate,
          endDate: eventWithCategories.endDate,
          imgUrl: eventWithCategories.imgUrl,
        }
      }

      const filteredCategories = eventCategories.filter(
        (ec) => ec.eventId !== eventWithCategories.id,
      )
      eventWithCategories.categories.forEach((category) => {
        filteredCategories.push({
          eventId: eventWithCategories.id,
          categoryId: category.id,
        })
      })

      this.saveEventCategories(filteredCategories)
    }

    this.saveEvents(events)
  },
}

export default EventService
