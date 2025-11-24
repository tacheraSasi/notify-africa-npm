import { NotifyAfrica } from "../src/index";

describe("NotifyAfrica", () => {
  const apiToken = "test-token";
  let client: NotifyAfrica;

  beforeEach(() => {
    client = new NotifyAfrica(apiToken, "https://api.test");
    (global as any).fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("sendSingleMessage - success", async () => {
    (global as any).fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        status: 200,
        data: { messageId: "msg1", status: "queued" },
      }),
    });

    const res = await client.sendSingleMessage("255600000", "hello", "137");

    expect(res).toEqual({ messageId: "msg1", status: "queued" });
    expect((global as any).fetch).toHaveBeenCalledTimes(1);
    const [url, opts] = (global as any).fetch.mock.calls[0];
    expect(url).toBe("https://api.test/api/v1/api/messages/send");
    expect(opts.method).toBe("POST");
    const body = JSON.parse(opts.body);
    expect(body).toEqual({
      phone_number: "255600000",
      message: "hello",
      sender_id: "137",
    });
    expect(opts.headers.Authorization).toBe(`Bearer ${apiToken}`);
  });

  test("sendBatchMessages - success", async () => {
    (global as any).fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        status: 200,
        data: { messageCount: 2, creditsDeducted: 2, remainingBalance: 98 },
      }),
    });

    const res = await client.sendBatchMessages(
      ["255600001", "255600002"],
      "hi all",
      "137"
    );

    expect(res).toEqual({
      messageCount: 2,
      creditsDeducted: 2,
      remainingBalance: 98,
    });
    expect((global as any).fetch).toHaveBeenCalledTimes(1);
    const [url, opts] = (global as any).fetch.mock.calls[0];
    expect(url).toBe("https://api.test/api/v1/api/messages/batch");
    const body = JSON.parse(opts.body);
    expect(body).toEqual({
      phone_numbers: ["255600001", "255600002"],
      message: "hi all",
      sender_id: "137",
    });
  });

  test("checkMessageStatus - success", async () => {
    (global as any).fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        status: 200,
        data: {
          messageId: "msg1",
          status: "delivered",
          sentAt: "2025-01-01T00:00:00Z",
          deliveredAt: "2025-01-01T00:01:00Z",
        },
      }),
    });

    const res = await client.checkMessageStatus("msg1");

    expect(res).toEqual({
      messageId: "msg1",
      status: "delivered",
      sentAt: "2025-01-01T00:00:00Z",
      deliveredAt: "2025-01-01T00:01:00Z",
    });
    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://api.test/api/v1/api/messages/status/msg1",
      expect.any(Object)
    );
  });

  test("sendSingleMessage - handles http error", async () => {
    (global as any).fetch.mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: "Unauthorized" }),
    });

    await expect(client.sendSingleMessage("255", "x", "1")).rejects.toThrow(
      "Unauthorized"
    );
  });
});
