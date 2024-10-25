import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { W0rkdChatWidget } from '../src/W0rkdChatWidget.js';
import '../src/w0rkd-chat-widget.js';

describe('W0rkdChatWidget', () => {
  it('has a default header "Chat with Bot"', async () => {
    const el = await fixture<W0rkdChatWidget>(
      html`<w0rkd-chat-widget></w0rkd-chat-widget>`,
    );

    expect(el.header).to.equal('Chat with Bot');
  });

  it('can override the header via attribute', async () => {
    const el = await fixture<W0rkdChatWidget>(
      html`<w0rkd-chat-widget header="Custom Header"></w0rkd-chat-widget>`,
    );

    expect(el.header).to.equal('Custom Header');
  });

  it('starts with the chat closed', async () => {
    const el = await fixture<W0rkdChatWidget>(
      html`<w0rkd-chat-widget></w0rkd-chat-widget>`,
    );

    const chatBubble = el.shadowRoot!.querySelector('.chat-bubble');
    const chatContainer = el.shadowRoot!.querySelector('.chat-container');

    expect(chatBubble).to.exist;
    expect(chatContainer).to.not.exist;
  });

  it('opens the chat when clicking the chat bubble', async () => {
    const el = await fixture<W0rkdChatWidget>(
      html`<w0rkd-chat-widget></w0rkd-chat-widget>`,
    );

    const chatBubble = el.shadowRoot!.querySelector(
      '.chat-bubble',
    ) as HTMLElement;
    chatBubble.click();

    await el.updateComplete;

    const chatContainer = el.shadowRoot!.querySelector('.chat-container');
    expect(chatContainer).to.exist;
  });

  it('closes the chat when clicking the close button', async () => {
    const el = await fixture<W0rkdChatWidget>(
      html`<w0rkd-chat-widget></w0rkd-chat-widget>`,
    );

    // Open the chat first
    const chatBubble = el.shadowRoot!.querySelector(
      '.chat-bubble',
    ) as HTMLElement;
    chatBubble.click();
    await el.updateComplete;

    // Close the chat
    const closeButton = el.shadowRoot!.querySelector(
      '.close-btn',
    ) as HTMLElement;
    closeButton.click();
    await el.updateComplete;

    const chatContainer = el.shadowRoot!.querySelector('.chat-container');
    expect(chatContainer).to.not.exist;
  });

  it('sends a message when clicking the send button', async () => {
    const el = await fixture<W0rkdChatWidget>(
      html`<w0rkd-chat-widget></w0rkd-chat-widget>`,
    );

    // Open the chat
    const chatBubble = el.shadowRoot!.querySelector(
      '.chat-bubble',
    ) as HTMLElement;
    chatBubble.click();
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
    const sendButton = el.shadowRoot!.querySelector(
      'button:not(.close-btn)',
    ) as HTMLElement;

    input.value = 'Hello, bot!';
    input.dispatchEvent(new Event('input'));
    sendButton.click();

    await el.updateComplete;

    const messages = el.shadowRoot!.querySelectorAll('.message');
    expect(messages.length).to.equal(1);
    expect(messages[0].textContent?.trim()).to.equal('Hello, bot!');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<W0rkdChatWidget>(
      html`<w0rkd-chat-widget></w0rkd-chat-widget>`,
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
