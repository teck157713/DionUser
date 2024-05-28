// Convert url to base64
export const urlToBase64 = async (url: string) => {
    const data = await fetch(url);
    const blob = await data.blob();

    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve((reader.result as string) || "");
        reader.onerror = reject;
    });
}