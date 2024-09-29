import react from 'react-dom/client';
import React from 'react';
import { App } from './App';
import { AdminFlagProvider } from './AdminFlagProvider';

document.addEventListener('DOMContentLoaded', () => {
    const root = react.createRoot(document.getElementById('main') as HTMLElement);
    root.render(<AdminFlagProvider><App/></AdminFlagProvider>);
});