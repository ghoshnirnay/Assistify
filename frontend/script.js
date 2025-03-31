document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Testimonial carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
            testimonial.setAttribute('aria-hidden', 'true');
        });
        
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        testimonials[index].setAttribute('aria-hidden', 'false');
        indicators[index].classList.add('active');
        currentIndex = index;
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    prevBtn.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    });
    
    // Accessibility toolbar
    const accessibilityBtn = document.querySelector('.accessibility-button');
    const accessibilityPanel = document.querySelector('.accessibility-panel');
    
    accessibilityBtn.addEventListener('click', function() {
        const isHidden = accessibilityPanel.getAttribute('aria-hidden') === 'true';
        accessibilityPanel.setAttribute('aria-hidden', !isHidden);
    });
    
    // Text size selector
    const textSizeSelect = document.getElementById('text-size');
    textSizeSelect.addEventListener('change', function() {
        document.documentElement.style.fontSize = this.value;
    });
    
    // Color scheme selector
    const colorSchemeSelect = document.getElementById('color-scheme');
    colorSchemeSelect.addEventListener('change', function() {
        // Remove all color scheme classes
        document.body.classList.remove('high-contrast', 'dark-mode', 'light-mode');
        
        // Add selected class if not default
        if (this.value !== 'default') {
            document.body.classList.add(this.value);
        }
    });
    
    // Font style selector
    const fontStyleSelect = document.getElementById('font-style');
    fontStyleSelect.addEventListener('change', function() {
        // Remove all font style classes
        document.body.classList.remove('dyslexia-mode', 'sans-serif');
        
        // Add selected class if not default
        if (this.value !== 'default') {
            document.body.classList.add(this.value);
        }
    });
    
    // Reset accessibility settings
    const resetAccessibility = document.querySelector('.reset-accessibility');
    resetAccessibility.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Reset text size
        document.documentElement.style.fontSize = '16px';
        textSizeSelect.value = '100%';
        
        // Reset color scheme
        document.body.classList.remove('high-contrast', 'dark-mode', 'light-mode');
        colorSchemeSelect.value = 'default';
        
        // Reset font style
        document.body.classList.remove('dyslexia-mode', 'sans-serif');
        fontStyleSelect.value = 'default';
    });
    
    // Accessibility controls in the features section
    const controlOptions = document.querySelectorAll('.control-option');
    controlOptions.forEach(option => {
        option.addEventListener('click', function() {
            const isPressed = this.getAttribute('aria-pressed') === 'true';
            this.setAttribute('aria-pressed', !isPressed);
            
            // Simulate the effect (in a real implementation, these would actually change the UI)
            if (this.textContent.includes('Text Size')) {
                alert('Text size increased! In the full implementation, this would adjust all text on the page.');
            } else if (this.textContent.includes('Contrast')) {
                alert('High contrast mode activated! In the full implementation, this would change the color scheme.');
            } else if (this.textContent.includes('Dyslexia')) {
                alert('Dyslexia-friendly font enabled! In the full implementation, this would change the font family.');
            } else if (this.textContent.includes('Voice')) {
                alert('Voice control activated! In the full implementation, this would enable voice commands.');
            }
        });
    });
    
    // Video thumbnail click handler
    const videoThumbnail = document.querySelector('.video-thumbnail');
    if (videoThumbnail) {
        videoThumbnail.addEventListener('click', function() {
            alert('In the full implementation, this would open a modal with the demo video.');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
});
// Get modal element
const modal = document.getElementById("loginModal");
// Get button that opens the modal
const btn = document.getElementById("loginButton");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle form submission
document.getElementById("loginForm").onsubmit = function(e) {
    e.preventDefault();
    // Handle login logic here (e.g., validation or API call)
    console.log("Login submitted");
    modal.style.display = "none"; // Close modal after submission
}
