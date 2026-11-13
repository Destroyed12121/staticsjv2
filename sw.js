const ADBLOCK = {
    blocked: [
        "googlevideo.com/videoplayback",
        "youtube.com/get_video_info",
        "youtube.com/api/stats/ads",
        "youtube.com/pagead",
        "youtube.com/api/stats",
        "youtube.com/get_midroll",
        "youtube.com/ptracking",
        "youtube.com/youtubei/v1/player",
        "youtube.com/s/player",
        "youtube.com/api/timedtext",
        "facebook.com/ads",
        "facebook.com/tr",
        "fbcdn.net/ads",
        "graph.facebook.com/ads",
        "graph.facebook.com/pixel",
        "ads-api.twitter.com",
        "analytics.twitter.com",
        "twitter.com/i/ads",
        "ads.yahoo.com",
        "advertising.com",
        "adtechus.com",
        "amazon-adsystem.com",
        "adnxs.com",
        "doubleclick.net",
        "googlesyndication.com",
        "googleadservices.com",
        "rubiconproject.com",
        "pubmatic.com",
        "criteo.com",
        "openx.net",
        "taboola.com",
        "outbrain.com",
        "moatads.com",
        "casalemedia.com",
        "unityads.unity3d.com",
        "/ads/",
        "/adserver/",
        "/banner/",
        "/promo/",
        "/tracking/",
        "/beacon/",
        "/metrics/",
        "adsafeprotected.com",
        "chartbeat.com",
        "scorecardresearch.com",
        "quantserve.com",
        "krxd.net",
        "demdex.net"
    ]
};

function isAdBlocked(url) {
    const urlStr = url.toString().toLowerCase();
    return ADBLOCK.blocked.some((pattern) => {
        const value = pattern.toLowerCase();
        if (!value.includes('*')) {
            return urlStr.includes(value);
        }
        const regex = new RegExp(value.split('*').map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*'), 'i');
        return regex.test(urlStr);
    });
}

importScripts("https://cdn.jsdelivr.net/gh/Qwerty9957/Staticsj@main/JS/controller.sw.js");

self.addEventListener("fetch", (event) => {
    if (isAdBlocked(event.request.url)) {
        event.respondWith(new Response(null, { status: 204 }));
        return;
    }

    if ($scramjetController.shouldRoute(event)) {
        event.respondWith($scramjetController.route(event));
    }
});
