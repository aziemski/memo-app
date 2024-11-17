<template>
  <div class="container my-5">
    <h1>Edit Category</h1>

    <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      {{ successMessage }}
      <button aria-label="Close" class="btn-close" type="button" @click="clearMessage('successMessage')"></button>
    </div>

    <div v-if="errors.length" class="alert alert-danger alert-dismissible fade show" role="alert">
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
      <button aria-label="Close" class="btn-close" type="button" @click="clearMessage('errors')"></button>
    </div>

    <form @submit.prevent="updateCategory">
      <div class="form-group">
        <label for="name">Category Name</label>
        <input
            id="name"
            v-model="category.name"
            class="form-control"
            required
            type="text"
        />
      </div>

      <div class="form-group d-flex align-items-center mt-3">
        <input
            id="color"
            v-model="category.color"
            :disabled="disableColor"
            class="form-control form-control-color me-2"
            style="width: 50px; height: 35px;"
            type="color"
        />
        <div class="form-check">
          <input
              id="disableColor"
              v-model="disableColor"
              class="form-check-input"
              type="checkbox"
          />
          <label class="form-check-label" for="disableColor">No Color</label>
        </div>
      </div>

      <div class="d-flex justify-content-end mt-3">
        <button
            class="btn btn-danger me-2"
            @click="deleteCategory">Delete
        </button>
        <router-link class="btn btn-secondary me-2"
                     to="/categories">Cancel
        </router-link>
        <button class="btn btn-primary"
                @click="updateCategory">Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import eventService from "@/services/EventService";

export default {
  data() {
    return {
      category: {
        id: null,
        name: "",
        color: "#d3d3d3",
      },
      disableColor: false,
      successMessage: null,
      errors: [],
    };
  },
  created() {
    this.loadCategory();
  },
  methods: {
    loadCategory() {
      const categoryId = parseInt(this.$route.params.id, 10);
      const allCategories = eventService.getCategories();
      const foundCategory = allCategories.find((cat) => cat.id === categoryId);

      if (foundCategory) {
        this.category = {...foundCategory};
        this.disableColor = !this.category.color;
      } else {
        this.errors.push("Category not found.");
      }
    },
    updateCategory() {
      this.errors = [];

      if (!this.category.name.trim()) {
        this.errors.push("Category name is required.");
        return;
      }

      const allCategories = eventService.getCategories();
      const updatedCategories = allCategories.map((cat) =>
          cat.id === this.category.id
              ? {...this.category, color: this.disableColor ? null : this.category.color}
              : cat
      );

      try {
        eventService.saveCategories(updatedCategories);
      } catch (error) {
        this.errors.push(error.message);
        return;
      }

      this.successMessage = "Category updated successfully!";
    },

    deleteCategory() {
      const categories = eventService.getCategories()
          .filter((cat) => cat.id !== this.category.id);
      try {
        eventService.saveCategories(categories);
      } catch (error) {
        this.errors.push(error.message);
        return;
      }

      this.$router.push({name: "CategoryList"});
    },

    clearMessage(type) {
      if (type === "successMessage") this.successMessage = null;
      if (type === "errors") this.errors = [];
    },
  },
};
</script>
