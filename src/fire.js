import firebase from 'firebase';

export default class {
  constructor(config) { 
    this.fb = firebase.initializeApp(config, "auth0"); 
  }
  set ref(userId) {
    console.log('userId32:', userId);
    this._ref = this.fb.database().ref('users/' + userId); 
  }
  initDatabase(data) {
    console.log('initDatabase:', data);
    this._ref.set(data); 
  }
  changeState(state) { 
    console.log('changeState:', state);
    this._ref.update(state); 
  }
  onInit(mutations, defaultDB) {
    console.log('onInit!');
    const self = this;
    const dataHandler = snapshot => {
      const data = snapshot.val();
      if (data) {
        console.log('onInit!2');
        mutations(data);
        self._ref.off('value', dataHandler);
      } else {
        console.log('onInit!3');
        self.initDatabase(defaultDB);
      }
    };
    this._ref.on('value', dataHandler);
  }
  onChange(mutations) {
    console.log('onChange!');
    const dataHandler = snapshot => {
      console.log('onChange!2');
      mutations(snapshot.val());
    };
    this._ref.on('child_changed', dataHandler);
  }
}




// import firebase from 'firebase';

// const config = {
//   apiKey: "AIzaSyDKT3WAIkuhdp2AD0HWEET6D1W-JB40pXs",
//   authDomain: "mytravels-c9932.firebaseapp.com",
//   databaseURL: "https://mytravels-c9932.firebaseio.com",
//   storageBucket: "mytravels-c9932.appspot.com",
//   messagingSenderId: "635746219861"
// };

// export const fb = firebase.initializeApp(config, "auth0");

// export const fbRef = key => fb.database().ref('users/' + key);

// export const newDB = (key, data) => fb.database().ref('users/' + key).set(data);

// export const changeState = (key, newState) => fb.database().ref('users/' + key).update(newState);

// export const onAddDB = (key, mutations, defaultDb) => {
//   const ref = fbRef(key);
//   const dataHandler = snapshot => {
//     const data = snapshot.val();
//     if (data) {
//       mutations(data);
//       ref.off('value', dataHandler);
//     } else {
//       newDB(key, defaultDb);
//     }
//   };
//   ref.on('value', dataHandler);
// };

// export const onChangeState = () => {}