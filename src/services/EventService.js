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

    getEventsWithCategories() {
        const events = this.getEvents();
        const categories = this.getCategories();
        const eventCategories = this.getEventCategories();

        return events.map(event => {
            const eventCategoryIds = eventCategories
                .filter(ec => ec.eventId === event.id)
                .map(ec => ec.categoryId);

            const eventCategoriesList = categories.filter(category =>
                eventCategoryIds.includes(category.id)
            );

            return {
                ...event,
                categories: eventCategoriesList,
            };
        });
    }

    findEventWithCategories(eventId) {
        return this.getEventsWithCategories()
            .find(evt => evt.id === eventId) || {};
    }

    updateEventWithCategories(updatedEvent) {
        const events = this.getEvents();
        const index = events.findIndex(event => event.id === updatedEvent.id);
        if (index !== -1) {
            const {...eventData} = updatedEvent;
            events[index] = eventData;
            this.saveEvents(events);
        }

        let eventCategories = this.getEventCategories();
        eventCategories = eventCategories.filter(ec => ec.eventId !== updatedEvent.id);

        updatedEvent.categories.forEach(category => {
            eventCategories.push({eventId: updatedEvent.id, categoryId: category.id});
        });

        this.saveEventCategories(eventCategories);
    }

    upsertEventWithCategories(eventWithCategories) {
        const events = this.getEvents();
        const eventCategories = this.getEventCategories();

        if (!eventWithCategories.id || !events.some(e => e.id === eventWithCategories.id)) {
            eventWithCategories.id = Date.now();

            events.push({
                id: eventWithCategories.id,
                name: eventWithCategories.name,
                description: eventWithCategories.description,
                startDate: eventWithCategories.startDate,
                endDate: eventWithCategories.endDate,
                imgUrl: eventWithCategories.imgUrl,
            });

            eventWithCategories.categories.forEach(category => {
                eventCategories.push({ eventId: eventWithCategories.id, categoryId: category.id });
            });
        } else {
            const eventIndex = events.findIndex(e => e.id === eventWithCategories.id);
            if (eventIndex !== -1) {
                events[eventIndex] = {
                    id: eventWithCategories.id,
                    name: eventWithCategories.name,
                    description: eventWithCategories.description,
                    startDate: eventWithCategories.startDate,
                    endDate: eventWithCategories.endDate,
                    imgUrl: eventWithCategories.imgUrl,
                };
            }

            const filteredCategories = eventCategories.filter(ec => ec.eventId !== eventWithCategories.id);
            eventWithCategories.categories.forEach(category => {
                filteredCategories.push({ eventId: eventWithCategories.id, categoryId: category.id });
            });

            this.saveEventCategories(filteredCategories);
        }

        this.saveEvents(events);
    }


    seedData() {
        const sampleEvents = [
            {
                id: 1,
                name: 'Sample Event 1',
                description: 'Description for event 1',
                startDate: '2024-11-15',
                endDate: '2024-11-16',
                imgUrl: 'https://via.placeholder.com/100'
            },
            {
                id: 2,
                name: 'Sample Event 2',
                description: 'Description for event 2',
                startDate: '2024-11-17',
                endDate: '2024-11-18',
                imgUrl: 'https://via.placeholder.com/100'
            },
            {
                id: 3,
                name: 'Sample Event 3',
                description: 'Description for event 3',
                startDate: '2024-11-19',
                endDate: '2024-11-20',
                imgUrl: 'https://via.placeholder.com/100'
            }
        ];

        const sampleCategories = [
            {
                id: 1,
                name: 'Technology',
                color: '#3498db'
            },
            {
                id: 2, name: 'Health',
                color: '#2ecc71'
            },
            {
                id: 3, name: 'Education',
                color: '#e74c3c'
            },
            {
                id: 4,
                name: 'Sports',
                color: '#f1c40f'
            },
            {
                id: 5,
                name: 'Travel',
                color: ''
            },
            {
                id: 6,
                name: 'Food',
                color: '#8e44ad'
            },
        ];

        const sampleEventCategories = [
            {
                eventId: sampleEvents[0].id,
                categoryId: sampleCategories[0].id
            },
            {
                eventId: sampleEvents[1].id,
                categoryId: sampleCategories[1].id
            },
            {
                eventId: sampleEvents[2].id,
                categoryId: sampleCategories[2].id
            },
            {
                eventId: sampleEvents[1].id,
                categoryId: sampleCategories[0].id
            }
        ];

        this.saveEvents(sampleEvents);
        this.saveCategories(sampleCategories);
        this.saveEventCategories(sampleEventCategories);
    }

}

const eventService = new EventService();
export default eventService;