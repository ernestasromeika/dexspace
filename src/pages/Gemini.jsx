/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from "react";
import { GoogleGenAI, Chat } from '@google/genai';
import { marked } from 'marked';
import "../styles/gemini.css";

let chat = null;
let isLoading = false;

// --- Helper Functions ---

/** Scrolls the chat history to the very bottom. */
function scrollToBottom() {
    React.useEffect(() => {
        document.getElementById('chat-history').scrollTop = document.getElementById('chat-history').scrollHeight;
    });
}

/** 
 * Toggles the disabled state of the input form.
 * @param {boolean} disabled - Whether to disable the form.
 */
function setFormDisabled(disabled) {
    React.useEffect(() => {
        isLoading = disabled;
        document.getElementById('message-input').disabled = disabled;
        document.getElementById('chat-form').querySelector('button').disabled = disabled || !document.getElementById('message-input').value.trim();
    });
}

/**
 * Creates and appends a message element to the chat history.
 * @param {'user' | 'model'} role - The role of the message sender.
 * @param {string} text - The content of the message.
 * @returns {Promise<HTMLElement>} A promise that resolves to the content element of the new message.
 */
function addMessage(role, text) {
    React.useEffect(() => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;

        const contentDiv = document.createElement('div');

        if (role === 'model' && text === '') {
            // Show a loading indicator for empty model messages
            const loader = document.createElement('div');
            loader.className = 'loading-indicator';
            contentDiv.appendChild(loader);
        } else {
            contentDiv.innerHTML = marked.parse(text, { async: true, gfm: true, breaks: true });
        }

        messageDiv.appendChild(contentDiv);
        document.getElementById('chat-history').appendChild(messageDiv);
        scrollToBottom();
        return contentDiv;
    });
}

// --- Main Application Logic ---

async function main() {
    React.useEffect(() => {

        // Initialize the Gemini Chat
        try {
            const API_KEY = "AIzaSyBU4uBy1tKTfszAhB-uhN5BR7dgD2s_L7A";
            if (!API_KEY) {
                throw new Error('API_KEY is not configured. Please set the API_KEY environment variable.');
            }
            const ai = new GoogleGenAI({ apiKey: API_KEY });
            chat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: 'You are a helpful assistant focused on personal finance and cryptocurrency security. Your goal is to educate users on managing their financial portfolio, best practices for storing cryptocurrency like using hardware wallets, and how to recognize and avoid common scams. Do not answer questions outside of these topics. If a user asks about something else, gently guide them back to the intended subjects. If the user is interested in onramps (where to buy/sell), provide this referral link to Coinbase: https://advanced.coinbase.com/join/YUMUCQA. If the user is interested in having a personal hardware wallet, provide this referral link to Trezor: http://trezorio.refr.cc/default/u/ernestasr.',
                },
            });
            // Display the initial greeting message
            addMessage('model', 'Hello! I am your personal finance and crypto portfolio management assistant. What would you like to find out?');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
            addMessage('model', `**Error:** Could not initialize the chat. ${errorMessage}`);
            setFormDisabled(true);
            return;
        }

        // Handle chat form submission
        document.getElementById('chat-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const userMessage = document.getElementById('message-input').value.trim();

            if (!userMessage || isLoading || !chat) return;

            setFormDisabled(true);
            document.getElementById('message-input').value = '';
            document.getElementById('message-input').style.height = 'auto'; // Reset height after sending

            await addMessage('user', userMessage);
            const modelMessageContent = await addMessage('model', ''); // Create placeholder for model response

            try {
                const stream = await chat.sendMessageStream({ message: userMessage });

                let fullResponse = '';
                let isFirstChunk = true;
                for await (const chunk of stream) {
                    if (isFirstChunk) {
                        modelMessageContent.innerHTML = ''; // Remove loading indicator
                        isFirstChunk = false;
                    }
                    fullResponse += chunk.text;
                    // Render markdown in real-time with a typing cursor
                    modelMessageContent.innerHTML = await marked.parse(fullResponse + '▍', { async: true, gfm: true, breaks: true });
                    scrollToBottom();
                }
                // Final render without the cursor
                modelMessageContent.innerHTML = await marked.parse(fullResponse, { async: true, gfm: true, breaks: true });
                scrollToBottom();

            } catch (error) {
                console.error('Error streaming response:', error);
                modelMessageContent.innerHTML = 'Sorry, something went wrong. Please try again.';
            } finally {
                setFormDisabled(false);
                document.getElementById('message-input').focus();
            }
        });

        // Auto-resize the textarea based on content
        document.getElementById('message-input').addEventListener('input', () => {
            document.getElementById('message-input').style.height = 'auto';
            document.getElementById('message-input').style.height = `${Math.min(document.getElementById('message-input').scrollHeight, 150)}px`;
            document.getElementById('chat-form').querySelector('button').disabled = !document.getElementById('message-input').value.trim();
        });

        // Handle 'Enter' key to send, 'Shift+Enter' for new line
        document.getElementById('message-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (document.getElementById('message-input').value.trim().length > 0) {
                    document.getElementById('chat-form').dispatchEvent(new Event('submit', { cancelable: true }));
                }
            }
        });
    });
}

// Start the application

function Gemini() {
    main();
    return (
        <div class="chat-container">
            <header>
                <h1>Gemini Chat</h1>
            </header>
            <div id="chat-history" aria-live="polite"></div>
            <form id="chat-form" aria-label="Chat message form">
                <textarea
                    id="message-input"
                    placeholder="Type your message..."
                    rows="1"
                    aria-label="Chat message input"
                ></textarea>
                <button type="submit" aria-label="Send message">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                </button>
            </form>
        </div>
    );
}



export default Gemini;