# Notify Africa SDK

[![npm version](https://badge.fury.io/js/notify-africa.svg)](https://badge.fury.io/js/notify-africa)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SMS, WhatsApp, Voice, AI Chatbots, and CRM - all in one powerful platform designed for businesses across Africa.

This is a TypeScript/JavaScript SDK for interacting with the Notify Africa API, focusing on SMS messaging features. It provides a simple class-based interface for sending single or batch SMS messages and checking message status. Built with native `fetch` for zero external dependencies (requires Node.js >= 18.0.0).

## Features

- Send single SMS messages
- Send batch SMS messages to multiple recipients
- Check the status of sent messages
- Configurable base URL (defaults to `https://api.notify.africa`)
- TypeScript support with full type definitions
- No external dependencies

## Installation

Install the package via npm:

```bash
npm install notify-africa
```

Or via yarn:

```bash
yarn add notify-africa
```

```ts
import { NotifyAfrica } from "notify-africa-npm"; // or from the package when published

const notifyAfrica = new NotifyAfrica(
  process.env.NOTIFY_API_TOKEN || "your-token-here"
);

async function run() {
  // Send a single message
  const single = await notifyAfrica.sendSingleMessage(
    "255123456789",
    "Hello from API Management endpoint!",
    "137"
  );
  console.log(single); // { messageId: "156023", status: "PROCESSING" }

  // Send a batch
  const batch = await notifyAfrica.sendBatchMessages(
    ["255123456789", "255123456789"],
    "test",
    "137"
  );
  console.log(batch); // { messageCount: 2, creditsDeducted: 2, remainingBalance: 1475 }

  // Check status
  const status = await notifyAfrica.checkMessageStatus("156022");
  console.log(status); // { messageId: "156022", status: "SENT", sentAt: null, deliveredAt: "2025-11-13T12:34:08.540Z" }
}

run().catch(console.error);
```

    console.log('Single message sent:', response); // { messageId: '156023', status: 'PROCESSING' }

} catch (error) {
console.error('Error:', error.message);
}
}

sendSingle();

### Send Batch Messages

```typescript
async function sendBatch() {
  try {
    const response = await client.sendBatchMessages(
      ["255123456789", "255123456789"], // Array of phone numbers
      "Test batch message", // Message
      "137" // Sender ID
    );
    console.log("Batch messages sent:", response); // { messageCount: 2, creditsDeducted: 2, remainingBalance: 1475 }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

sendBatch();
```

### Check Message Status

```typescript
async function checkStatus() {
  try {
    const response = await client.checkMessageStatus("156022"); // Message ID
    console.log("Message status:", response); // { messageId: '156022', status: 'SENT', sentAt: null, deliveredAt: '2025-11-13T12:34:08.540Z' }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

checkStatus();
```

## API Reference

### Constructor

```typescript
new NotifyAfrica(apiToken: string, baseUrl?: string)
```

- `apiToken`: Your Notify Africa API bearer token (required).
- `baseUrl`: Optional base URL for the API (defaults to `'https://api.notify.africa'`).

### Methods

- **`sendSingleMessage(phoneNumber: string, message: string, senderId: string): Promise<SendSingleResponse>`**

  - Sends a single SMS.
  - Returns: `{ messageId: string, status: string }`

- **`sendBatchMessages(phoneNumbers: string[], message: string, senderId: string): Promise<SendBatchResponse>`**

  - Sends SMS to multiple recipients.
  - Returns: `{ messageCount: number, creditsDeducted: number, remainingBalance: number }`

- **`checkMessageStatus(messageId: string): Promise<MessageStatusResponse>`**
  - Retrieves the status of a message.
  - Returns: `{ messageId: string, status: string, sentAt: string | null, deliveredAt: string | null }`

All methods are asynchronous and throw errors on failure.

## Integration with Frameworks

### NestJS Example

Create a service:

```typescript
import { Injectable } from "@nestjs/common";
import { NotifyAfrica } from "notify-africa";

@Injectable()
export class SmsService {
  private client: NotifyAfrica;

  constructor() {
    this.client = new NotifyAfrica(process.env.NOTIFY_AFRICA_TOKEN);
  }

  async sendSingle(phone: string, message: string, senderId: string) {
    return this.client.sendSingleMessage(phone, message, senderId);
  }

  // Add other methods as needed
}
```

## Requirements

- Node.js >= 18.0.0 (for native `fetch` support)

## Development

- Clone the repo: `git clone https://github.com/tacheraSasi/notify-africa-npm.git`
- Install dependencies: `npm install`
- Build: `npm run build`
- Test: `npm run test`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/tacheraSasi/notify-africa-npm.git).

## License

MIT License. See [LICENSE](LICENSE) for details.

## Support

For API-related questions, visit the [Notify Africa Developers Portal](https://notify.africa/developers).

Author: Tachera Sasi <tacherasasi@gmail.com> (<https://tachera.ekilie.com>)
