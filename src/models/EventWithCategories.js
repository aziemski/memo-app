import Event from "./Event";
import Category from "./Category";

export default class EventWithCategories extends Event {

    constructor(id, name, description = "", startDate, endDate = "", imgUrl = "", categories = []) {
        super(id, name, description, startDate, endDate, imgUrl);
        this.categories = categories;
    }


    static fromObject(data) {
        const event = Event.fromObject(data);
        const categories = (data.categories || []).map(cat => Category.fromObject(cat));
        return new EventWithCategories(
            event.id,
            event.name,
            event.description,
            event.startDate,
            event.endDate,
            event.imgUrl,
            categories
        );
    }

    toObject() {
        const baseEvent = super.toObject();
        return {
            ...baseEvent,
            categories: this.categories.map(category => category.toObject()),
        };
    }

    isValid() {
        return super.isValid() && Array.isArray(this.categories);
    }
}
