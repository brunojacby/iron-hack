import { Auth } from './auth.js';

class Profile {
  constructor() {
    this.session = Auth.getSession();
    this.profile = null;
    this.addFormEventListener();
    this.handleGetProfile();
  }

  async saveProfile() {
    const response = await fetch(
      `https://iron-hack-challenge-default-rtdb.firebaseio.com/profiles/${this.session.localId}.json?auth=${this.session.idToken}`,
      {
        method: 'PUT',
        body: JSON.stringify(this.profile),
      }
    );
    return response.json();
  }

  async getProfile() {
    const response = await fetch(
      `https://iron-hack-challenge-default-rtdb.firebaseio.com/profiles/${this.session.localId}.json?auth=${this.session.idToken}`
    );
    return response.json();
  }

  addFormEventListener() {
    document.getElementById('profile-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSaveProfile();
    });
  }

  showProfileSpinner() {
    document.getElementById('profile-spinner').classList.remove('d-none');
  }

  removeProfileSpinner() {
    document.getElementById('profile-spinner').classList.add('d-none');
  }

  showProfileForm() {
    document.getElementById('profile-form').classList.remove('d-none');
  }

  hideProfileForm() {
    document.getElementById('profile-form').classList.add('d-none');
  }

  updateFormData() {
    // @TODO
    // If the user has already completed their profile,
    // the form must be filled in with that information
    // and the button should say “Update profile”.
  }

  async handleSaveProfile() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const coverLetter = document.getElementById('cover-letter').value;
    this.profile = { name, surname, email, coverLetter };

    const profile = await this.saveProfile();
    if (profile.name) {
      window.location.replace('/careers.html');
    }
  }

  async handleGetProfile() {
    this.showProfileSpinner();

    this.profile = await this.getProfile();

    if (this.profile && this.profile.name) {
      this.updateFormData();
    }

    this.removeProfileSpinner();
    this.showProfileForm();
  }
}

window.onload = (_event) => {
  new Profile();
};
