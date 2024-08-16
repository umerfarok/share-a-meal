const cognitoConfig = {
  region: 'us-east-1',
  userPoolId: 'us-east-1_0GyC6RUVj',
  userPoolWebClientId: '3mjr8elclnf2qohg1heb9jvene',
  oauth: {
    domain: 'your-cognito-domain.auth.us-east-1.amazoncognito.com',
    scope: ['email', 'profile', 'openid'],
    redirectSignIn: 'http://localhost:3000/',
    redirectSignOut: 'http://localhost:3000/',
    responseType: 'code'
  }
};

export default cognitoConfig;