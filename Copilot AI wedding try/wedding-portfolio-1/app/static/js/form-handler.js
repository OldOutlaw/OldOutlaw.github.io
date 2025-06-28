// filepath: /wedding-portfolio/wedding-portfolio/app/static/js/form-handler.js
// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid name (letters only, minimum 2 characters)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: false,
            pattern: /^[\+]?[1-9][\d]{0,15}$/,
            message: 'Please enter a valid phone number'
        },
        'wedding-date': {
            required: false,
            validate: function(value) {
                if (!value) return true;
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate >= today;
            },
            message: 'Wedding date must be in the future'
        },
        venue: {
            required: false,
            minLength: 2,
            message: 'Please enter a valid venue name'
        },
        package: {
            required: false
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: 'Please enter a message (10-1000 characters)'
        }
    };

    Object.keys(validationRules).forEach(fieldName => {
        const field = contactForm.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.addEventListener('blur', () => validateField(field, validationRules[fieldName]));
            field.addEventListener('input', () => clearFieldError(field));
        }
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(this, validationRules);
    });

    const messageTextarea = contactForm.querySelector('textarea[name="message"]');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', autoResizeTextarea);
    }

    const packageSelect = contactForm.querySelector('select[name="package"]');
    if (packageSelect) {
        packageSelect.addEventListener('change', function() {
            updateFormBasedOnPackage(this.value);
        });
    }

    const weddingDateInput = contactForm.querySelector('input[name="wedding-date"]');
    if (weddingDateInput) {
        const today = new Date().toISOString().split('T')[0];
        weddingDateInput.setAttribute('min', today);
        
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 2);
        weddingDateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
    }
}

function validateField(field, rules) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    
    clearFieldError(field);
    
    if (rules.required && !value) {
        showFieldError(field, `${getFieldLabel(fieldName)} is required`);
        return false;
    }
    
    if (!value && !rules.required) {
        return true;
    }
    
    if (rules.minLength && value.length < rules.minLength) {
        showFieldError(field, `${getFieldLabel(fieldName)} must be at least ${rules.minLength} characters`);
        return false;
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
        showFieldError(field, `${getFieldLabel(fieldName)} must be no more than ${rules.maxLength} characters`);
        return false;
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
        showFieldError(field, rules.message);
        return false;
    }
    
    if (rules.validate && !rules.validate(value)) {
        showFieldError(field, rules.message);
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function showFieldSuccess(field) {
    field.classList.add('success');
    field.classList.remove('error');
    clearFieldError(field);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function getFieldLabel(fieldName) {
    const labels = {
        'name': 'Name',
        'email': 'Email',
        'phone': 'Phone',
        'wedding-date': 'Wedding Date',
        'venue': 'Venue',
        'package': 'Package',
        'message': 'Message'
    };
    return labels[fieldName] || fieldName;
}

function handleFormSubmission(form, validationRules) {
    let isValid = true;
    
    Object.keys(validationRules).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            if (!validateField(field, validationRules[fieldName])) {
                isValid = false;
            }
        }
    });
    
    if (!isValid) {
        showFormMessage('Please correct the errors above', 'error');
        return;
    }
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Form data:', data);
        
        showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon!', 'success');
        
        form.reset();
        
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.classList.remove('success', 'error');
        });
        
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    }, 2000);
}

function showFormMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    const form = document.getElementById('contactForm');
    form.insertBefore(messageDiv, form.firstChild);
    
    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

function autoResizeTextarea(e) {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function updateFormBasedOnPackage(packageValue) {
    const messageField = document.querySelector('textarea[name="message"]');
    if (!messageField) return;
    
    const packageMessages = {
        'essential': 'I\'m interested in the Essential package ($1,200). Please provide more details about what\'s included and availability for my wedding date.',
        'premium': 'I\'m interested in the Premium package ($2,500). This looks perfect for our wedding! Can we schedule a consultation?',
        'luxury': 'I\'m interested in the Luxury package ($4,000). We want the full cinematic experience for our special day.',
        'custom': 'I\'m interested in a custom package. Let\'s discuss my specific needs and create something unique for our wedding.'
    };
    
    if (packageMessages[packageValue] && !messageField.value.trim()) {
        messageField.value = packageMessages[packageValue];
        autoResizeTextarea({ target: messageField });
    }
}

const formStyles = document.createElement('style');
formStyles.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #e74c3c;
        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
    }
    
    .form-group input.success,
    .form-group select.success,
    .form-group textarea.success {
        border-color: #27ae60;
        box-shadow: 0 0 0 2px rgba(39, 174, 96, 0.2);
    }
    
    .error-message {
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 0.5rem;
        display: block;
    }
    
    .form-message {
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        font-weight: 500;
    }
    
    .form-message.success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .form-message.error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    .contact-form button[type="submit"]:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    .form-group textarea {
        min-height: 120px;
        resize: vertical;
    }
`;
document.head.appendChild(formStyles);