import { Auth } from './auth.js';

class Login {
  constructor() {
    this.addFormEventListener();
  }

  addFormEventListener() {
    document.getElementById('login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSignIn();
    });
  }

  async handleSignIn() {
    // @TODO
    // The users are able to sign up but the sign in functionality is pending.
    // Make sure  potential candidates can log into the app and are redirected to the careers page.
  }
}

window.onload = (_event) => {
  new Login();
};
