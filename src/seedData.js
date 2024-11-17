import AuthService from "@/services/authService";
import EventService from "@/services/eventService";

const SeedData = {

    seedEvents() {
        const events = [
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

        const categories = [
            {id: 1, name: "Technology", color: "#3498db"},
            {id: 2, name: "Health", color: "#2ecc71"},
            {id: 3, name: "Education", color: "#e74c3c"},
            {id: 4, name: "Sports", color: "#f1c40f"},
            {id: 5, name: "Travel", color: null},
            {id: 6, name: "Food", color: "#8e44ad"},
        ];

        const eventCategories = [
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

        EventService.saveEvents(events);
        EventService.saveCategories(categories);
        EventService.saveEventCategories(eventCategories);
    },

    async seedUsers() {
        const users = [
            {
                name: "Test User",
                email: "test@example.com",
                password: "asdfasdf",
            },
        ];

        for (const user of users) {
            await AuthService.save(user);
        }
    },

    seedData() {
        (async () => {
            await this.seedUsers();
        })();
        this.seedEvents();
    },

    initialSeed() {
        if (!localStorage.getItem("isSeeded")) {
            this.seedData();
            localStorage.setItem("isSeeded", "true");
        }
    }
};

export default SeedData;