export default class Category {

    constructor(id, name, color = "") {
        this.id = id;
        this.name = name;
        this.color = color;
    }

    static fromObject(data) {
        return new Category(data.id, data.name, data.color || "");
    }

    toObject() {
        return {
            id: this.id,
            name: this.name,
            color: this.color,
        };
    }

    isValid() {
        return !!this.name && typeof this.name === "string" && this.name.trim().length > 0;
    }
}
