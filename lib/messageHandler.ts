import ExtMessage, { MessageType } from "@/entrypoints/types";


// messageHandler.ts
export const setupMessageHandler = (
    setShowContent: (value: boolean) => void,
    i18n: any,
    toggleTheme: any
) => {
    browser.runtime.onMessage.addListener((message: ExtMessage, sender, sendResponse) => {
        console.log('Received message:', message);
        if (message.messageType == MessageType.clickExtIcon) {
            setShowContent(true);
        } else if (message.messageType == MessageType.changeLocale) {
            i18n.changeLanguage(message.content);
        } else if (message.messageType == MessageType.changeTheme) {
            toggleTheme(message.content);
        }
    });
};
