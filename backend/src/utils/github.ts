export async function verifyGitHubRepo(url: string): Promise<{ valid: boolean; repoName: string | null }> {
  const match = url.match(/https?:\/\/github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)/);
  if (!match) return { valid: false, repoName: null };

  const owner = match[1];
  const repo = match[2].replace(/\.git$/, '');

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'AlgoLearn-App' }
    });
    return { valid: res.status === 200, repoName: `${owner}/${repo}` };
  } catch {
    return { valid: false, repoName: null };
  }
}

export function isGitHubUrl(url: string): boolean {
  return /^https?:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+/.test(url);
}
