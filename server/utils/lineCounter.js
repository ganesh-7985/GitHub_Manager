/*
 * Utility to count the number of lines in a repository.  The Git providers
 * do not expose an API to count lines, so you need to download the
 * repository archive and compute it yourself.  For a complete solution
 * you could fetch the tarball for the default branch using the user's
 * access token, extract it and sum the number of lines in all text files.
 *
 * This function is left as a stub so that you can implement the line
 * counting logic as part of the bonus requirement.
 */

export async function countLinesInRepo({ provider, repoFullName, branch, token }) {
  // Placeholder implementation.  Always returns zero lines.
  // To implement properly you can use node-fetch or axios to download
  // `https://api.github.com/repos/{owner}/{repo}/tarball/{branch}` with
  // appropriate authorization headers, then decompress the tarball and
  // iterate through files, counting lines in each.  You may want to
  // ignore binary files.
  return 0;
}