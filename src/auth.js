export const auth0Config = {
  clientId: "rihDayJGTPtSuHb0v1AYYAGbARH750T1",
  domain: "alexrude.eu.auth0.com",
  optionsLock: {
    theme: {
      labeledSubmitButton: false,
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Vue.js_Logo.svg",
      primaryColor: "#2185D0",
    },
    languageDictionary: {
      title: "MyTravels",
    },
  },
};

export const tokenOptions = {
  id_token: localStorage.getItem('id_token'),
  api: 'firebase',
  scope: 'openid name email displayName',
  target: auth0Config.clientId,
};

export default class {
  constructor() {
    this.auth0 = new Auth0({ domain: auth0Config.domain, clientID: auth0Config.clientId});
    this.lock = new Auth0Lock(auth0Config.clientId, auth0Config.domain, auth0Config.optionsLock);
    this.tokenOptions = tokenOptions;
  }
}