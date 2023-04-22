import { Auth } from './auth.js';

class Signup {
  constructor() {
    this.addFormEventListener();
  }

  addFormEventListener() {
    document.getElementById('signup-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSignUp();
    });
  }

  async handleSignUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const response = await Auth.firebaseSignUp(email, password);

    if ('idToken' in response) {
      Cookies.set('session', JSON.stringify(response), {
        expires: new Date(
          new Date().getTime() + (Number(response.expiresIn) || 3600) * 1000
        ),
      });

      window.location.replace('/profile.html');
    }
  }
}

window.onload = (_event) => {
  new Signup();
};
