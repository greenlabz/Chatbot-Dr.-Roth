(function() {
    const GreenLabzChatbot = {
        init: function(config) {
            this.config = config;
            this.injectStyles();
            this.createMarkup();
        },

        injectStyles: function() {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'widget.css'; // Should be absolute path in production
            document.head.appendChild(link);
        },

        createMarkup: function() {
            const container = document.createElement('div');
            container.id = 'gl-chat-container';
            container.innerHTML = `
                <div id="gl-chat-window">
                    <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);">Chat mit GreenLabz</div>
                    <div id="gl-chat-messages" style="flex: 1; padding: 20px;"></div>
                    <input type="text" placeholder="Schreibe etwas..." style="margin: 20px; padding: 10px; background: rgba(255,255,255,0.05); border: none; color: white;">
                </div>
                <div id="gl-chat-btn"></div>
            `;
            document.body.appendChild(container);
            // ... inside createMarkup or update logic
                        const chatBtn = document.getElementById('gl-chat-btn');
                        const chatWindow = document.getElementById('gl-chat-window');
                        const chatMessages = document.getElementById('gl-chat-messages');
                        const chatInput = document.getElementById('gl-chat-input');

                        chatBtn.onclick = () => chatWindow.classList.toggle('open');

                        chatInput.onkeypress = async (e) => {
                            if (e.key === 'Enter') {
                                const msg = chatInput.value;
                                chatMessages.innerHTML += `<div><b>User:</b> ${msg}</div>`;
                                chatInput.value = '';

                                const response = await fetch(this.config.endpoint, {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({message: msg})
                                });
                                const data = await response.json();
                                chatMessages.innerHTML += `<div><b>Bot:</b> ${data.reply}</div>`;
                            }
                        };
                    }
                };
                window.GreenLabzChatbot = GreenLabzChatbot;
            })();
