// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import RelaceAgentSDK, { toFile } from 'relace-agent-sdk';

const client = new RelaceAgentSDK({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource file', () => {
  // Prism tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.repo.file.delete('file_path', {
      repo_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
  test.skip('delete: required and optional params', async () => {
    const response = await client.repo.file.delete('file_path', {
      repo_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Prism tests are disabled
  test.skip('download: only required params', async () => {
    const responsePromise = client.repo.file.download('file_path', {
      repo_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
  test.skip('download: required and optional params', async () => {
    const response = await client.repo.file.download('file_path', {
      repo_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Prism tests are disabled
  test.skip('upload: only required params', async () => {
    const responsePromise = client.repo.file.upload(
      'file_path',
      await toFile(Buffer.from('# my file contents'), 'README.md'),
      { repo_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('upload: required and optional params', async () => {
    const response = await client.repo.file.upload(
      'file_path',
      await toFile(Buffer.from('# my file contents'), 'README.md'),
      { repo_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
    );
  });
});
