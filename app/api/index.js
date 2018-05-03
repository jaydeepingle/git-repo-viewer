async function apiGet (url) {
  const headers = new Headers();
  headers.set('Accept', 'application/vnd.github.v3.html');
  try {
    const response = await fetch(url, { headers });

    return await response;
  } catch (error) {
    throw error;
  }
}

export async function fetchFolderDetails(url) {
  const response = await apiGet(url);
  return response.json();
}

export async function getRepoDetails ({ username, repoName }) {
  const url = `https://api.github.com/repos/${username}/${repoName}/contents`;
  const response = await apiGet(url);
  return response.json();
}

export async function getFileContents ({ username, repoName, path }) {
  const url = `https://api.github.com/repos/${username}/${repoName}/contents/${path}`;
  const response = await apiGet(url);
  return response.text();
}
