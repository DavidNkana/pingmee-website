// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import { getAuth, sendSignInLinkToEmail } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
  import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

  // Function to update waitlist count
  async function updateWaitlistCount() {
      try {
          const waitlistSnapshot = await getDocs(collection(db, "waitlist"));
          const count = waitlistSnapshot.size; // Number of documents in "waitlist"
          const countNumber = document.getElementById("count-number");
          if (countNumber) {
              countNumber.textContent = count;
          }
      } catch (error) {
          console.error("Error fetching waitlist count:", error);
      }
  }

// Call it once on page load
updateWaitlistCount();

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAfrhf762c282ZMd05kAqH8bvpfbsM0J38",
    authDomain: "pingmee-waitlist-f9437.firebaseapp.com",
    projectId: "pingmee-waitlist-f9437",
    storageBucket: "pingmee-waitlist-f9437.firebasestorage.app",
    messagingSenderId: "704568966288",
    appId: "1:704568966288:web:3876ec448dab9f6d22ac15"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const actionCodeSettings = {
    url: 'http://127.0.0.1:5500/thanks.html',
    handleCodeInApp: true,
  };

//   inputs
  const sendEmailBtn = document.getElementById('submit');
  const email = document.getElementById('email');

  sendEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // alert(`Thank you for joining our waitlist! We will notify you at ${email.value} when we launch.`);

      sendSignInLinkToEmail(auth, email.value, actionCodeSettings)
  .then(() => {
      window.localStorage.setItem('emailForSignIn', email.value);
      alert("You're almost there, please check your email to complete the sign-up process!");

      // Update the waitlist count dynamically
      updateWaitlistCount();
  })

    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Something went wrong, please try again later!");
        // ...
    });
});
