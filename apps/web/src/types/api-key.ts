import type { authClient } from "@/lib/auth-client";

type CreateApiKeyRequest = NonNullable<
  Parameters<typeof authClient.apiKey.create>[0]
>;

export type CreateApiKeyClientRequest = Omit<CreateApiKeyRequest, "userId">;

export type CreateApiKeyResponse = NonNullable<
  Awaited<ReturnType<typeof authClient.apiKey.create>>["data"]
>;
