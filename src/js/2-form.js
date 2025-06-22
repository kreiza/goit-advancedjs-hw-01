const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const emailField = form.elements.email;
const messageField = form.elements.message;

// Об'єкт стану форми
let formData = {
  email: '',
  message: ''
};

// Відновлюємо з localStorage при завантаженні
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    formData = JSON.parse(savedData);
    emailField.value = formData.email || '';
    messageField.value = formData.message || '';
  } catch (e) {
    // На випадок криво записаного json
    localStorage.removeItem(STORAGE_KEY);
  }
}

// Делегування input
form.addEventListener('input', (e) => {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// Submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});
