<script src="prevent-rc.js"></script>

// Disable right-click
document.addEventListener('contextmenu', (event) => event.preventDefault());

// Disable F12 and other key combinations
document.addEventListener('keydown', (event) => {
    // Disable F12
    if (event.key === 'F12') {
        event.preventDefault();
    }

    // Disable Ctrl+Shift+I (Inspect), Ctrl+U (View Source), and Ctrl+Shift+J (Console)
    if ((event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J')) || 
        (event.ctrlKey && event.key === 'U')) {
        event.preventDefault();

        // Redirect to a custom page
        window.location.href = "blocked.html";
    }
});