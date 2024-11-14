class EventService {
  constructor() {
    this.eventKey = 'events';
    this.categoryKey = 'categories';
    this.connectionKey = 'eventCategoryConnections';
  }

  getEvents() {
    return JSON.parse(localStorage.getItem(this.eventKey)) || [];
  }

  saveEvents(events) {
    localStorage.setItem(this.eventKey, JSON.stringify(events));
  }

  getCategories() {
    return JSON.parse(localStorage.getItem(this.categoryKey)) || [];
  }

  saveCategories(categories) {
    localStorage.setItem(this.categoryKey, JSON.stringify(categories));
  }

  getConnections() {
    return JSON.parse(localStorage.getItem(this.connectionKey)) || [];
  }

  saveConnections(connections) {
    localStorage.setItem(this.connectionKey, JSON.stringify(connections));
  }

  addEvent(event) {
    const events = this.getEvents();
    events.push(event);
    this.saveEvents(events);
  }

  updateEvent(updatedEvent) {
    const events = this.getEvents();
    const index = events.findIndex(event => event.id === updatedEvent.id);
    if (index !== -1) {
      events[index] = updatedEvent;
      this.saveEvents(events);
    }
  }

  deleteEvent(eventId) {
    const events = this.getEvents().filter(event => event.id !== eventId);
    this.saveEvents(events);
    this.deleteConnectionsForEvent(eventId);
  }

  deleteConnectionsForEvent(eventId) {
    const connections = this.getConnections().filter(conn => conn.eventId !== eventId);
    this.saveConnections(connections);
  }

  getCategoriesForEvent(eventId) {
    const categoryIds = this.getConnections()
      .filter(conn => conn.eventId === eventId)
      .map(conn => conn.categoryId);
    return this.getCategories()
      .filter(category => categoryIds.includes(category.id))
      .map(category => category.name);
  }
}

const eventService = new EventService();
export default eventService;