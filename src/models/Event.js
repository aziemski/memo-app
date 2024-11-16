export default class Event {

    constructor(id, name, description = "", startDate, endDate = "", imgUrl = "") {
        this.id = id || Date.now();
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.imgUrl = imgUrl;
    }

    static fromObject(data) {
        return new Event(
            data.id,
            data.name,
            data.description || "",
            data.startDate,
            data.endDate || "",
            data.imgUrl || "",
        );
    }

    toObject() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            startDate: this.startDate,
            endDate: this.endDate,
            imgUrl: this.imgUrl,
        };
    }

    isValid() {
        return (
            !!this.name &&
            typeof this.name === "string" &&
            this.name.trim().length > 0 &&
            !!this.startDate
        );
    }
}
