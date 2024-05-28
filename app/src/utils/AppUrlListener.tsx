import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { App, URLOpenListenerEvent } from "@capacitor/app";

export function AppUrlListener() {
    const navigate = useNavigate();

    useEffect(() => {
        App.addListener("appUrlOpen", (event: URLOpenListenerEvent) => {
            const slug = event.url.split(import.meta.env.VITE_APP_URL).pop();

            if (slug) {
                navigate(slug, {
                    replace: true
                });
            }
        })
    }, []);

    return null;
}