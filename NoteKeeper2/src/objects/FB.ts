import firebase from 'firebase';
import { Note } from './Notes';
import { firebaseConfig } from '../config';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();

// Return: doc id as string
export async function addNote(note: Note): Promise<string> {
    const res = await db.collection('notes').add(note);
    return res.id;
}

export async function deleteNote(id: string) {
    const res = await db.collection('notes').doc(id).delete();
}

export async function updateNote(id: string, note: Note) {
    const res = await db.collection('notes').doc(id).update(note);
}

export async function getNote(id: string) {
    return db.collection('notes').doc(id).get().then(res => ({id: res.id, data: res.data()}))
}

export async function getNotes(){
    const snapshot = await db.collection("notes").get();
    return snapshot.docs.map(doc => doc.data());
}