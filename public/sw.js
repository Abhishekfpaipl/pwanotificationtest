self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
    };

    event.waitUntil(
        self.registration.showNotification('Your App Name', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    // Add any custom logic for notification click
}); 