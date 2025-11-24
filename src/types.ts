/**
 * Request to send a single SMS message.
 *
 * @property {string} phone_number - Recipient phone number (usually E.164 format).
 * @property {string} message - Message body to send.
 * @property {string} sender_id - Identifier of the sender (alphanumeric short name).
 */
interface SendSingleRequest {
  phone_number: string;
  message: string;
  sender_id: string;
}

/**
 * Response returned after attempting to send a single message.
 *
 * @property {string} messageId - Unique identifier assigned to the message by the provider.
 * @property {string} status - Processing or delivery status (e.g. "queued", "sent", "failed").
 */
interface SendSingleResponse {
  messageId: string;
  status: string;
}

/**
 * Request to send the same message to multiple recipients in a single batch.
 *
 * @property {string[]} phone_numbers - Array of recipient phone numbers.
 * @property {string} message - Message body to send to all recipients.
 * @property {string} sender_id - Identifier of the sender.
 */
interface SendBatchRequest {
  phone_numbers: string[];
  message: string;
  sender_id: string;
}

/**
 * Response returned after sending a batch of messages.
 *
 * @property {number} messageCount - Number of messages attempted or sent.
 * @property {number} creditsDeducted - Credits used for the batch send.
 * @property {number} remainingBalance - Remaining account balance or credits.
 */
interface SendBatchResponse {
  messageCount: number;
  creditsDeducted: number;
  remainingBalance: number;
}

/**
 * Status information for a previously sent message.
 *
 * @property {string} messageId - Unique identifier of the message.
 * @property {string} status - Current delivery or processing status.
 * @property {string|null} sentAt - ISO8601 timestamp when the message was sent, or `null` if not sent.
 * @property {string|null} deliveredAt - ISO8601 timestamp when the message was delivered, or `null` if not delivered.
 */
interface MessageStatusResponse {
  messageId: string;
  status: string;
  sentAt: string | null;
  deliveredAt: string | null;
}

export type {
  SendSingleRequest,
  SendSingleResponse,
  SendBatchRequest,
  SendBatchResponse,
  MessageStatusResponse,
};
