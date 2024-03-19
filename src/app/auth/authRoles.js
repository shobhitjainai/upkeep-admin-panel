/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['admin'],
  landlord: ['admin', 'landlord'],
  tenant: ['admin', 'landlord', 'tenant'],
  onlyGuest: [],
};

export default authRoles;
