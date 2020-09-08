export const ROLES = {
  TEST: "Test",
  EVERYONE: "@everyone",
};

export const isMemberAssignedToAnyOfRoles = (member, rolesToCompare) => {
  return member.roles.cache.some((r) => rolesToCompare.includes(r.name));
};
