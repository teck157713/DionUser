import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export function InfiniteScroll({
    loadMore,
    hasMore,
    loader,
    children
}: {
    loadMore: () => Promise<void>,
    hasMore: boolean,
    loader?: any,
    children: any
}) {
    const [ error, setError ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        setError("");

        try {
            await loadMore();
            setError("");
        }
        catch (error: any) {
            setError(error?.message || "");
        }
        finally {
            setLoading(false);
        }
    }

    const onScroll = () => {
        console.log(window.innerHeight + document.documentElement.scrollTop, document.documentElement.offsetHeight)
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
            !loading && hasMore
        ) {
            fetchData();
        }
    }

    useEffect(() => {
        if (hasMore && !loading) {
            fetchData();
        }
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [loading])

    return (
        <Box>
            { children }
            { loading && loader }
            { error && <Typography>{ error }</Typography> }
        </Box>
    );
}