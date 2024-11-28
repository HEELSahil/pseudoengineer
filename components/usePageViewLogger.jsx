"use client";

import { useEffect, useRef } from 'react';
import axios from 'axios';

const logPageViews = async (pagePath) => {
    try {
        const response = await axios.post('/api/page-views', null, {
            params: { pagePath },
        });
        // console.log(`Page view logged for ${pagePath}. New view count:`, response.data.views);
    } catch (error) {
        console.error(`Error incrementing view count for ${pagePath}:`, error);
    }
};

const usePageViewLogger = (pagePath) => {
    const hasLogged = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined' || hasLogged.current) return;

        hasLogged.current = true;
        logPageViews(pagePath);
    }, [pagePath]);
};

export default usePageViewLogger;
