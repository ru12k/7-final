import firebase from 'firebase';

export default class {
  constructor(config) { this.fb = firebase.initializeApp(config, "auth0"); }
  set userId(userId) { 
    this._userId = userId;
    this._userRef = this._userRef = this.fb.database().ref('users/' + userId);
  }
  set dataRef(dataId) {
    const userId = this._userId; 
    this._dataRef = this.fb.database().ref('users/' + userId + '/' + dataId); 
  }
  get dataRef() { return this._dataRef; }
  initDefaultDatabase(data) {
    this._userRef.once('value', snapshot => {
      if (!snapshot.val()) {
        this._userRef.set(data);
      }
    });
  }
  changeDatabase(id) {
    const self = this;
    this.dataRef = id;
    const state = this._dataRef.once('value')
    .then( snap => !snap.val().status )
    .then( status => self._dataRef.update({ status }));
  }
  onInitDatabase() {
    return this._userRef.once('value').then(snapshot => snapshot.val());
  }
  onChangeDatabase(mutation) {
    this._userRef.on('child_changed', snapshot => mutation(snapshot.val().id, snapshot.val().status));
  }
}

