import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./tailwind.css";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeProvider.jsx";

try {
	const rootElement = document.getElementById("root");
	if (!rootElement) {
		throw new Error("Root element not found - check index.html for <div id='root'></div>");
	}
	createRoot(rootElement).render(
		<AuthProvider>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</AuthProvider>
	);
	console.log("✓ App initialized successfully");
} catch (error) {
	console.error("❌ Failed to initialize app:", error);
	console.error("Stack:", error.stack);
	// Display error on page
	document.body.innerHTML = `<div style="padding:20px;color:red;font-family:monospace;"><strong>App Error:</strong><br/>${error.message}</div>`;
}
