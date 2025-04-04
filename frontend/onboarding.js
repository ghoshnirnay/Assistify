document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('onboardingForm');
    const steps = Array.from(document.querySelectorAll('.onboarding-step'));
    const progressFill = document.querySelector('.progress-fill');
    let currentStep = 0;
    showStep(0);
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                showStep(currentStep + 1);
            }
        });
    });

    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', () => {
            showStep(currentStep - 1);
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        
        // Combine with account data from session/localStorage
        const userData = {
            ...JSON.parse(sessionStorage.getItem('quickSignupData')),
            preferences: Object.fromEntries(formData.entries())
        };

        // Send to backend for ML training
        fetch('/api/onboard-user', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            window.location.href = '/dashboard';
        });
    });

    function showStep(stepIndex) {
        // Hide all steps
        steps.forEach(step => step.classList.remove('active'));
        
        // Show current step
        steps[stepIndex].classList.add('active');
        currentStep = stepIndex;
        
        // Update progress bar
        progressFill.style.width = `${((stepIndex + 1) / steps.length) * 100}%`;
    }

    function validateStep(stepIndex) {
        // Add validation logic for each step
        return true;
    }
});