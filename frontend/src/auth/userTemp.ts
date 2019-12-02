import { Maybe, UserTempDto } from '../generated/graphql';

/**
 * Holder of the user object for the step of the registration where the data can be changed.
 */
let userTemp: Maybe<UserTempDto>;

export const setUserTemp = (temp: Maybe<UserTempDto>) => {
  userTemp = temp;
};

export const getUserTemp = () => {
  return userTemp;
};
