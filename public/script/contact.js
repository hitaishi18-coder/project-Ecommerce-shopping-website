// Wait until pura HTML load ho jaye
document.addEventListener("DOMContentLoaded", function () {
  
  //  Contact form pe submit event listener
  document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Page refresh hone se rokna

    //  Form ke input values lena
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    //  Data object banana
    const data = { name, email, subject, message };

    try {
      // Debugging ke liye console me show karna
      console.log("Form Data:", data); 

      //  Backend pe POST request bhejna
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Server ko batana ki hum JSON bhej rahe hain
        },
        body: JSON.stringify(data), // Data ko JSON string me convert karke bhejna
      });

      // Agar response OK aaya
      if (res.ok) {
        // Bootstrap toast show karna (success message ke liye)
        const toast = new bootstrap.Toast(document.getElementById("contactToast"));
        toast.show();

        //  Form ko reset kar dena
        e.target.reset();
      }
    } catch (err) {
      // Agar koi error ho jaye
      console.error("Error submitting form", err);
    }
  });
});
