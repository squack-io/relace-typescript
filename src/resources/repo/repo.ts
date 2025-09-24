// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RepoAPI from './repo';
import * as FileAPI from './file';
import { FileDeleteParams, FileDownloadParams, FileDownloadResponse, FileUploadParams } from './file';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Repo extends APIResource {
  file: FileAPI.File = new FileAPI.File(this._client);

  /**
   * Create a new repository from the provided template.
   */
  create(body: RepoCreateParams, options?: RequestOptions): APIPromise<RepoInfo> {
    return this._client.post('/repo', { body, ...options });
  }

  /**
   * Get metadata for a single repository.
   */
  retrieve(repoID: string, options?: RequestOptions): APIPromise<RepoMetadata> {
    return this._client.get(path`/repo/${repoID}`, options);
  }

  /**
   * Get metadata for all repositories owned by the user.
   */
  list(
    query: RepoListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<RepoListResponse> {
    return this._client.get('/repo', { query, ...options });
  }

  /**
   * Delete a repository and its associated data.
   */
  delete(repoID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/repo/${repoID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Ask a question about the repository and receive a natural language response.
   *
   * @deprecated
   */
  askQuestion(
    repoID: string,
    body: RepoAskQuestionParams,
    options?: RequestOptions,
  ): APIPromise<RepoAskQuestionResponse> {
    return this._client.post(path`/repo/${repoID}/ask`, { body, ...options });
  }

  /**
   * Return all readable tracked files in a repository.
   *
   * If a `commit` is provided, read file contents from that commit; otherwise read
   * from the working directory.
   */
  clone(
    repoID: string,
    query: RepoCloneParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<RepoCloneResponse> {
    return this._client.get(path`/repo/${repoID}/clone`, { query, ...options });
  }

  /**
   * Retrieve relevant content from a repository based on a query.
   */
  retrieveContent(
    repoID: string,
    body: RepoRetrieveContentParams,
    options?: RequestOptions,
  ): APIPromise<RepoRetrieveContentResponse> {
    return this._client.post(path`/repo/${repoID}/retrieve`, { body, ...options });
  }

  /**
   * Apply repository changes and update embeddings.
   *
   * See the model docs for details of each update variant:
   *
   * - RepoUpdateFiles - snapshot replacement of tracked files
   * - RepoUpdateDiff - explicit write/delete/rename operations
   * - RepoUpdateGit - pull & merge from a remote Git repository
   *
   * Returns: RepoInfo: Includes the new repo head and, when determinable, a list of
   * changed files for convenience.
   *
   * Error codes: 400: Invalid request type / diff operation / failed remote merge.
   * 404: Referenced file for delete/rename does not exist. 423: Repository lock
   * contention.
   */
  updateContents(
    repoID: string,
    body: RepoUpdateContentsParams,
    options?: RequestOptions,
  ): APIPromise<RepoInfo> {
    return this._client.post(path`/repo/${repoID}/update`, { body, ...options });
  }
}

/**
 * Text file payload used in create/update requests.
 *
 * Attributes: filename: Repository-relative path (POSIX). Directories are created
 * as needed. Treated as UTF-8 text; binary content should be avoided. content:
 * Full in-memory textual content to write.
 */
export interface File {
  content: string;

  filename: string;
}

export interface RepoInfo {
  repo_head: string;

  repo_id: string;

  changed_files?: Array<string> | null;
}

export interface RepoMetadata {
  created_at: string;

  repo_id: string;

  metadata?: { [key: string]: string } | null;

  updated_at?: string | null;
}

export interface RepoListResponse {
  items: Array<RepoMetadata>;

  total_items: number;

  next_page?: number | null;
}

export interface RepoAskQuestionResponse {
  answer: string;
}

/**
 * Response containing all readable files in a repository.
 */
export interface RepoCloneResponse {
  files?: Array<RepoCloneResponse.File>;
}

export namespace RepoCloneResponse {
  /**
   * Represents a cloned file with its path and full content.
   */
  export interface File {
    content: string;

    filename: string;
  }
}

export interface RepoRetrieveContentResponse {
  pending_embeddings: number;

  results: Array<RepoRetrieveContentResponse.Result>;
}

export namespace RepoRetrieveContentResponse {
  export interface Result {
    filename: string;

    score: number;

    content?: string | null;
  }
}

export interface RepoCreateParams {
  metadata?: { [key: string]: string } | null;

  source?:
    | RepoCreateParams.RepoCreateGitSource
    | RepoCreateParams.RepoCreateFilesSource
    | RepoCreateParams.RepoCreateRelaceSource
    | null;
}

export namespace RepoCreateParams {
  export interface RepoCreateGitSource {
    type: 'git';

    url: string;

    branch?: string | null;

    hash?: string | null;
  }

  export interface RepoCreateFilesSource {
    files: Array<RepoAPI.File>;

    type: 'files';
  }

  export interface RepoCreateRelaceSource {
    repo_id: string;

    type: 'relace';

    copy_metadata?: boolean;

    copy_remote?: boolean;
  }
}

export interface RepoListParams {
  created_after?: string | null;

  created_before?: string | null;

  filter_metadata?: string | null;

  order_by?: 'created_at' | 'updated_at';

  order_descending?: boolean;

  page_size?: number;

  page_start?: number;
}

export interface RepoAskQuestionParams {
  query: string;

  rerank?: boolean;

  token_limit?: number;
}

export interface RepoCloneParams {
  commit?: string | null;
}

export interface RepoRetrieveContentParams {
  query: string;

  include_content?: boolean;

  rerank?: boolean;

  score_threshold?: number;

  token_limit?: number;
}

export interface RepoUpdateContentsParams {
  metadata?: { [key: string]: string } | null;

  /**
   * Snapshot-style repository update.
   *
   * Treat the provided `files` list as the complete authoritative set of tracked
   * text files. Any previously tracked file that is not present in the list will be
   * deleted. Each listed file is created or overwritten.
   *
   * This mirrors the semantics of replacing the working tree with exactly the
   * supplied set (excluding ignored/untracked items). Binary files are skipped
   * downstream during embedding.
   *
   * Attributes: type: Discriminator literal `"files"`. files: List of files that
   * should exist after the operation.
   */
  source?:
    | RepoUpdateContentsParams.RepoUpdateFiles
    | RepoUpdateContentsParams.RepoUpdateDiff
    | RepoUpdateContentsParams.RepoUpdateGit
    | null;
}

export namespace RepoUpdateContentsParams {
  /**
   * Snapshot-style repository update.
   *
   * Treat the provided `files` list as the complete authoritative set of tracked
   * text files. Any previously tracked file that is not present in the list will be
   * deleted. Each listed file is created or overwritten.
   *
   * This mirrors the semantics of replacing the working tree with exactly the
   * supplied set (excluding ignored/untracked items). Binary files are skipped
   * downstream during embedding.
   *
   * Attributes: type: Discriminator literal `"files"`. files: List of files that
   * should exist after the operation.
   */
  export interface RepoUpdateFiles {
    files: Array<RepoAPI.File>;

    type: 'files';
  }

  /**
   * Explicit patch consisting of write/delete/rename operations.
   *
   * Operations are collected and then applied in three phases: deletes, writes,
   * renames. Within a single request duplicate operations targeting the same path
   * are not currently validated; the _last_ write wins for a file, and the final
   * mapping for each rename source path is used. Future improvements may add
   * canonicalisation/validation.
   *
   * Attributes: type: Discriminator literal `"diff"`. operations: Heterogeneous list
   * of file operations (see individual operation model docstrings for semantics).
   */
  export interface RepoUpdateDiff {
    operations: Array<
      | RepoUpdateDiff.FileWriteOperation
      | RepoUpdateDiff.FileDeleteOperation
      | RepoUpdateDiff.FileRenameOperation
    >;

    type: 'diff';
  }

  export namespace RepoUpdateDiff {
    /**
     * Create or overwrite a file with textual content.
     *
     * Used inside a :class:`RepoUpdateDiff`. The final content for a path is the value
     * from the last write operation targeting that path within the request (operations
     * are aggregated; order is not otherwise significant).
     *
     * Attributes: type: Discriminator literal `"write"`. filename: Target file path
     * (created if missing; parent dirs auto-created). content: UTF-8 text content.
     */
    export interface FileWriteOperation {
      content: string;

      filename: string;

      type: 'write';
    }

    /**
     * Delete a file or (recursively) a directory.
     *
     * If the referenced path does not exist the update request fails with 404.
     *
     * Attributes: type: Discriminator literal `"delete"`. filename: File or directory
     * path to remove.
     */
    export interface FileDeleteOperation {
      filename: string;

      type: 'delete';
    }

    /**
     * Rename (move) a file.
     *
     * Renames are applied after all writes and deletes have been processed to avoid
     * transient conflicts. The source path must exist at execution time or the request
     * fails with 404. Directory renames are not currently supported explicitly (only
     * existing paths that resolve to files are expected).
     *
     * Attributes: type: Discriminator literal `"rename"`. old_filename: Existing file
     * path. new_filename: Destination file path (created parent dirs as needed).
     */
    export interface FileRenameOperation {
      new_filename: string;

      old_filename: string;

      type: 'rename';
    }
  }

  export interface RepoUpdateGit {
    type: 'git';

    url: string;

    branch?: string | null;
  }
}

export declare namespace Repo {
  export {
    type File as File,
    type RepoInfo as RepoInfo,
    type RepoMetadata as RepoMetadata,
    type RepoListResponse as RepoListResponse,
    type RepoAskQuestionResponse as RepoAskQuestionResponse,
    type RepoCloneResponse as RepoCloneResponse,
    type RepoRetrieveContentResponse as RepoRetrieveContentResponse,
    type RepoCreateParams as RepoCreateParams,
    type RepoListParams as RepoListParams,
    type RepoAskQuestionParams as RepoAskQuestionParams,
    type RepoCloneParams as RepoCloneParams,
    type RepoRetrieveContentParams as RepoRetrieveContentParams,
    type RepoUpdateContentsParams as RepoUpdateContentsParams,
  };

  export {
    type FileDownloadResponse as FileDownloadResponse,
    type FileDeleteParams as FileDeleteParams,
    type FileDownloadParams as FileDownloadParams,
    type FileUploadParams as FileUploadParams,
  };
}
