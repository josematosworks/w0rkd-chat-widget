import { html, css, LitElement, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';

type Position = 'fixed' | 'relative' | 'absolute';
type Spacing = `${number}${'px' | 'rem' | 'em' | '%'}`;
type Color = string;
type FontFamily = string;
type FontSize = `${number}${'px' | 'rem' | 'em'}`;
type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type BorderRadius = `${number}${'px' | 'rem' | 'em'}`;
type BorderWidth = `${number}${'px' | 'rem' | 'em'}`;

interface ChatWidgetStyles {
  position?: Position;
  bottom?: Spacing;
  right?: Spacing;
  top?: Spacing;
  left?: Spacing;
  padding?: Spacing;
  margin?: Spacing;
  width?: Spacing;
  height?: Spacing;
  borderRadius?: BorderRadius;
  backgroundColor?: Color;
  borderColor?: Color;
  textColorPrimary?: Color;
  textColorSecondary?: Color;
  placeholderTextColor?: Color;
  buttonBackgroundColor?: Color;
  buttonHoverBackgroundColor?: Color;
  buttonTextColor?: Color;
  inputBackgroundColor?: Color;
  inputBorderColor?: Color;
  inputFocusBorderColor?: Color;
  fontFamily?: FontFamily;
  fontSizePrimary?: FontSize;
  fontSizeSecondary?: FontSize;
  fontSizeButton?: FontSize;
  fontSizeInput?: FontSize;
  fontWeightPrimary?: FontWeight;
  fontWeightSecondary?: FontWeight;
  fontWeightBold?: FontWeight;
  borderWidth?: BorderWidth;
  gap?: Spacing;
  messageBubblePadding?: Spacing;
  messageBubbleMargin?: Spacing;
  transition?: string;
  hoverTransition?: string;
  animationOnOpen?: string;
}

export class W0rkdChatWidget extends LitElement {
  @property({ type: String }) header = 'Chat with Bot';

  @property({ type: Array }) messages: { text: string; isUser: boolean }[] = [];

  @property({ type: Object }) styles: ChatWidgetStyles = {};

  @state() private inputText = '';

  @state() private isOpen = false;

  static get styles() {
    return css`
      :host {
        --position: fixed;
        --bottom: 1rem;
        --right: 1rem;
        --padding: 1rem;
        --margin: 1rem;
        --width: 300px;
        --height: 400px;
        --border-radius: 0.5rem;
        --background-color: #f3f4f6;
        --border-color: #e5e7eb;
        --text-color-primary: #111827;
        --text-color-secondary: #6b7280;
        --placeholder-text-color: #9ca3af;
        --button-background-color: #3b82f6;
        --button-hover-background-color: #2563eb;
        --button-text-color: #ffffff;
        --input-background-color: #ffffff;
        --input-border-color: #d1d5db;
        --input-focus-border-color: #3b82f6;
        --font-family: Inter, sans-serif;
        --font-size-primary: 1rem;
        --font-size-secondary: 0.875rem;
        --font-size-button: 0.875rem;
        --font-size-input: 0.875rem;
        --font-weight-primary: 500;
        --font-weight-secondary: 400;
        --font-weight-bold: 600;
        --border-width: 1px;
        --gap: 0.5rem;
        --message-bubble-padding: 0.75rem;
        --message-bubble-margin: 0.5rem 0;
        --transition: all 0.2s ease-in-out;
        --hover-transition: 0.1s ease-in-out;
        --animation-on-open: fadeIn 0.3s ease-in-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .chat-bubble {
        position: var(--position);
        bottom: var(--bottom);
        right: var(--right);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: var(--button-background-color);
        color: var(--button-text-color);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        transition: var(--transition);
        z-index: 1000;
      }

      .chat-bubble:hover {
        transform: scale(1.1);
        transition: var(--hover-transition);
      }

      .chat-container {
        position: var(--position);
        bottom: var(--bottom);
        right: var(--right);
        width: var(--width);
        height: var(--height);
        border-radius: var(--border-radius);
        background-color: var(--background-color);
        border: var(--border-width) solid var(--border-color);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        transition: var(--transition);
        animation: var(--animation-on-open);
        z-index: 1000;
      }

      .chat-header {
        background-color: var(--button-background-color);
        color: var(--button-text-color);
        padding: var(--padding);
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-primary);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .close-btn {
        background: none;
        border: none;
        color: var(--button-text-color);
        font-size: 1.5rem;
        cursor: pointer;
        transition: var(--transition);
      }

      .close-btn:hover {
        opacity: 0.8;
      }

      .chat-messages {
        flex-grow: 1;
        overflow-y: auto;
        padding: var(--padding);
      }

      .message {
        margin: var(--message-bubble-margin);
        padding: var(--message-bubble-padding);
        border-radius: var(--border-radius);
        max-width: 80%;
        font-size: var(--font-size-secondary);
      }

      .user-message {
        background-color: var(--button-background-color);
        color: var(--button-text-color);
        margin-left: auto;
      }

      .bot-message {
        background-color: var(--input-background-color);
        color: var(--text-color-primary);
      }

      .chat-input {
        display: flex;
        padding: var(--padding);
        gap: var(--gap);
      }

      input {
        flex-grow: 1;
        padding: 0.5rem;
        border: var(--border-width) solid var(--input-border-color);
        border-radius: var(--border-radius);
        font-size: var(--font-size-input);
        font-family: var(--font-family);
        transition: var(--transition);
      }

      input:focus {
        outline: none;
        border-color: var(--input-focus-border-color);
      }

      button {
        padding: 0.5rem 1rem;
        background-color: var(--button-background-color);
        color: var(--button-text-color);
        border: none;
        border-radius: var(--border-radius);
        font-size: var(--font-size-button);
        font-weight: var(--font-weight-bold);
        cursor: pointer;
        transition: var(--transition);
      }

      button:hover {
        background-color: var(--button-hover-background-color);
      }
    `;
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('styles')) {
      this.updateStyles();
    }
  }

  private updateStyles() {
    const root = this.shadowRoot?.host as HTMLElement;
    if (root) {
      Object.entries(this.styles).forEach(([key, value]) => {
        root.style.setProperty(
          `--${W0rkdChatWidget.kebabCase(key)}`,
          value as string,
        );
      });
    }
  }

  private static kebabCase(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  private toggleChat() {
    this.isOpen = !this.isOpen;
  }

  private handleInput(e: InputEvent) {
    this.inputText = (e.target as HTMLInputElement).value;
  }

  private handleSend() {
    if (this.inputText.trim()) {
      this.messages = [
        ...this.messages,
        { text: this.inputText, isUser: true },
      ];
      this.inputText = '';
      // Simulate bot response (replace with actual bot logic)
      setTimeout(() => {
        this.messages = [
          ...this.messages,
          { text: "I'm a bot. How can I help you?", isUser: false },
        ];
      }, 1000);
    }
  }

  render() {
    return html`
      ${this.isOpen
        ? html`
            <div class="chat-container">
              <div class="chat-header">
                <span>${this.header}</span>
                <button class="close-btn" @click=${this.toggleChat}>
                  &times;
                </button>
              </div>
              <div class="chat-messages">
                ${this.messages.map(
                  msg => html`
                    <div
                      class="message ${msg.isUser
                        ? 'user-message'
                        : 'bot-message'}"
                    >
                      ${msg.text}
                    </div>
                  `,
                )}
              </div>
              <div class="chat-input">
                <input
                  type="text"
                  .value=${this.inputText}
                  @input=${this.handleInput}
                  placeholder="Type your message..."
                />
                <button @click=${this.handleSend}>Send</button>
              </div>
            </div>
          `
        : html`
            <div
              class="chat-bubble"
              @click=${this.toggleChat}
              @keydown=${(e: KeyboardEvent) =>
                e.key === 'Enter' && this.toggleChat()}
              tabindex="0"
              role="button"
              aria-label="Open chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                ></path>
              </svg>
            </div>
          `}
    `;
  }
}
