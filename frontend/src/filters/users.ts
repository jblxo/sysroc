import { UserFilters } from '../components/users/UsersFilter';

/**
 * Get default filters that are useful for default values for a new entry.
 */
const getDefaultUserFilters = (): UserFilters => {
  return {
    name: '',
    email: '',
    adEmail: '',
  };
};

/**
 * Holder of current filters in the administration of users.
 */
let filters: UserFilters = getDefaultUserFilters();

/**
 * Listeners for the reset action.
 */
let resetListeners: { (data: UserFilters): void }[] = [];

/**
 * Set current filters that are applied in the administration of users.
 *
 * @param userFilters
 */
export const setUserFilters = (userFilters: UserFilters): void => {
  filters = userFilters;
};

/**
 * Get current filters in the administration of users.
 */
export const getUserFilters = (): UserFilters => {
  return filters;
};

/**
 * Reset filters that are used in the user administration.
 */
export const setDefaultUserFilters = (): void => {
  setUserFilters(getDefaultUserFilters());

  for (const listener of resetListeners) {
    listener(getUserFilters());
  }
};

/**
 * Register a listener for the reset of user filters.
 *
 * @param callback
 */
export const registerUserFiltersResetListener = (callback: { (data: UserFilters): void }): void => {
  resetListeners.push(callback);
};
