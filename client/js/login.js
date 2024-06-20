document.getElementById('userForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
   
  
    try {

      const response = await fetch('http://localhost:3000/secufleet/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      console.log('Response:', response);
  
      if (response.ok) {
        const result = await response.json();
        console.log('Logged in:', result);
        window.location.href = '../index.html'; // Redirect on successful login
      } else {
        const error = await response.json();
        console.error('Error creating user:', error);
      }
    } catch (err) {
      console.error('Request failed:', err);
    }
  });
  