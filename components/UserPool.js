import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'ap-south-1_j5dQKEw4r',
    ClientId: '6p89asc9gsjbrkmknips8lbvgq'
};

export default new CognitoUserPool(poolData);