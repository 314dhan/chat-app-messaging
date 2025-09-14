const { createApp } = Vue;

createApp({
  data() {
    return {
      title: 'Vue Chat App',
      messages: [],
      currentUser: '',
      newMessage: ''
    };
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await fetch('/messages');
        if (!response.ok) throw new Error('Failed to fetch');
        this.messages = await response.json();
        this.$nextTick(() => {
          const container = this.$el.querySelector('#messages-container');
          container.scrollTop = container.scrollHeight;
        });
      } catch (error) {
        console.error(error);
      }
    },
    async sendMessage() {
      if (!this.currentUser || !this.newMessage) return;

      try {
        const response = await fetch('/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            username: this.currentUser, 
            text: this.newMessage 
          })
        });

        if (!response.ok) throw new Error('Failed to send');
        
        this.newMessage = ''; // Clear input
        this.fetchMessages(); // Refresh messages
      } catch (error) {
        console.error(error);
      }
    },
    async deleteAllMessages() {
      if (confirm('Anda yakin ingin menghapus semua pesan?')) {
        try {
          const response = await fetch('/messages', { method: 'DELETE' });
          if (!response.ok) throw new Error('Failed to delete');
          this.fetchMessages(); // Refresh the view
        } catch (error) {
          console.error(error);
          alert('Gagal menghapus pesan.');
        }
      }
    }
  },
  mounted() {
    this.fetchMessages();
    // Optional: Poll for new messages
    // setInterval(this.fetchMessages, 3000);
  }
}).mount('#app');