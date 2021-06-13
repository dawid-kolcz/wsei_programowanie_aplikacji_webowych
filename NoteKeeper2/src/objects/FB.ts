import firebase from 'firebase';
import { Note, NoteWithID } from './Notes';
import { firebaseConfig } from '../config';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();

export async function addNote(note: Note) {
    const res = await db.collection('notes').add(note);
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

export async function getNotes() {
    return db.collection('notes').get().then(res => ({size: res.size, docs: res.docs}))
}