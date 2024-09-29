import react from 'react-dom/client';
import React from 'react';
import { App } from './App';

document.addEventListener('DOMContentLoaded', () => {
    const root = react.createRoot(document.getElementById('main') as HTMLElement);
    root.render(<App/>);
});