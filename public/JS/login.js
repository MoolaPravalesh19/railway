document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('errorMessage');

  if (username === 'admin' && password === 'password123') {
      alert('Login successful!');
      errorMessage.style.display = 'none';
  } else {
      errorMessage.textContent = 'Invalid username or password.';
      errorMessage.style.display = 'block';
  }
});