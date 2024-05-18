window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('text-content').remove();
});

window.addEventListener('beforeunload', (event) => {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Chrome requires returnValue to be set.
    event.returnValue = '';
});