// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { RelaceAgentSDK } from '../client';

export abstract class APIResource {
  protected _client: RelaceAgentSDK;

  constructor(client: RelaceAgentSDK) {
    this._client = client;
  }
}
