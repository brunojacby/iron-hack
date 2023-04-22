import { Auth } from './auth.js';

class Careers {
  constructor() {
    this.session = Auth.getSession();
    this.careers = null;
    this.userApplications = null;
    this.handleGetCareers();
  }

  async getCareers() {
    const response = await fetch(
      'https://iron-hack-challenge-default-rtdb.firebaseio.com/careers.json'
    );
    return response.json();
  }

  async getUserApplications() {
    if (!this.session) {
      return null;
    }

    const response = await fetch(
      `https://iron-hack-challenge-default-rtdb.firebaseio.com/applications/${this.session.localId}.json?auth=${this.session.idToken}`
    );
    return response.json();
  }

  async saveApplication(careerId) {
    const response = await fetch(
      `https://iron-hack-challenge-default-rtdb.firebaseio.com/applications/${this.session.localId}/${careerId}.json?auth=${this.session.idToken}`,
      { method: 'PUT', body: true }
    );
    return response.json();
  }

  isAuthenticated() {
    return Boolean(this.session);
  }

  userAlreadyApplied(careerId) {
    return Boolean(this.userApplications[careerId]);
  }

  showCareersSpinner() {
    document.getElementById('careers-spinner').classList.remove('d-none');
  }

  hideCareersSpinner() {
    document.getElementById('careers-spinner').classList.add('d-none');
  }

  async handleUserApplication(careerId) {
    console.log(careerId);
    // @TODO
    // The users should be able to apply to a position.
    // After that, the “Apply” button should be disabled.
  }

  careerToElement(career) {
    const card = document.createElement('div');
    card.innerHTML = `
      <div id="${career.id}" class="col-12 col-md-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${career.position}</h5>
            <p class="card-text">
              ${career.description}
            </p>
            <div class="d-flex align-items-end h-100">
            <button id="${career.id}-btn" class="btn btn-dark">Apply</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    `;
    const cardButton = card.getElementsByTagName('button')[0];

    // @TODO
    // When the open positions are displayed,
    // the “Apply” button should be disabled
    // if the user is not logged in or if it has already applied.

    cardButton.addEventListener('click', () => {
      this.handleUserApplication(career.id);
    });

    return card.firstElementChild;
  }

  async handleGetCareers() {
    this.showCareersSpinner();

    const [careers, userApplications] = await Promise.all([
      this.getCareers(),
      this.getUserApplications(),
    ]);

    this.careers = careers;
    this.userApplications = userApplications || {};

    Object.keys(this.careers).forEach((key) => {
      document
        .getElementById('careers-list')
        .appendChild(this.careerToElement({ id: key, ...this.careers[key] }));
    });

    this.hideCareersSpinner();
  }
}

window.onload = (_event) => {
  new Careers();
};
