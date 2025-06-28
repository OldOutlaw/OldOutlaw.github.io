// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    // Form validation rules
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

    // Add real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = contactForm.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.addEventListener('blur', () => validateField(field, validationRules[fieldName]));
            field.addEventListener('input', () => clearFieldError(field));
        }
    });

    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(this, validationRules);
    });

    // Auto-resize textarea
    const messageTextarea = contactForm.querySelector('textarea[name="message"]');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', autoResizeTextarea);
    }

    // Package selection enhancement
    const packageSelect = contactForm.querySelector('select[name="package"]');
    if (packageSelect) {
        packageSelect.addEventListener('change', function() {
            updateFormBasedOnPackage(this.value);
        });
    }

    // Wedding date picker enhancement
    const weddingDateInput = contactForm.querySelector('input[name="wedding-date"]');
    if (weddingDateInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        weddingDateInput.setAttribute('min', today);
        
        // Set maximum date to 2 years from now
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 2);
        weddingDateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
    }
}

// Field validation function
function validateField(field, rules) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field check
    if (rules.required && !value) {
        showFieldError(field, `${getFieldLabel(fieldName)} is required`);
        return false;
    }
    
    // Skip other validations if field is empty and not required
    if (!value && !rules.required) {
        return true;
    }
    
    // Length validation
    if (rules.minLength && value.length < rules.minLength) {
        showFieldError(field, `${getFieldLabel(fieldName)} must be at least ${rules.minLength} characters`);
        return false;
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
        showFieldError(field, `${getFieldLabel(fieldName)} must be no more than ${rules.maxLength} characters`);
        return false;
    }
    
    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
        showFieldError(field, rules.message);
        return false;
    }
    
    // Custom validation
    if (rules.validate && !rules.validate(value)) {
        showFieldError(field, rules.message);
        return false;
    }
    
    // Field is valid
    showFieldSuccess(field);
    return true;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Show field success
function showFieldSuccess(field) {
    field.classList.add('success');
    field.classList.remove('error');
    clearFieldError(field);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Get field label for error messages
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

// Handle form submission
function handleFormSubmission(form, validationRules) {
    let isValid = true;
    
    // Validate all fields
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
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // In a real implementation, you would send the data to your server
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Form data:', data);
        
        // Show success message
        showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon!', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Clear all field states
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.classList.remove('success', 'error');
        });
        
        // Scroll to top of form
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    }, 2000); // Simulate network delay
}

// Show form message
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert message at top of form
    const form = document.getElementById('contactForm');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Auto-resize textarea
function autoResizeTextarea(e) {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Update form based on package selection
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

// Add CSS for form validation styles
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
