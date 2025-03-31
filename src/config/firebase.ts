import { credential } from "firebase-admin";
import { getMessaging, Messaging } from "firebase-admin/messaging";
import { initializeApp } from "firebase-admin/app";

export let fm: Messaging;
export const initFirebase = () => {
  const path = __dirname.split("/");
  path.pop();
  path.pop();
  const GOOGLE_APPLICATION_CREDENTIALS =
    path.join("/") + "/sigue-adelante-radio-firebase.json";

  const app = initializeApp({
    credential: credential.cert(GOOGLE_APPLICATION_CREDENTIALS),
  });

  fm = getMessaging(app);
};
