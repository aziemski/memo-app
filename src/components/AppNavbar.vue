<template>
  <nav class="navbar navbar-expand navbar-light bg-light sticky-top">
    <div class="container">
      <router-link :to="{ name: 'HomePage' }" class="navbar-brand">
        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <title>Memo App</title>
          <g fill="#000000">
            <path
                d="M9.17070571,17 C9.58254212,15.8348076 10.6937812,15 12,15 C13.3062188,15 14.4174579,15.8348076 14.8292943,17 L20,17 L21,18 L20,19 L14.8292943,19 C14.4174579,20.1651924 13.3062188,21 12,21 C10.6937812,21 9.58254212,20.1651924 9.17070571,19 L3,19 L4,18 L3,17 L9.17070571,17 Z M12,19 C12.5522847,19 13,18.5522847 13,18 C13,17.4477153 12.5522847,17 12,17 C11.4477153,17 11,17.4477153 11,18 C11,18.5522847 11.4477153,19 12,19 Z M14,12 L12,14 L10,12 L7,12 C5.8954305,12 5,11.1045695 5,10 L5,5 C5,3.8954305 5.8954305,3 7,3 L17,3 C18.1045695,3 19,3.8954305 19,5 L19,10 C19,11.1045695 18.1045695,12 17,12 L14,12 Z M7,5 L7,10 L11,10 L12,11 L13,10 L17,10 L17,5 L7,5 Z"
            />
          </g>
        </svg>
      </router-link>

      <ul class="navbar-nav me-auto">
        <li v-if="isAuthenticated" class="d-flex align-items-center">
          <button class="btn btn-sm btn-primary" @click="addEvent">+ Add Event</button>
        </li>

        <li v-if="isHomePage" class="nav-item dropdown">
          <form id="categoryForm" @submit.prevent="applyFilters">
            <a
                id="categoryDropdown"
                aria-expanded="false"
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
            >
              Filter
            </a>
            <ul
                aria-labelledby="categoryDropdown"
                class="dropdown-menu p-3"
                data-bs-auto-close="outside"
                style="min-width: 200px;"
            >
              <li
                  v-for="category in categories"
                  :key="category.id"
                  class="dropdown-item"
              >
                <div class="form-check">
                  <input
                      :id="'category' + category.id"
                      v-model="selectedCategories"
                      :value="category.id"
                      class="form-check-input"
                      type="checkbox"
                  />
                  <label
                      :for="'category' + category.id"
                      class="form-check-label"
                  >
                    {{ category.name }}
                  </label>
                </div>
              </li>

              <li class="dropdown-divider"></li>
              <li>
                <div class="mb-2">
                  <label class="form-label" for="fromDate">From</label>
                  <input
                      id="fromDate"
                      v-model="timeRange.from"
                      class="form-control"
                      type="date"
                  />
                </div>
                <div>
                  <label class="form-label" for="toDate">To</label>
                  <input
                      id="toDate"
                      v-model="timeRange.to"
                      class="form-control"
                      type="date"
                  />
                </div>
              </li>


              <li class="dropdown-divider"></li>
              <li class="d-flex justify-content-end gap-2">
                <button
                    class="btn btn-sm btn-secondary"
                    @click="clearFilters"
                >
                  Clear
                </button>
                <button
                    class="btn btn-sm btn-primary"
                    type="submit"
                >
                  Apply
                </button>
              </li>
            </ul>
          </form>
        </li>
      </ul>

      <ul class="navbar-nav ms-auto">
        <li v-if="isHomePage" class="nav-item">
          <button class="nav-link btn btn-sm" @click="toggleView">
            {{ isListView ? 'Timeline' : 'List' }}
          </button>
        </li>

        <li class="d-flex align-items-center">
          <button class="btn btn-outline-danger" @click="seedEvents">Seed Events</button>
        </li>
        <li class="d-flex align-items-center">
          <button class="btn btn-outline-danger" @click="toggleAuth"> {{
              isAuthenticated ? 'Logout' : 'Login'
            }}
          </button>
        </li>
        <li class="nav-item">
          <router-link v-if="isAuthenticated" class="nav-link btn btn-primary" to="/me">
            Me
          </router-link>
          <router-link v-else class="nav-link btn btn-primary" to="/login">
            Login
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import AuthService from "@/services/authService";
import {store} from '@/store';
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import eventService from '@/services/EventService';

export default {
  name: "AppNavbar",
  setup() {
    const route = useRoute();
    const isHomePage = computed(() => route.name === 'HomePage');
    return {
      isHomePage,
    }
  },
  data() {
    return {
      categories: [],
      selectedCategories: store.filters.selectedCategories,
      timeRange: {...store.filters.timeRange},
    }
  },
  created() {
    this.loadCategories();
  },
  computed: {
    isListView() {
      return store.isListView;
    },
    isAuthenticated() {
      return AuthService.isAuthenticated();
    },
  },
  methods: {
    loadCategories() {
      this.categories = eventService.getCategories();
    },
    toggleView() {
      store.toggleView();
    },
    toggleAuth() {
      if (this.isAuthenticated) {
        AuthService.logout()
      } else {
        AuthService.login('a@a.com', 'asdfasdf')
      }
    },
    addEvent() {
      this.$router.push({name: "AddEvent"});
    },
    applyFilters() {
      store.setFilterSelectedCategories(this.selectedCategories);
      store.setFilterTimeRange(this.timeRange);
    },
    clearFilters() {
      this.selectedCategories = []
      this.timeRange = {from: null, to: null};
      store.clearFilters();
    },
    seedEvents() {
      eventService.seedData();
      window.location.reload();
    }
  }
};
</script>
