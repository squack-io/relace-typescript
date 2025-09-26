import { RelaceAgentSDK } from './client';
import fs from 'fs';

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
  private metadata?: Record<string, string>;
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

  /**
   * Set optional metadata for the update.
   */
  setMetadata(metadata: Record<string, string>): this {
    this.metadata = metadata;
    return this;
  }

  async execute() {
    return this.client.repo.updateContents(this.repoId, {
      source: { type: 'diff', operations: this.operations },
      ...(this.metadata ? { metadata: this.metadata } : {}),
    });
  }
}

/**
 * Class for performing updating repo contents with a files array
 */
class batchFilesUpdate {
  private files: FileObject[] = [];
  private filePaths: string[] = [];
  private metadata?: Record<string, string>;

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

  /**
   * Lazily add a file from disk. Content is only read at commit().
   */
  addFileFromPath(filePath: string): this {
    this.filePaths.push(filePath);
    return this;
  }

  /**
   * Set optional metadata for the update.
   */
  setMetadata(metadata: Record<string, string>): this {
    this.metadata = metadata;
    return this;
  }

  /**
   * Load any queued file paths before commit
   */
  private loadFilesFromPaths() {
    for (const filePath of this.filePaths) {
      const content = fs.readFileSync(filePath, 'utf8');
      this.files.push({
        filename: filePath,
        content,
      });
    }
    this.filePaths = [];
  }

  async execute() {
    this.loadFilesFromPaths();
    return this.client.repo.updateContents(this.repoId, {
      source: { type: 'files', files: this.files },
      ...(this.metadata ? { metadata: this.metadata } : {}),
    });
  }
}

/**
 * Class for creating repo contents with a files array
 */
class batchFilesCreate {
  private files: FileObject[] = [];
  private filePaths: string[] = [];
  private metadata?: Record<string, string>;
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

  /**
   * Lazily add a file from disk. Content is only read at commit().
   */
  addFileFromPath(filePath: string): this {
    this.filePaths.push(filePath);
    return this;
  }

  /**
   * Set optional metadata for the update.
   */
  setMetadata(metadata: Record<string, string>): this {
    this.metadata = metadata;
    return this;
  }

  /**
   * Load any queued file paths before commit
   */
  private loadFilesFromPaths() {
    for (const filePath of this.filePaths) {
      const content = fs.readFileSync(filePath, 'utf8');
      this.files.push({
        filename: filePath,
        content,
      });
    }
    this.filePaths = [];
  }

  async execute() {
    this.loadFilesFromPaths();
    return this.client.repo.create({
      source: { type: 'files', files: this.files },
      ...(this.metadata ? { metadata: this.metadata } : {}),
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
