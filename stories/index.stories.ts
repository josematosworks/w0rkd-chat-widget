import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { W0rkdChatWidget } from '../src/W0rkdChatWidget.js';
import '../src/w0rkd-chat-widget.js';

const meta: Meta<W0rkdChatWidget> = {
  title: 'W0rkdChatWidget',
  component: 'w0rkd-chat-widget',
  tags: ['autodocs'],
  argTypes: {
    header: { control: 'text' },
    messages: { control: 'object' },
    styles: { control: 'object' },
  },
  parameters: {
    actions: {
      handles: [
        'w0rkd-chat-message-sent',
        'w0rkd-chat-opened',
        'w0rkd-chat-closed',
      ],
    },
  },
};

export default meta;

type Story = StoryObj<W0rkdChatWidget>;

const Template: Story = {
  render: args => html`
    <w0rkd-chat-widget
      .header=${args.header}
      .messages=${args.messages}
      .styles=${args.styles}
    ></w0rkd-chat-widget>
  `,
};

export const Default: Story = {
  ...Template,
  args: {
    header: 'Chat with Bot',
    messages: [],
    styles: {},
  },
};

export const CustomHeader: Story = {
  ...Template,
  args: {
    ...Default.args,
    header: 'My Custom Header',
  },
};

export const WithMessages: Story = {
  ...Template,
  args: {
    ...Default.args,
    messages: [
      { text: 'Hello!', isUser: true },
      { text: 'Hi there! How can I help you?', isUser: false },
    ],
  },
};

export const CustomStyles: Story = {
  ...Template,
  args: {
    ...Default.args,
    styles: {
      backgroundColor: '#f0f0f0',
      buttonBackgroundColor: '#4CAF50',
      buttonHoverBackgroundColor: '#45a049',
      fontFamily: 'Arial, sans-serif',
    },
  },
};
