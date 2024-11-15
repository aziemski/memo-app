<template>
  <nav class="navbar navbar-expand navbar-light bg-light sticky-top">
    <div class="container">
      <a class="navbar-brand" href="/">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>Memo App</title>
          <g fill="#000000">
            <path
              d="M9.17070571,17 C9.58254212,15.8348076 10.6937812,15 12,15 C13.3062188,15 14.4174579,15.8348076 14.8292943,17 L20,17 L21,18 L20,19 L14.8292943,19 C14.4174579,20.1651924 13.3062188,21 12,21 C10.6937812,21 9.58254212,20.1651924 9.17070571,19 L3,19 L4,18 L3,17 L9.17070571,17 Z M12,19 C12.5522847,19 13,18.5522847 13,18 C13,17.4477153 12.5522847,17 12,17 C11.4477153,17 11,17.4477153 11,18 C11,18.5522847 11.4477153,19 12,19 Z M14,12 L12,14 L10,12 L7,12 C5.8954305,12 5,11.1045695 5,10 L5,5 C5,3.8954305 5.8954305,3 7,3 L17,3 C18.1045695,3 19,3.8954305 19,5 L19,10 C19,11.1045695 18.1045695,12 17,12 L14,12 Z M7,5 L7,10 L11,10 L12,11 L13,10 L17,10 L17,5 L7,5 Z"
            />
          </g>
        </svg>
      </a>

      <ul class="navbar-nav me-auto">
        <li v-if="isAuthenticated" class="d-flex align-items-center">
          <button @click="addEvent" class="btn btn-sm btn-primary">+ Add Event</button>
        </li>


        <li v-if="isHome" class="nav-item dropdown">
          <form id="categoryForm" @submit.prevent="applyFilters">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="categoryDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filter
            </a>
            <ul
              class="dropdown-menu p-3"
              aria-labelledby="categoryDropdown"
              style="min-width: 200px;"
              data-bs-auto-close="outside"
            >
              <li
                v-for="category in categories"
                :key="category.id"
                class="dropdown-item"
              >
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="category.id"
                    :id="'category' + category.id"
                    v-model="selectedCategories"
                  />
                  <label
                    class="form-check-label"
                    :for="'category' + category.id"
                  >
                    {{ category.name }}
                  </label>
                </div>
              </li>
              <li class="dropdown-divider"></li>
              <li class="d-flex justify-content-end gap-2">
                <button
                  @click="clearFilters"
                  class="btn btn-sm btn-secondary"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  class="btn btn-sm btn-primary"
                >
                  Apply
                </button>
              </li>
            </ul>
          </form>
        </li>
      </ul>

      <ul class="navbar-nav ms-auto">
        <li v-if="isHome" class="nav-item">
          <button @click="toggleView" class="nav-link btn btn-sm">
            {{ isListView ? 'Timeline' : 'List' }}
          </button>
        </li>
        <li class="nav-item">
          <a v-if="isAuthenticated" href="/me" class="nav-link btn btn-primary">
            Me
          </a>
          <a v-else href="/login" class="nav-link btn btn-primary">
            Login
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { store } from '@/store';
import eventService from '@/services/EventService';

export default {
  name: "AppNavbar",
  data() {
    return {
      isAuthenticated: false,
      isHome: true,
      categories: [],
      selectedCategories: []
    };
  },
  created() {
    this.loadCategories();
  },
  computed: {
    isListView() {
      return store.isListView;
    }
  },
  methods: {
    loadCategories() {
      this.categories = eventService.getCategories();
    },
    toggleView() {
      store.toggleView();
    },
    addEvent() {
      console.log("Add event");
    },
    applyFilters() {
      console.log("Filters applied:", this.selectedCategories);
    },
    clearFilters() {
      this.selectedCategories = [];
      console.log("Filters cleared.");
    }
  }
};
</script>
