import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Set 'dark' as the default theme.
const defaultValue = 'dark';
// Get the stored theme from localStorage, or use the default.
const initialValue = browser
    ? window.localStorage.getItem('theme') ?? defaultValue
    : defaultValue;

// Create a writable store.
export const theme = writable(initialValue);

// Whenever the theme store changes, update localStorage.
theme.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('theme', value);
    }
});