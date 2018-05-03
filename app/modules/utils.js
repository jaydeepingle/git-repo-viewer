export function extractRepoDetails (url) {
  const strippedUrl = url.replace('https://github.com/', '');
  const [ username, repoName ] = strippedUrl.split('/');
  return { username, repoName };
}
