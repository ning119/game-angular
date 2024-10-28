import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firestore: AngularFirestore) { }
  

    loginWithEmail(email: string, password: string) {
      return this.firestore.collection('user', ref => ref.where('email', '==', email).limit(1)).valueChanges();
    }
  
   
    // logout() {
    //   return this.afAuth.signOut();
    // }
  

    // getUser() {
    //   return this.afAuth.authState;
    // }
}
