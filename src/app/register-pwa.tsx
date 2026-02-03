"use client";
import type { Workbox } from "workbox-window";
import { useEffect } from "react";

declare global {
	interface Window {
		workbox: Workbox;
	}
}

export function RegisterPWA() {
	useEffect(() => {
		if ("serviceWorker" in navigator && window.workbox !== undefined) {
			const wb = window.workbox;
			console.log("registering service worker");

			wb.register();
		}
	}, []);
	return <></>;
}
