class EventService {
    constructor() {
        this.eventKey = 'events';
        this.categoryKey = 'categories';
        this.eventCategoriesKey = 'eventCategories';
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

    getEventCategories() {
        return JSON.parse(localStorage.getItem(this.eventCategoriesKey)) || [];
    }

    saveEventCategories(eventCategories) {
        localStorage.setItem(this.eventCategoriesKey, JSON.stringify(eventCategories));
    }

    addEvent(event) {
        const events = this.getEvents();
        events.push(event);
        this.saveEvents(events);
    }

    updateEvent(updatedEvent) {
        const events = this.getEvents();
        const index = events
            .findIndex(event => event.id === updatedEvent.id);
        if (index !== -1) {
            events[index] = updatedEvent;
            this.saveEvents(events);
        }
    }

    deleteEvent(eventId) {
        const events = this.getEvents()
            .filter(event => event.id !== eventId);
        this.saveEvents(events);
        this.deleteCategoriesForEvent(eventId);
    }

    deleteCategoriesForEvent(eventId) {
        const eventCategories = this.getEventCategories()
            .filter(conn => conn.eventId !== eventId);
        this.saveEventCategories(eventCategories);
    }

    getCategoriesForEvent(eventId) {
        const categoryIds = this.getEventCategories()
            .filter(conn => conn.eventId === eventId)
            .map(conn => conn.categoryId);
        return this.getCategories()
            .filter(category => categoryIds.includes(category.id))
            .map(category => category.name);
    }

    seedData() {
        const sampleEvents = [
            {
                id: Date.now() + 1, name: 'Sample Event 1',
                description: 'Description for event 1',
                startDate: '2024-11-15', endDate: '2024-11-16', imgUrl: 'https://via.placeholder.com/100'
            },
            {
                id: Date.now() + 2,
                name: 'Sample Event 2',
                description: 'Description for event 2',
                startDate: new Date('2024-11-17'),
                endDate: '2024-11-18',
                imgUrl: 'https://via.placeholder.com/100'
            },
            {
                id: Date.now() + 3,
                name: 'Sample Event 3',
                description: 'Description for event 3',
                startDate: '2024-11-19',
                endDate: '2024-11-20',
                imgUrl: 'https://via.placeholder.com/100'
            }
        ];

        const sampleCategories = [
            {id: Date.now() + 1, name: 'Work'},
            {id: Date.now() + 2, name: 'Personal'},
            {id: Date.now() + 3, name: 'Urgent'}
        ];

        const sampleEventCategories = [
            {eventId: sampleEvents[0].id, categoryId: sampleCategories[0].id},
            {eventId: sampleEvents[1].id, categoryId: sampleCategories[1].id},
            {eventId: sampleEvents[2].id, categoryId: sampleCategories[2].id},
            {eventId: sampleEvents[1].id, categoryId: sampleCategories[0].id}
        ];

        this.saveEvents(sampleEvents);
        this.saveCategories(sampleCategories);
        this.saveEventCategories(sampleEventCategories);
    }

}

const eventService = new EventService();
export default eventService;