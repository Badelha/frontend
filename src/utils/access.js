export function getUserRole(user) {
  const roles = [user?.role, user?.roles]
    .flat()
    .filter(Boolean)
    .map((role) => {
      if (typeof role === 'string') return role;
      return role.name || role.roleName || role.role?.name || '';
    })
    .filter(Boolean)
    .map((role) => String(role).trim().toUpperCase());

  if (roles.includes('ADMIN')) return 'ADMIN';
  if (roles.includes('MODERATOR')) return 'MODERATOR';
  if (roles.includes('USER')) return 'USER';
  return 'USER';
}

export function isAdminUser(user) {
  return getUserRole(user) === 'ADMIN';
}

export function getPostLoginPath(user, fallback = '/homepage') {
  return isAdminUser(user) ? '/admin/dashboard' : fallback;
}
