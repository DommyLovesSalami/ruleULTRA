import { writable } from 'svelte/store';

export const quickTags = writable([]);
export const favoriteTags = writable([]);
export const darkMode = writable(false);
export const endlessScroll = writable(false);
export const scrollToTopButton = writable(false);

