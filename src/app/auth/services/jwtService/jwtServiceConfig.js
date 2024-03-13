const jwtServiceConfig = {
  signIn: 'api/auth/sign-in',
  signUp: `${process.env.BASE_URL}/upkeep/app/auth/signup`,
  accessToken: 'api/auth/access-token',
  updateUser: 'api/auth/user/update',
};

export default jwtServiceConfig;
