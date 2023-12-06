<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="sendNotification">Store Data</button>
    <p>Version 1.1</p>
    <button @click="sendPushNotification">Send Notification</button>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
// import webpush from 'web-push';
export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      publicKey: 'BNwmPpP_7-jIbS_GRv8fJYEjDwDLXrENyvoTvCegyU3emQCs0QVqpsO0k0Dv8RbQvLyTRnOMzT3Frf0p5pHMAq0',
      privateKey: 'KzybUgBRMQTjGnSwpzdILde0676GCPBPXRqkuTeY1uk'
    };
  },
  methods: {
    async sendNotification() {
      try {
        const serviceWorkerRegistration = await navigator.serviceWorker.ready;
        const subscription = await serviceWorkerRegistration.pushManager.getSubscription() /* Retrieve subscription object */;
        if (subscription) {
          // User is already subscribed
          console.log('hello', JSON.stringify(subscription))
          const { keys, endpoint } = subscription.toJSON();
          localStorage.setItem('p256dhKey', keys.p256dh);
          localStorage.setItem('authKey', keys.auth);
          localStorage.setItem('endpoint', endpoint)
          return subscription;
        }

        // Subscribe the user
        const newSubscription = await serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'BNwmPpP_7-jIbS_GRv8fJYEjDwDLXrENyvoTvCegyU3emQCs0QVqpsO0k0Dv8RbQvLyTRnOMzT3Frf0p5pHMAq0',
        });

        return newSubscription;
      } catch (error) {
        console.error('Error sending push notification:', error);
      }
    },
    async sendPushNotification() {

      try {
        // Replace with the actual subscription object obtained earlier
        const subscription = {
          endpoint: localStorage.getItem('endpoint'),
          keys: {
            auth: localStorage.getItem('authKey'),
            p256dh: localStorage.getItem('p256dhKey'),
          },
        };

        const payload = JSON.stringify({
          title: 'Notification Title',
          text: 'Notification Text',
        });

        await webpush.sendNotification(subscription, payload);
      } catch (error) {
        console.error('Error sending push notification:', error);
      }
    }
  }
}
</script>
