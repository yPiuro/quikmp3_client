import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Default to dark mode :)
const defaultValue = 'dark';
const initialValue = browser
    ? window.localStorage.getItem('theme') ?? defaultValue
    : defaultValue;

export const theme = writable(initialValue);

theme.subscribe((value) => {
    if (!browser) return;
    window.localStorage.setItem('theme', value);
    // Toggle the `dark` class on the root <html> to use tailwind `dark:`
    document.documentElement.classList.toggle('dark', value === 'dark');
});