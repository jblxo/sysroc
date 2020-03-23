import { UserFilters } from '../components/User/UsersFilter';

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
 * Listeners for the user filters change.
 */
let listeners: { (data: UserFilters): void }[] = [];

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
};

/**
 * Register a listener for the change of user filters.
 *
 * @param callback
 */
export const registerUserFiltersListener = (callback: { (data: UserFilters): void }): void => {
  listeners.push(callback);
};

/**
 * Trigger the change of user filters for listeners.
 */
export const triggerUserFiltersChange = (): void => {
  for (const listener of listeners) {
    listener(getUserFilters());
  }
};
