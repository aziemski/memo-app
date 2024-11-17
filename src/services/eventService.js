const EventService = {
    eventKey: "events",
    categoryKey: "categories",
    eventCategoriesKey: "eventCategories",

    getEvents() {
        return JSON.parse(localStorage.getItem(this.eventKey)) || [];
    },

    saveEvents(events) {
        localStorage.setItem(this.eventKey, JSON.stringify(events));
    },

    getCategories() {
        return JSON.parse(localStorage.getItem(this.categoryKey)) || [];
    },

    saveCategories(categories) {
        const duplicateName = this.findFirstDuplicateCategoryName(categories);
        if (duplicateName) {
            throw new Error(`Category: "${duplicateName}" already exists. Pick a different name.`);
        }

        let eventCategories = this.getEventCategories();
        const newCategoryIds = categories.map(category => category.id);
        eventCategories = eventCategories.filter(conn => newCategoryIds.includes(conn.categoryId));
        this.saveEventCategories(eventCategories);

        localStorage.setItem(this.categoryKey, JSON.stringify(categories));
    },

    findFirstDuplicateCategoryName(categories) {
        const seenNames = new Set();

        for (const category of categories) {
            if (seenNames.has(category.name)) {
                return category.name;
            }
            seenNames.add(category.name);
        }

        return null;
    },

    getEventCategories() {
        return JSON.parse(localStorage.getItem(this.eventCategoriesKey)) || [];
    },

    saveEventCategories(eventCategories) {
        localStorage.setItem(this.eventCategoriesKey, JSON.stringify(eventCategories));
    },

    deleteEvent(eventId) {
        const events = this.getEvents().filter(event => event.id !== eventId);
        this.saveEvents(events);

        const eventCategories = this.getEventCategories().filter(conn => conn.eventId !== eventId);
        this.saveEventCategories(eventCategories);
    },

    getEventsWithCategories(filter = {}) {
        const { selectedCategories = [], timeRange = { from: null, to: null } } = filter;
        const events = this.getEvents();
        const categories = this.getCategories();
        const eventCategories = this.getEventCategories();

        return events
            .map(event => {
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
            })
            .filter(event => {
                if (selectedCategories.length > 0) {
                    const eventCategoryIds = event.categories.map(category => category.id);
                    if (!selectedCategories.some(catId => eventCategoryIds.includes(catId))) {
                        return false;
                    }
                }

                if (timeRange.from || timeRange.to) {
                    const eventStart = new Date(event.startDate);
                    const eventEnd = new Date(event.endDate || event.startDate);

                    if (timeRange.from && eventEnd < new Date(timeRange.from)) {
                        return false;
                    }

                    if (timeRange.to && eventStart > new Date(timeRange.to)) {
                        return false;
                    }
                }

                return true;
            });
    },

    findEventWithCategories(eventId) {
        return this.getEventsWithCategories().find(evt => evt.id === eventId) || {};
    },

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
    },

    seedData() {
        const sampleEvents = [
            {
                id: 1,
                name: "Lorem Ipsum Dolor Sit",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                startDate: "2024-11-21",
                endDate: "2024-11-23",
                imgUrl: 'https://placecats.com/louie/648/380',
            },
            {
                id: 2,
                name: "Ut Enim Ad Minim Veniam",
                description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                startDate: "2024-12-01",
                endDate: "2024-12-02",
                imgUrl: 'https://placecats.com/neo/648/380',

            },
            {
                id: 3,
                name: "Duis Aute Irure Dolor",
                description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                startDate: "2024-12-10",
                endDate: "2024-12-11",
                imgUrl: 'https://placecats.com/millie/648/380',
            },
            {
                id: 4,
                name: "Excepteur Sint Occaecat",
                description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                startDate: "2024-12-15",
                endDate: "2024-12-16",
                imgUrl: 'https://placecats.com/millie_neo/648/380',
            },
            {
                id: 5,
                name: "Sed Ut Perspiciatis",
                description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
                startDate: "2024-12-20",
                endDate: "2024-12-21",
                imgUrl: 'https://placecats.com/neo_2/648/380',
            },
            {
                id: 6,
                name: "Nemo Enim Ipsam",
                description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.",
                startDate: "2024-12-25",
                endDate: "2024-12-26",
                imgUrl: 'https://placecats.com/bella/648/380',
            },
            {
                id: 7,
                name: "Neque Porro Quisquam",
                description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
                startDate: "2024-11-27",
                endDate: "2024-11-27",
                imgUrl: 'https://placecats.com/g/648/380',
            },
            {
                id: 8,
                name: "At Vero Eos Et Accusamus",
                description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.",
                startDate: "2024-12-05",
                endDate: "2024-12-05",
                imgUrl: 'https://placecats.com/poppy/648/380',
            },
            {
                id: 9,
                name: "Et Harum Quidem",
                description: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.",
                startDate: "2024-12-18",
                endDate: "2024-12-20",
                imgUrl: 'https://placecats.com/neo_banana/648/380',
            },
        ];

        const sampleCategories = [
            {id: 1, name: "Technology", color: "#3498db"},
            {id: 2, name: "Health", color: "#2ecc71"},
            {id: 3, name: "Education", color: "#e74c3c"},
            {id: 4, name: "Sports", color: "#f1c40f"},
            {id: 5, name: "Travel", color: null},
            {id: 6, name: "Food", color: "#8e44ad"},
        ];

        const sampleEventCategories = [
            {eventId: 1, categoryId: 1},
            {eventId: 2, categoryId: 2},
            {eventId: 3, categoryId: 3},
            {eventId: 3, categoryId: 4},
            {eventId: 4, categoryId: 1},
            {eventId: 4, categoryId: 6},
            {eventId: 4, categoryId: 2},
            {eventId: 5, categoryId: 5},
            {eventId: 5, categoryId: 1},
            {eventId: 5, categoryId: 3},
            {eventId: 6, categoryId: 6},
            {eventId: 7, categoryId: 1},
            {eventId: 7, categoryId: 4},
            {eventId: 7, categoryId: 3},
            {eventId: 7, categoryId: 5},
            {eventId: 8, categoryId: 4},
            {eventId: 8, categoryId: 2},
            {eventId: 9, categoryId: 3},
        ];

        this.saveEvents(sampleEvents);
        this.saveCategories(sampleCategories);
        this.saveEventCategories(sampleEventCategories);
    },
};

export default EventService;
