enum Role {
  admin = 'read+write+admin',
  write = 'read+write',
  read = 'read',
}

// const GithubPermissionsMapper = {
//   admin: Role.admin,
//   maintain: Role.admin,
//   triage: Role.write,
//   push: Role.write,
//   pull: Role.read,
// };

const GithubPermissionsMapper = {
  maintainer: Role.admin,
  member: Role.write,
};

type Props = {
  login: string;
  accessToken: string;
};

// from repo collaborators
// export const getRole = async ({
//   login,
//   accessToken,
// }: Props): Promise<Role | null> => {
//   const owner = process.env.GITHUB_OWNER;
//   const repo = process.env.GITHUB_REPO;

//   const response = await fetch(
//     `https://api.github.com/repos/${owner}/${repo}/collaborators/${login}/permission`,
//     {
//       headers: {
//         Accept: 'application/vnd.github.v3+json',
//         Authorization: `token ${accessToken}`,
//       },
//     }
//   );
//   if (!response.ok) {
//     return null;
//   }
//   const { permission } = await response.json();
//   const role = GithubPermissionsMapper[permission] as Role;
//   return role;
// };

// from team
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
