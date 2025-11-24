import { SendSingleResponse, SendSingleRequest, SendBatchResponse, SendBatchRequest, MessageStatusResponse } from "./types";


export class NotifyAfricaSMS {
  private baseUrl: string;
  private apiToken: string;

  constructor(apiToken: string, baseUrl: string = "https://api.notify.africa") {
    this.apiToken = apiToken;
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  }

  /**
   * Sends a single SMS message.
   * @param phoneNumber The recipient's phone number (e.g., "255689737459").
   * @param message The message content.
   * @param senderId The sender ID (e.g., "137").
   * @returns The response data with messageId and status.
   */
  async sendSingleMessage(
    phoneNumber: string,
    message: string,
    senderId: string
  ): Promise<SendSingleResponse> {
    const url = `${this.baseUrl}/api/v1/api/messages/send`;
    const body: SendSingleRequest = {
      phone_number: phoneNumber,
      message,
      sender_id: senderId,
    };
    const headers = {
      Authorization: `Bearer ${this.apiToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }
      const data = await response.json();
      if (data.status !== 200) {
        throw new Error(data.message || "Failed to send message");
      }
      return data.data;
    } catch (error) {
      throw new Error(
        `Error sending single message: ${(error as Error).message}`
      );
    }
  }

  /**
   * Sends a batch of SMS messages to multiple recipients.
   * @param phoneNumbers Array of recipient phone numbers (e.g., ["255763765548", "255689737839"]).
   * @param message The message content.
   * @param senderId The sender ID (e.g., "137").
   * @returns The response data with messageCount, creditsDeducted, and remainingBalance.
   */
  async sendBatchMessages(
    phoneNumbers: string[],
    message: string,
    senderId: string
  ): Promise<SendBatchResponse> {
    const url = `${this.baseUrl}/api/v1/api/messages/batch`;
    const body: SendBatchRequest = {
      phone_numbers: phoneNumbers,
      message,
      sender_id: senderId,
    };
    const headers = {
      Authorization: `Bearer ${this.apiToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }
      const data = await response.json();
      if (data.status !== 200) {
        throw new Error(data.message || "Failed to send batch messages");
      }
      return data.data;
    } catch (error) {
      throw new Error(
        `Error sending batch messages: ${(error as Error).message}`
      );
    }
  }

  /**
   * Checks the status of a sent message.
   * @param messageId The ID of the message to check (e.g., "156022").
   * @returns The response data with messageId, status, sentAt, and deliveredAt.
   */
  async checkMessageStatus(messageId: string): Promise<MessageStatusResponse> {
    const url = `${this.baseUrl}/api/v1/api/messages/status/${messageId}`;
    const headers = {
      Authorization: `Bearer ${this.apiToken}`,
    };

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }
      const data = await response.json();
      if (data.status !== 200) {
        throw new Error(data.message || "Failed to retrieve message status");
      }
      return data.data;
    } catch (error) {
      throw new Error(
        `Error checking message status: ${(error as Error).message}`
      );
    }
  }
}
