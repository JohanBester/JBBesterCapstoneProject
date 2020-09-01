//***  Get the FMA Data from Firestore ***
import * as state from "../store";
import { db } from "./firebase";
// Constant for Firebase Firestorm DB
const coll = db.collection("FMAdata");

export default function getfirestoredata() {
  state.Fmaresults.fmaFirestormData = [];
  coll
    .get()
    .then(snapshot =>
      snapshot.docs.forEach(doc => {
        state.Fmaresults.fmaFirestormData.push(doc.data());
      })
    )
    .catch(err => {
      console.log("error", err);
    });
}
