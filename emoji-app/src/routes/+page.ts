import type { PageLoad } from "./$types";

export const load = (async () => {
    const fetchedEmoji = await fetch('https://emojihub.yurace.pro/api/all');

    console.log("fetchedEmoji" + fetchedEmoji);
    const data = fetchedEmoji.json();

    return {data};
}) satisfies PageLoad;
