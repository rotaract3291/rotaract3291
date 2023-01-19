import { CognitoUserPool } from 'amazon-cognito-identity-js';

//test
/*const poolData = {
    UserPoolId: 'ap-south-1_j5dQKEw4r',
    ClientId: '6p89asc9gsjbrkmknips8lbvgq'
};*/

//test2
const poolData = {
    UserPoolId: 'ap-northeast-1_Tupmhe1Ek',
    ClientId: '6vvl8mfr1j6eifbed6rrrtf6i5'
};

export default new CognitoUserPool(poolData);