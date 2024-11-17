import { store } from '@/store';
import bcrypt from 'bcryptjs';

const AuthService = {
  isEmailTaken(email) {
    return store.users.some((user) => user.email === email);
  },

  async signup(userData) {
    const newUser = await this.save(userData);
    store.currentUser = newUser;

    return newUser;
  },

  async save(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    store.users.push(newUser);
    return newUser;
  },

  login(email, password) {
    const user = store.users.find((u) => u.email === email);
    if (user && bcrypt.compareSync(password, user.password)) {
      store.currentUser = user;
      return true;
    }

    return false;
  },

  logout() {
    store.currentUser = null;
  },

  isAuthenticated() {
    return !!store.currentUser;
  },

  loggedUser() {
    return store.currentUser;
  },
};

export default AuthService;
