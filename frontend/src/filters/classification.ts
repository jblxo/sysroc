import {ClassificationFilters} from "../components/Classification/ClassificationFilter";

const getDefaultClassificationFilters = (): ClassificationFilters => {
    return {};
};

let filters: ClassificationFilters = getDefaultClassificationFilters();

let listeners: { (data: ClassificationFilters): void }[] = [];

export const setClassificationFilters = (classificationFilter: ClassificationFilters): void => {
    filters = classificationFilter;
};

export const getClassificationFilters = (): ClassificationFilters => {
    return filters;
};

export const setDefaultClassificationFilter = (): void => {
    setClassificationFilters(getDefaultClassificationFilters());
};

export const registerClassificationFiltersListener = (callback: { (data: ClassificationFilters): void }): void => {
    listeners.push(callback);
};

export const triggerClassificationFiltersChange = (): void => {
    for(const listener of listeners) {
        listener(getClassificationFilters());
    }
};
