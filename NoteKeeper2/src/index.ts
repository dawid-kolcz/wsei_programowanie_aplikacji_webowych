import './main.scss';
import firebase from 'firebase';
import { firebaseConfig } from './config';

const hello = "Firebase example";
document.body.innerHTML = hello;

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const note = {
    title: 'Third note',
    content: 'Third note content from code'
}

// addNote(note);
async function addNote(note: any) {
    const res = await db.collection('notes').add(note)
}

// deleteNote('WGXlzJ0JIk0YjSU12Xxd');
async function deleteNote(id: string) {
    const res = await db.collection('notes').doc(id).delete();
}

// updateNote(
//     'Y6Ij0Ejtq7pcGGY1EhXm',
//     {
//         title: 'Updated note',
//         content: 'Never mind'
//     }
// );
async function updateNote(id: string, note: any) {
    const res = await db.collection('notes').doc(id).update(note);
}

// getNote('Y6Ij0Ejtq7pcGGY1EhXm').then(res => console.log(res));
async function getNote(id: string) {
    return db.collection('notes').doc(id).get().then(res => ({id: res.id, data: res.data()}))
}

getNotes().then(res => console.log(res));
async function getNotes() {
    return db.collection('notes').get().then(res => ({size: res.size, docs: res.docs}))
}



