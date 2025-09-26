// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export { RelaceAgentSDK as default } from './client';

export { type Uploadable, toFile } from './core/uploads';
export { APIPromise } from './core/api-promise';
export { RelaceAgentSDK, type ClientOptions } from './client';
export {
  RelaceAgentSDKError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './core/error';

// --- CUSTOM CODE STARTS HERE ---
import { attachBatchUpdate } from './batch';
import { RelaceAgentSDK } from './client';
attachBatchUpdate(RelaceAgentSDK);
