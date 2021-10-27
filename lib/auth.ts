enum Role {
  admin = 'read+write+admin',
  write = 'read+write',
  read = 'read',
}

const GithubPermissionsMapper = {
  maintainer: Role.admin,
  member: Role.write,
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
  const team = process.env.GITHUB_TEAM;

  const response = await fetch(
    `https://api.github.com/orgs/${owner}/teams/${team}/memberships/${login}`,
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
  const { role: teamRole } = await response.json();
  const role = GithubPermissionsMapper[teamRole] as Role;
  return role;
};
