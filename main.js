// service_3u2gov9
// template_z3nx5da

// ===== DECLARE ALL VARIABLES ONCE AT THE TOP =====
const overlay = document.getElementById('overlay');
const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.querySelector('.nav-bar');
const navLinks = document.querySelectorAll('.nav-bar a');

// 🔄 ADDED: EmailJS Configuration for unified template
const EMAILJS_CONFIG = {
    serviceId: 'service_3u2gov9',  // Replace with your service ID
    templateId: 'template_z3nx5da', // Replace with your unified template ID
};

// ===== CUSTOMS PAGE NAVIGATION FUNCTIONS =====
function showMainSection(section) {
    // Hide all main sections
    const allSections = document.querySelectorAll('.main-section');
    allSections.forEach(sec => sec.classList.remove('active'));

    // Remove active class from all main buttons
    const allMainButtons = document.querySelectorAll('.main-btn');
    allMainButtons.forEach(btn => btn.classList.remove('active'));

    // Show selected main section
    const selectedSection = document.getElementById(section + '-section');
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Add active class to clicked button
    event.target.classList.add('active');

    // Smooth scroll to content
    if (selectedSection) {
        selectedSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showProcess(process) {
    // Hide all process contents
    const allProcesses = document.querySelectorAll('.process-content');
    allProcesses.forEach(content => content.classList.remove('active'));

    // Remove active class from all process buttons
    const allProcessButtons = document.querySelectorAll('.process-btn');
    allProcessButtons.forEach(btn => btn.classList.remove('active'));

    // Show selected process content
    const selectedProcess = document.getElementById(process + '-process');
    if (selectedProcess) {
        selectedProcess.classList.add('active');
    }

    // Add active class to clicked button
    event.target.classList.add('active');
}

function showRegion(region) {
    // Hide all region contents
    const allContents = document.querySelectorAll('.region-content');
    allContents.forEach(content => content.classList.remove('active'));

    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.region-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));

    // Show selected region content
    const selectedContent = document.getElementById(region + '-content');
    if (selectedContent) {
        selectedContent.classList.add('active');
    }

    // Add active class to clicked button
    event.target.classList.add('active');

    // Update header text based on region
    const regionTitle = document.getElementById('region-title');
    const regionDescription = document.getElementById('region-description');
    
    if (region === 'na') {
        regionTitle.textContent = 'North America Customs Regulations';
        regionDescription.textContent = 'Comprehensive guide to customs clearance procedures for the United States, Canada, and Mexico';
    } else if (region === 'europe') {
        regionTitle.textContent = 'European Union Customs Regulations';
        regionDescription.textContent = 'Navigate the complex customs landscape across 27 EU member states and key European markets';
    } else if (region === 'asia') {
        regionTitle.textContent = 'Asia-Pacific Customs Regulations';
        regionDescription.textContent = 'Master the diverse customs requirements across major Asian economies and trading hubs';
    }
}

// ===== MOBILE NAVIGATION =====
if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
    });
}

// Close mobile menu when clicking overlay
if (overlay) {
    overlay.addEventListener('click', function(){
        if (nav && nav.classList.contains('active')){
            nav.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
}

// Close mobile menu when clicking on nav links
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav && nav.classList.contains('active')){
                nav.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
            }
        });
    });
}

// 🔄 COMPLETELY REPLACED: Unified EmailJS Form Submission Handler
// ===== UNIFIED EMAILJS FORM SUBMISSION =====
function handleUnifiedFormSubmission(form, formType) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get submit button based on form type
        const submitBtn = formType === 'contact' 
            ? document.getElementById('contact-submit-btn')
            : document.getElementById('quote-submit-btn');
        
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = formType === 'contact' ? 'Sending...' : 'Sending Quote Request...';
        submitBtn.disabled = true;

        // Prepare template parameters
        let templateParams = {
            form_type: form.querySelector('input[name="form_type"]').value,
            from_name: form.querySelector('input[name="from_name"]').value,
            from_email: form.querySelector('input[name="from_email"]').value,
            phone: form.querySelector('input[name="phone"]').value || 'Not provided',
            message: form.querySelector('textarea[name="message"]').value,
            submission_date: new Date().toLocaleString()
        };

        // Add specific fields based on form type
        if (formType === 'contact') {
            // For contact form, add subject
            const subjectField = form.querySelector('input[name="subject"]');
            templateParams.subject = subjectField ? subjectField.value : 'General Inquiry';
        } else if (formType === 'quote') {
            // For quote form, add selected freight services
            const selectedServices = [];
            const checkboxes = form.querySelectorAll('input[name="freight_type"]:checked');
            checkboxes.forEach(checkbox => {
                const label = checkbox.closest('.checkbox-item-wide');
                const title = label.querySelector('.checkbox-title').textContent;
                selectedServices.push(title);
            });
            templateParams.freight_services = selectedServices.join(', ') || 'None selected';
        }

        // Send email via EmailJS
        emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
            .then(function(response) {
                console.log(`${formType.toUpperCase()} SUCCESS!`, response.status, response.text);
                
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Show success alert
                showSuccessAlert(formType);
                
            }, function(error) {
                console.log(`${formType.toUpperCase()} FAILED...`, error);
                
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Show error message
                alert(`Failed to send ${formType} form. Please try again or contact us directly.`);
            });
    });
}

// 🔄 ADDED: Function to show success alerts based on form type
function showSuccessAlert(formType) {
    const alertBox = formType === 'contact' 
        ? document.getElementById('contact-alert-box')
        : document.getElementById('quote-alert-box');
    
    if (alertBox) {
        alertBox.style.display = 'flex';
        // if (overlay) overlay.classList.add('active');
    }
}

// 🔄 FIXED: Function to handle alert confirmation buttons
function handleAlertConfirmation() {
    // Handle contact form alert
    const contactConfirmBtn = document.getElementById('contact-confirm-btn');
    const contactAlertBox = document.getElementById('contact-alert-box');
    const contactForm = document.getElementById('unified-contact-form');
    
    if (contactConfirmBtn && contactAlertBox) {
        contactConfirmBtn.addEventListener('click', function() {
            contactAlertBox.style.display = 'none';
            if (overlay) overlay.classList.remove('active');
            
            // Reset the contact form
            if (contactForm) {
                setTimeout(function() {
                    contactForm.reset();
                }, 500);
            }
        });
    }
    
    // Handle quote form alert
    const quoteConfirmBtn = document.getElementById('quote-confirm-btn');
    const quoteAlertBox = document.getElementById('quote-alert-box');
    const quoteForm = document.getElementById('unified-quote-form');
    
    if (quoteConfirmBtn && quoteAlertBox) {
        quoteConfirmBtn.addEventListener('click', function() {
            quoteAlertBox.style.display = 'none';
            if (overlay) overlay.classList.remove('active');
            
            // Reset the quote form
            if (quoteForm) {
                setTimeout(function() {
                    quoteForm.reset();
                }, 500);
            }
            
            // Navigate to home page for quote form
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 300);
        });
    }
}

// ===== TESTIMONIALS SLIDER =====
const track = document.getElementById('testimonials-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const slider = document.getElementById('testimonials-slider');

if (track && prevBtn && nextBtn && slider) {
    const slides = track.children;
    let currentIndex = 0;
    let slideInterval;

    // Function to update slider position
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Function to start auto-sliding
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        }, 5000);
    }

    // Function to stop auto-sliding
    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // Previous button event listener
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateSlider();
        startAutoSlide();
    });

    // Next button event listener
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
        startAutoSlide();
    });

    // Pause auto-slide when hovering over the slider
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Initialize the slider
    updateSlider();
    startAutoSlide();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoSlide();
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            updateSlider();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            stopAutoSlide();
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
            startAutoSlide();
        }
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide();
    });

    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
        startAutoSlide();
    });

    function handleSwipe() {
        const threshold = 50;
        const distance = startX - endX;
        
        if (Math.abs(distance) > threshold) {
            if (distance > 0) {
                currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            } else {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            }
            updateSlider();
        }
    }
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ===== INITIALIZE ON DOM LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function() {
                    console.log('FAQ item clicked');
                    
                    const isActive = item.classList.contains('active');
                    
                    // Close all items
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                    
                    // If the clicked item wasn't active before, make it active
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // 🔄 ADDED: Initialize unified form handlers
    const contactForm = document.getElementById('unified-contact-form');
    const quoteForm = document.getElementById('unified-quote-form');
    
    if (contactForm) {
        handleUnifiedFormSubmission(contactForm, 'contact');
    }
    
    if (quoteForm) {
        handleUnifiedFormSubmission(quoteForm, 'quote');
    }
    
    // Initialize alert confirmation handlers
    handleAlertConfirmation();

    // Observe all animated elements
    document.querySelectorAll('.info-card, .process-step').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add hover effects
    document.querySelectorAll('.info-card, .process-step').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});