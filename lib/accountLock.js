import * as state from "../store";
import { auth } from "../firebase";

export default function accountLock() {
  state.Profile.accountLock = true;
  let email = state.Profile.useremail;
  let uid = state.Profile.uid;
  auth()
    .updateUser(uid, {
      disabled: true
    })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      // ("Successfully updated user", userRecord.toJSON());
    })
    .catch(function(error) {
      // console.log("Error updating user:", error);
    });
}
