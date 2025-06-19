document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-container');
    const fileInput = document.getElementById('avatar');
    const uploadBox = document.querySelector('.upload-box');
    const formContainer = document.getElementById('form-container');
    const ticketContainer = document.getElementById('ticket-container');
    const generateButton = document.getElementById('generate-ticket-btn');
  
    const ticketName = document.getElementById('ticket-name');
    const ticketEmail = document.getElementById('ticket-email');
    const ticketFullname = document.getElementById('ticket-fullname');
    const ticketGithub = document.getElementById('ticket-github');
    const ticketAvatar = document.getElementById('ticket-avatar');
  
    let uploadedFile = null;
  
    // ==============================
    // Drag & Drop Highlight Effect
    // ==============================
    uploadBox.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadBox.style.borderColor = 'var(--orange-500)';
    });
  
    uploadBox.addEventListener('dragleave', () => {
      uploadBox.style.borderColor = 'var(--neutral-500)';
    });
  
    uploadBox.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadBox.style.borderColor = 'var(--neutral-500)';
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    });
  
    // ==============================
    // File Input Handler
    // ==============================
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      handleFileUpload(file);
    });
  
    function handleFileUpload(file) {
      if (!file) return;
  
      const validTypes = ['image/jpeg', 'image/png'];
      const maxSize = 512000; // 500KB
  
      if (!validTypes.includes(file.type)) {
        alert('Please upload a JPG or PNG image.');
        return;
      }
  
      if (file.size > maxSize) {
        alert('File size must be under 500KB.');
        return;
      }
  
      uploadedFile = file;
  
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadIcon = uploadBox.querySelector('.icon-upload');
        uploadIcon.style.backgroundImage = `url(${e.target.result})`;
        uploadIcon.style.backgroundSize = 'cover';
        uploadIcon.style.backgroundPosition = 'center';
      };
      reader.readAsDataURL(file);
    }
  
    // ==============================
    // Form Submit Handler
    // ==============================
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const fullName = document.getElementById('full-name').value.trim();
      const email = document.getElementById('email').value.trim();
      const github = document.getElementById('github-username').value.trim();
  
      const errors = [];
  
      if (!fullName) errors.push('Full name is required.');
      if (!email) errors.push('Email address is required.');
      if (!github) errors.push('GitHub username is required.');
      if (!uploadedFile) errors.push('Please upload an avatar.');
  
      if (email && !validateEmail(email)) {
        errors.push('Enter a valid email address.');
      }
  
      if (github && !validateGithub(github)) {
        errors.push('GitHub username must start with @ and contain only letters, numbers, or hyphens.');
      }
  
      if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
      }
  
      generateTicket(fullName, email, github, uploadedFile);
    });
  
    // ==============================
    // Validation Helpers
    // ==============================
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    function validateGithub(username) {
      return /^@[a-zA-Z0-9-]+$/.test(username);
    }
  
    // ==============================
    // Generate Ticket UI
    // ==============================
    function generateTicket(fullName, email, github, avatarFile) {
      ticketName.textContent = fullName.split(' ')[0];
      ticketEmail.textContent = email;
      ticketFullname.textContent = fullName;
      ticketGithub.textContent = github;
  
      const reader = new FileReader();
      reader.onload = (e) => {
        ticketAvatar.src = e.target.result;
      };
      reader.readAsDataURL(avatarFile);
  
      formContainer.classList.add('hidden');
      ticketContainer.classList.remove('hidden');
    }

    // ==============================
// Responsive Bottom Pattern Switcher
// ==============================
const patternBottom = document.getElementById('pattern-s-bottom');

function updatePatternImage() {
  const isDesktop = window.matchMedia('(min-width: 900px)').matches;
  patternBottom.src = isDesktop
    ? './assets/images/pattern-squiggly-line-bottom-desktop.svg'
    : './assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg';
}

// Run on load and on resize
updatePatternImage();
window.addEventListener('resize', updatePatternImage);

  });
  