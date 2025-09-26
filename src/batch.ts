import { RelaceAgentSDK } from './client';

/**
 * Types for file operations.
 */
type WriteOperation = {
  type: 'write';
  filename: string;
  content: string;
};

type RenameOperation = {
  type: 'rename';
  old_filename: string;
  new_filename: string;
};

type DeleteOperation = {
  type: 'delete';
  filename: string;
};

type Metadata = Record<string, any>;

type Operation = WriteOperation | RenameOperation | DeleteOperation;

/**
 * Types for full-replace file objects.
 */
type FileObject = {
  filename: string;
  content: string;
};

/**
 * Class for performing diff-based batch updates
 */
class batchDiffUpdate {
  private operations: Operation[] = [];
  constructor(
    private client: RelaceAgentSDK,
    private repoId: string,
  ) {}

  write(filename: string, content: string): this {
    this.operations.push({ type: 'write', filename, content });
    return this;
  }

  rename(oldFilename: string, newFilename: string): this {
    this.operations.push({ type: 'rename', old_filename: oldFilename, new_filename: newFilename });
    return this;
  }

  delete(filename: string): this {
    this.operations.push({ type: 'delete', filename });
    return this;
  }

  async commit(metadata: Metadata) {
    return this.client.repo.updateContents(this.repoId, {
      source: { type: 'diff', operations: this.operations },
      ...(metadata && { metadata }),
    });
  }
}

/**
 * Class for performing updating repo contents with a files array
 */
class batchFilesUpdate {
  private files: FileObject[] = [];
  constructor(
    private client: RelaceAgentSDK,
    private repoId: string,
  ) {}

  addFile(filename: string, content: string): this {
    this.files.push({ filename, content });
    return this;
  }

  // Add multiple files at once
  addFiles(files: FileObject[]): this {
    this.files.push(...files);
    return this;
  }

  async commit(metadata?: Record<string, any>) {
    return this.client.repo.updateContents(this.repoId, {
      source: { type: 'files', files: this.files },
      ...(metadata ? { metadata } : {}),
    });
  }
}

/**
 * Class for creating repo contents with a files array
 */
class batchFilesCreate {
  private files: FileObject[] = [];
  constructor(private client: RelaceAgentSDK) {}

  addFile(filename: string, content: string): this {
    this.files.push({ filename, content });
    return this;
  }

  // Add mutiple files at once
  addFiles(files: FileObject[]): this {
    this.files.push(...files);
    return this;
  }

  async commit(metadata?: Record<string, any>) {
    return this.client.repo.create({
      source: { type: 'files', files: this.files },
      ...(metadata ? { metadata } : {}),
    });
  }
}

export function attachBatchUpdate(ClientClass: typeof RelaceAgentSDK) {
  (ClientClass.prototype as any).batchDiffUpdate = function (repoId: string) {
    return new batchDiffUpdate(this, repoId);
  };
  (ClientClass.prototype as any).batchFilesUpdate = function (repoId: string) {
    return new batchFilesUpdate(this, repoId);
  };
  (ClientClass.prototype as any).batchFilesCreate = function () {
    return new batchFilesCreate(this);
  };
}
