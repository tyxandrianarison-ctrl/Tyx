const STORAGE_KEY = 'orientationProfiles';
const tabButtons = document.querySelectorAll('.tab-btn');
const authForms = document.querySelectorAll('.auth-form');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginMessage = document.getElementById('loginMessage');
const signupMessage = document.getElementById('signupMessage');

function getProfiles() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveProfile(profile) {
  const profiles = getProfiles();
  profiles.push(profile);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

function showForm(formName) {
  authForms.forEach((form) => form.classList.add('hidden'));
  tabButtons.forEach((btn) => btn.classList.remove('active'));

  if (formName === 'signup') {
    signupForm.classList.remove('hidden');
    document.querySelector('[data-form="signup"]').classList.add('active');
  } else {
    loginForm.classList.remove('hidden');
    document.querySelector('[data-form="login"]').classList.add('active');
  }
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => showForm(button.getAttribute('data-form')));
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const profiles = getProfiles();
  const profile = profiles.find((item) => item.email === email && item.password === password);

  if (profile) {
    loginMessage.textContent = 'Connexion réussie.';
    loginMessage.style.color = 'green';
    window.location.href = 'dashboard.html';
  } else {
    loginMessage.textContent = 'Email ou mot de passe incorrect.';
    loginMessage.style.color = 'crimson';
  }
});

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const serie = document.getElementById('serie').value;

  if (name.length < 2 || password.length < 6) {
    signupMessage.textContent = 'Le nom doit contenir au moins 2 caractères et le mot de passe 6 caractères.';
    signupMessage.style.color = 'crimson';
    return;
  }

  const profiles = getProfiles();
  if (profiles.some((item) => item.email === email)) {
    signupMessage.textContent = 'Cet email existe déjà.';
    signupMessage.style.color = 'crimson';
    return;
  }

  saveProfile({ name, email, password, serie });
  signupMessage.textContent = 'Profil créé avec succès.';
  signupMessage.style.color = 'green';
  window.location.href = 'dashboard.html';
});
