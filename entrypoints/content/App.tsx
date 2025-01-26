import React, {useEffect, useRef, useState} from 'react';
import './App.module.css';
import '../../assets/main.css'
import {Home} from "@/entrypoints/content/home.tsx";
import {SettingsPage} from "@/entrypoints/content/settings.tsx";
import Sidebar, {SidebarType} from "@/entrypoints/sidebar.tsx";
import {browser} from "wxt/browser";
import ExtMessage, {MessageType} from "@/entrypoints/types.ts";
import Header from "@/entrypoints/content/header.tsx";
import {useTranslation} from "react-i18next";
import {useTheme} from "@/components/theme-provider.tsx";
import { setupEventHandlers } from '@/lib/eventHandlers';
import { setupMessageHandler } from '@/lib/messageHandler';

export default () => {
    const [showContent, setShowContent] = useState(false);
    const [showButton, setShowButton] = useState(false)
    const [showCard, setShowCard] = useState(false)
    const [sidebarType, setSidebarType] = useState<SidebarType>(SidebarType.home);
    const [headTitle, setHeadTitle] = useState("home")
    const [buttonStyle, setButtonStyle] = useState<any>();
    const [cardStyle, setCardStyle] = useState<any>();
    const cardRef = useRef<HTMLDivElement>(null);
    const {i18n} = useTranslation();
    const {theme, toggleTheme} = useTheme();

    async function initI18n() {
        let data = await browser.storage.local.get('i18n');
        if (data.i18n) {
            await i18n.changeLanguage(data.i18n)
        }
    }

    function domLoaded() {
        console.log("dom loaded")
    }

    useEffect(() => {
        setupEventHandlers(setShowContent);
        setupMessageHandler(setShowContent, i18n, toggleTheme);
    }, []);
    


    return (
        <div className={theme}>
            {showContent && <div
                className="fixed top-0 right-0 h-screen w-[400px] bg-background z-[1000000000000] rounded-l-xl shadow-2xl">
                <Header headTitle={"Inner tabs"}/>
                <Sidebar closeContent={() => {
                    setShowContent(false)
                }} sideNav={(sidebarType: SidebarType) => {
                    setSidebarType(sidebarType)
                    setHeadTitle(sidebarType)
                }}/>
                <main className="mr-14 grid gap-4 p-4">
                    {sidebarType === SidebarType.home && <Home/>}
                    {sidebarType === SidebarType.settings && <SettingsPage/>}
                </main>
            </div>
            }
        </div>


    )
};
