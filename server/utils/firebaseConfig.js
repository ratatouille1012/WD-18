import admin from "firebase-admin";
import fs from "fs";
const serviceAccount = JSON.parse(
    fs.readFileSync('../server/serviceAccountKey.json', 'utf8')
  );
   // Tệp JSON bạn tải từ Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "your-firebase-storage-bucket-url", // Ví dụ: "your-project-id.appspot.com"
});

const bucket = admin.storage().bucket();

export { bucket };
