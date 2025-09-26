import { attachBatchUpdate } from '../src/batch';
import { RelaceAgentSDK } from '../src/client';

class MockClient {
  repo = {
    updateContents: jest.fn(),
    create: jest.fn(),
  };
}

describe('batchDiffUpdate', () => {
  let client: any;

  beforeEach(() => {
    client = new MockClient();
    attachBatchUpdate(RelaceAgentSDK);
    Object.setPrototypeOf(client, RelaceAgentSDK.prototype);
  });

  it('accumulates write/rename/delete operations', async () => {
    const batch = client.batchDiffUpdate('repo-123');

    batch.write('file1.txt', 'hello world').rename('old.txt', 'new.txt').delete('remove.txt');

    await batch.commit({ version: 'v1' });

    expect(client.repo.updateContents).toHaveBeenCalledWith(
      'repo-123',
      expect.objectContaining({
        source: {
          type: 'diff',
          operations: [
            { type: 'write', filename: 'file1.txt', content: 'hello world' },
            { type: 'rename', old_filename: 'old.txt', new_filename: 'new.txt' },
            { type: 'delete', filename: 'remove.txt' },
          ],
        },
        metadata: { version: 'v1' },
      }),
    );
  });

  it('omits metadata if not provided', async () => {
    const batch = client.batchDiffUpdate('repo-123');
    batch.write('file.txt', 'content');

    await batch.commit(undefined as any);

    expect(client.repo.updateContents).toHaveBeenCalledWith(
      'repo-123',
      expect.objectContaining({
        source: {
          type: 'diff',
          operations: [{ type: 'write', filename: 'file.txt', content: 'content' }],
        },
      }),
    );
  });
});

describe('batchFilesUpdate', () => {
  let client: any;

  beforeEach(() => {
    client = new MockClient();
    attachBatchUpdate(RelaceAgentSDK);
    Object.setPrototypeOf(client, RelaceAgentSDK.prototype);
  });

  it('accumulates files and commits', async () => {
    const batch = client.batchFilesUpdate('repo-456');

    batch.addFile('a.txt', 'abc').addFiles([{ filename: 'b.txt', content: 'xyz' }]);

    await batch.commit({ author: 'author' });

    expect(client.repo.updateContents).toHaveBeenCalledWith(
      'repo-456',
      expect.objectContaining({
        source: {
          type: 'files',
          files: [
            { filename: 'a.txt', content: 'abc' },
            { filename: 'b.txt', content: 'xyz' },
          ],
        },
        metadata: { author: 'author' },
      }),
    );
  });
});

describe('batchFilesCreate', () => {
  let client: any;

  beforeEach(() => {
    client = new MockClient();
    attachBatchUpdate(RelaceAgentSDK);
    Object.setPrototypeOf(client, RelaceAgentSDK.prototype);
  });

  it('creates repo contents with files', async () => {
    const batch = client.batchFilesCreate();

    batch.addFile('init.txt', 'start').addFiles([{ filename: 'readme.md', content: '# Title' }]);

    await batch.commit({ tag: 'init' });

    expect(client.repo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        source: {
          type: 'files',
          files: [
            { filename: 'init.txt', content: 'start' },
            { filename: 'readme.md', content: '# Title' },
          ],
        },
        metadata: { tag: 'init' },
      }),
    );
  });
});
