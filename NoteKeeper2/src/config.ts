export const firebaseConfig = {
  apiKey: "AIzaSyCJeBTEJTIgXcgVCFjvNIH1HmabPOtHezQ",
  authDomain: "notekeeper2-964e6.firebaseapp.com",
  projectId: "notekeeper2-964e6",
  storageBucket: "notekeeper2-964e6.appspot.com",
  messagingSenderId: "137650469690",
  appId: "1:137650469690:web:34d94ad20c0bcd58c42e03"
};

export enum StorageType{
  Firebase,
  LocalStorage,
}

export const globalStorage = StorageType.LocalStorage;