import firebase from 'firebase';

export default class {
  constructor(config) { 
    this.fb = firebase.initializeApp(config, "auth0"); 
  }
  set ref(userId) {
    console.log('userId32:', userId);
    this._ref = this.fb.database().ref('users/' + userId); 
  }
  get ref() { return this._ref }
  initDefaultDatabase(data) {
    console.log('initDefaultDatabase:');
    this._ref.once('value', snapshot => {
      if (!snapshot.val()) {
        this._ref.set(data);
      }
    });
  }
  changeDatabase(state) { 
    console.log('changeDatabase:', state);
    this._ref.update(state); 
  }
  onInitDatabase(mutations) {
    this._ref.once('value', snapshot => { 
      console.log('value', snapshot.val());
      mutations(snapshot.val());
    });
  }
  onChangeDatabase(mutations) {
    this._ref.on('child_changed',  snapshot => { 
      console.log('child_changed', snapshot.val());
      mutations(snapshot.val());
    });
  }
}

