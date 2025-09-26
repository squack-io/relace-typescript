# Repo

Types:

- <code><a href="./src/resources/repo/repo.ts">File</a></code>
- <code><a href="./src/resources/repo/repo.ts">RepoInfo</a></code>
- <code><a href="./src/resources/repo/repo.ts">RepoMetadata</a></code>
- <code><a href="./src/resources/repo/repo.ts">RepoListResponse</a></code>
- <code><a href="./src/resources/repo/repo.ts">RepoAskQuestionResponse</a></code>
- <code><a href="./src/resources/repo/repo.ts">RepoCloneResponse</a></code>
- <code><a href="./src/resources/repo/repo.ts">RepoRetrieveContentResponse</a></code>

Methods:

- <code title="post /repo">client.repo.<a href="./src/resources/repo/repo.ts">create</a>({ ...params }) -> RepoInfo</code>
- <code title="get /repo/{repo_id}">client.repo.<a href="./src/resources/repo/repo.ts">retrieve</a>(repoID) -> RepoMetadata</code>
- <code title="get /repo">client.repo.<a href="./src/resources/repo/repo.ts">list</a>({ ...params }) -> RepoListResponse</code>
- <code title="delete /repo/{repo_id}">client.repo.<a href="./src/resources/repo/repo.ts">delete</a>(repoID) -> void</code>
- <code title="post /repo/{repo_id}/ask">client.repo.<a href="./src/resources/repo/repo.ts">askQuestion</a>(repoID, { ...params }) -> RepoAskQuestionResponse</code>
- <code title="get /repo/{repo_id}/clone">client.repo.<a href="./src/resources/repo/repo.ts">clone</a>(repoID, { ...params }) -> RepoCloneResponse</code>
- <code title="post /repo/{repo_id}/retrieve">client.repo.<a href="./src/resources/repo/repo.ts">retrieveContent</a>(repoID, { ...params }) -> RepoRetrieveContentResponse</code>
- <code title="post /repo/{repo_id}/update">client.repo.<a href="./src/resources/repo/repo.ts">updateContents</a>(repoID, { ...params }) -> RepoInfo</code>

## File

Types:

- <code><a href="./src/resources/repo/file.ts">FileDownloadResponse</a></code>

Methods:

- <code title="delete /repo/{repo_id}/file/{file_path}">client.repo.file.<a href="./src/resources/repo/file.ts">delete</a>(filePath, { ...params }) -> RepoInfo</code>
- <code title="get /repo/{repo_id}/file/{file_path}">client.repo.file.<a href="./src/resources/repo/file.ts">download</a>(filePath, { ...params }) -> unknown</code>
- <code title="put /repo/{repo_id}/file/{file_path}">client.repo.file.<a href="./src/resources/repo/file.ts">upload</a>(filePath, body, { ...params }) -> RepoInfo</code>

## Batch Helpers

The SDK provides helper classes for performing batch operations on repositories.  
They allow you to stage multiple file operations and commit them together in a single request.

These helpers are **chainable** and provide a fluent interface.

---

### Diff-Based Batch Update (`batchDiffUpdate`)

Use `batchDiffUpdate` when you want to apply a *set of changes* (writes, renames, deletes) to an existing repo without replacing all its contents.  
This is the most efficient way to incrementally update a repo.

**Available Methods:**

| Method | Description |
|-------|-------------|
| `write(filename, content)` | Writes or overwrites a file with the given content |
| `rename(oldFilename, newFilename)` | Renames a file from `oldFilename` to `newFilename` |
| `delete(filename)` | Deletes a file |
| `commit(metadata?)` | Sends all staged operations to the server. Optionally pass `metadata` as a record of key-value pairs (strings only). |

**Example:**

```ts
const result = await client
  .batchDiffUpdate(repoID)
  .write("src/main.ts", "console.log('Hello')")
  .rename("src/old.ts", "src/new.ts")
  .delete("src/unused.ts")
  .commit({ message: "Refactored project structure", author: "Name" });
```
### File Update/Creation Batch (`batchFileCreate/batchFileUpdate`)

Use `batchFileCreate` when you want to add **multiple new files** to a repo in one request.  
This is ideal for initializing a repo or bulk-creating files.

**Available Methods:**

| Method | Description |
|-------|-------------|
| `addFile(filename, content)` | Adds a new file with the specified content |
| `addFiles(filename, content)` | Adds a new file with the specified content |
| `commit(metadata?)` | Sends all staged files to the server. Optionally pass `metadata` as a record of key-value pairs (strings only). |

**Example:**

```ts
const result = await client
  .batchFileCreate()
  .add("src/index.ts", "console.log('New Project')")
  .add("README.md", "# My Project")
  .commit({ message: "Initial commit", author: "Name" });
```
