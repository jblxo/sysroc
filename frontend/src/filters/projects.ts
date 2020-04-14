import {ProjectFilters} from "../components/Project/ProjectsFilter";

const getDefaultProjectFilters = (): ProjectFilters => {
    return {
        name: ''
    }
};

let filters: ProjectFilters = getDefaultProjectFilters();

let listeners: { (data: ProjectFilters): void }[] = [];

export const setProjectFilters = (projectFilters: ProjectFilters): void => {
    filters = projectFilters;
};

export const getProjectFilters = (): ProjectFilters => {
    return filters;
};

export const setDefaultProjectFilters = (): void => {
    setProjectFilters(getDefaultProjectFilters());
};

export const registerProjectFiltersListener = (callback: { (data: ProjectFilters): void }): void => {
    listeners.push(callback);
};

export const triggerProjectFiltersChange = (): void => {
    for(const listener of listeners) {
        listener(getProjectFilters());
    }
};
