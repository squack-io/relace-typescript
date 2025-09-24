// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import RelaceAgentSDK from 'relace-agent-sdk';

const client = new RelaceAgentSDK({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource repo', () => {
  // Prism tests are disabled
  test.skip('create', async () => {
    const responsePromise = client.repo.create({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.repo.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.repo.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.repo.list(
        {
          created_after: '2019-12-27T18:11:19.117Z',
          created_before: '2019-12-27T18:11:19.117Z',
          filter_metadata: 'filter_metadata',
          order_by: 'created_at',
          order_descending: true,
          page_size: 1,
          page_start: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(RelaceAgentSDK.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.repo.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('askQuestion: only required params', async () => {
    const responsePromise = client.repo.askQuestion('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { query: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('askQuestion: required and optional params', async () => {
    const response = await client.repo.askQuestion('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      query: 'x',
      rerank: true,
      token_limit: 0,
    });
  });

  // Prism tests are disabled
  test.skip('clone', async () => {
    const responsePromise = client.repo.clone('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('clone: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.repo.clone(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { commit: 'commit' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(RelaceAgentSDK.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('retrieveContent: only required params', async () => {
    const responsePromise = client.repo.retrieveContent('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      query: 'x',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieveContent: required and optional params', async () => {
    const response = await client.repo.retrieveContent('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      query: 'x',
      include_content: true,
      rerank: true,
      score_threshold: 0,
      token_limit: 0,
    });
  });

  // Prism tests are disabled
  test.skip('updateContents', async () => {
    const responsePromise = client.repo.updateContents('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
