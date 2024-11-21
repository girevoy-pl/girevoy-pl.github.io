// gtag.js - Google Analytics Initialization Script

// Initialize the Google Analytics dataLayer if not already defined
window.dataLayer = window.dataLayer || [];

// Define the gtag function
function gtag() {
    dataLayer.push(arguments);
}

// If the user has consented to cookies, enable Google Analytics
function enableAnalytics() {
    // Load the gtag.js script dynamically
    var script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-BQZ54DGX70';  // Your Google Analytics Tracking ID
    script.async = true;
    document.head.appendChild(script);

    // Initialize Google Analytics after the script has been loaded
    script.onload = function() {
        gtag('js', new Date());
        gtag('config', 'G-BQZ54DGX70', { 'anonymize_ip': true });  // Set anonymization for IPs
    };
}
