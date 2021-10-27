enum Role {
  admin = 'read+write+admin',
  write = 'read+write',
  read = 'read',
}

const GithubPermissionsMapper = {
  admin: Role.admin,
  maintain: Role.admin,
  triage: Role.write,
  push: Role.write,
  pull: Role.read,
};

type Props = {
  login: string;
  accessToken: string;
};

export const getRole = async ({
  login,
  accessToken,
}: Props): Promise<Role | null> => {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/collaborators/${login}/permission`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    return null;
  }
  const { permission } = await response.json();
  const role = GithubPermissionsMapper[permission] as Role;
  return role;
};
