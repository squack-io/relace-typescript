// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RepoAPI from './repo';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class File extends APIResource {
  /**
   * Delete a file from a repository.
   *
   * Automatically commits the change and returns the repo info with the updated
   * head.
   */
  delete(filePath: string, params: FileDeleteParams, options?: RequestOptions): APIPromise<RepoAPI.RepoInfo> {
    const { repo_id } = params;
    return this._client.delete(path`/repo/${repo_id}/file/${filePath}`, options);
  }

  /**
   * Read a file from a repository.
   */
  download(filePath: string, params: FileDownloadParams, options?: RequestOptions): APIPromise<unknown> {
    const { repo_id } = params;
    return this._client.get(path`/repo/${repo_id}/file/${filePath}`, options);
  }

  /**
   * Write a file to a repository.
   *
   * Automatically commits the change and returns the repo info with the updated
   * head.
   */
  upload(
    filePath: string,
    body: string | ArrayBuffer | ArrayBufferView | Blob | DataView,
    params: FileUploadParams,
    options?: RequestOptions,
  ): APIPromise<RepoAPI.RepoInfo> {
    const { repo_id } = params;
    return this._client.put(path`/repo/${repo_id}/file/${filePath}`, {
      body: body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/octet-stream' }, options?.headers]),
    });
  }
}

export type FileDownloadResponse = unknown;

export interface FileDeleteParams {
  repo_id: string;
}

export interface FileDownloadParams {
  repo_id: string;
}

export interface FileUploadParams {
  /**
   * Path param:
   */
  repo_id: string;
}

export declare namespace File {
  export {
    type FileDownloadResponse as FileDownloadResponse,
    type FileDeleteParams as FileDeleteParams,
    type FileDownloadParams as FileDownloadParams,
    type FileUploadParams as FileUploadParams,
  };
}
