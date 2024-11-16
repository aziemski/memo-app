export default class Event {
    constructor(name, description = '', startDate, endDate = '', imgUrl = '') {
        this.id = Date.now();
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.imgUrl = imgUrl;
    }
}
