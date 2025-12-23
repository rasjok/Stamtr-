import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

try {
  const container = document.getElementById('app-container');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
} catch (error) {
  console.error("Critical error during React mount:", error);
  const container = document.getElementById('app-container');
  if (container) {
    container.innerHTML = `<div style="padding: 20px; color: #8b7355; font-family: serif; text-align: center;">
      <h2 style="font-size: 24px;">Beklager, der skete en fejl</h2>
      <p style="font-size: 16px;">Applikationen kunne ikke indlæses korrekt.</p>
      <pre style="text-align: left; font-size: 10px; opacity: 0.5; margin-top: 20px; overflow: auto;">${error instanceof Error ? error.message : String(error)}</pre>
    </div>`;
  }
}