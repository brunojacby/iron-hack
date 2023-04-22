export class Auth {
  static WHITELIST = ['/', '/index.html', '/careers.html'];
  static IDENTITY_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';
  static PROJECT_KEY = 'AIzaSyCA_A6HqwadiQEVaAJ1WSsZvVkXgZ9YaNY';

  constructor() {}

  static getSession() {
    const session = Cookies.get('session');

    // Unauthorized request or expired session
    if (!session && !Auth.WHITELIST.includes(window.location.pathname)) {
      window.location.replace('/login.html');
      return;
    }

    return session ? JSON.parse(session) : null;
  }

  static async firebaseSignUp(email, password) {
    const response = await fetch(
      `${Auth.IDENTITY_URL}:signUp?key=${Auth.PROJECT_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );

    return response.json();
  }

  static async firebaseSignIn(email, password) {
    const response = await fetch(
      `${Auth.IDENTITY_URL}:signInWithPassword?key=${Auth.PROJECT_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );

    return response.json();
  }

  static signOut() {
    Cookies.remove('session');
    window.location.replace('/index.html');
  }
}
