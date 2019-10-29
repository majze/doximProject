import { Injectable, DoBootstrap } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getUsers(username, password){ 
    return this.db.collection('users',ref => ref.where("username", "==", username)
    .where("password", "==", password)).snapshotChanges();
   }

  getCores(coreName){
    return this.db.collection('cores').snapshotChanges();
  }

  // getAvatars(){
  //     return this.db.collection('/avatar').valueChanges()
  // }

  // getUser(userKey){
  //   return this.db.collection('users').doc(userKey).snapshotChanges();
  // }

  // updateUser(userKey, value){
  //   value.nameToSearch = value.name.toLowerCase();
  //   return this.db.collection('users').doc(userKey).set(value);
  // }

  // deleteUser(userKey){
  //   return this.db.collection('users').doc(userKey).delete();
  // }

<<<<<<< HEAD
  getUsers(username, password){ 
   // this.db.collection('users',ref => ref.where("username", "==", "admin").where("password", "==", "password"))
   // this.db.collection('users',ref => ref.where("username", "==", "sales").where("password", "==", "doxim"))
  return this.db.collection('users',ref => ref.where("username", "==", username)
   .where("password", "==", password)).snapshotChanges();
    // return this.db.collection('users',ref => ref.where("username", "==", username)
    // .where("password", "==", password))
    // .then(function() {
    //   console.log("Document successfully updated!");
  // })
  // .catch(function(error) {
  //     // The document probably doesn't exist.
  //     console.error("Error updating document: ", error);
  // });
  //   // return this.db.collection('users').snapshotChanges();
   }
  
   
    getCores(coreName){
      return this.db.collection('cores').snapshotChanges();
    }


=======
>>>>>>> 3a0963871e3df701cfa41c0087e9210f4e8a5cb5
  // searchUsers(searchValue){
  //   return this.db.collect5ion('users',ref => ref.where('nameToSearch', '>=', searchValue)
  //     .where('nameToSearch', '<=', searchValue + '\uf8ff'))
  //     .snapshotChanges()
  // }

  // searchUsersByAge(value){
  //   return this.db.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  // }


  // createUser(value, avatar){
  //   return this.db.collection('users').add({
  //     name: value.name,
  //     nameToSearch: value.name.toLowerCase(),
  //     surname: value.surname,
  //     age: parseInt(value.age),
  //     avatar: avatar
  //   });
  // }
}
