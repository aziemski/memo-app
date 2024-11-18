import { defineStore } from 'pinia'
import bcrypt from 'bcryptjs'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: [],
    currentUser: null,
  }),
  actions: {
    isEmailTaken(email) {
      return this.users.some((user) => user.email === email)
    },

    async signup(userData) {
      const newUser = await this.save(userData)
      this.currentUser = newUser

      return newUser
    },

    async save(userData) {
      const hashedPassword = await bcrypt.hash(userData.password, 10)

      const newUser = {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      }

      this.users.push(newUser)
      return newUser
    },

    login(email, password) {
      const user = this.users.find((u) => u.email === email)
      if (user && bcrypt.compareSync(password, user.password)) {
        this.currentUser = user
        return true
      }

      return false
    },

    logout() {
      this.currentUser = null
    },

    isAuthenticated() {
      return !!this.currentUser
    },

    loggedUser() {
      return this.currentUser
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'authStore',
        storage: localStorage,
      },
    ],
  },
})
