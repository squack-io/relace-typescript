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
