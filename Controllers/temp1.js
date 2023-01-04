const useFetch = async () => {
    const request = await fetch("https://discord.com/api/v9/interactions", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
            "authorization": "MTA1Njk4OTA3MTg4NjUyMDM2MQ.GCBlUK.PHQyc0p7aT_CxuHgk5_KlMuG9jAtRzTHCDxbLc",
            "cache-control": "no-cache",
            "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryHzDLGhlryAjGBUT1",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Microsoft Edge\";v=\"108\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-debug-options": "bugReporterEnabled",
            "x-discord-locale": "en-GB",
            "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLUdCIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwOC4wLjAuMCBTYWZhcmkvNTM3LjM2IEVkZy8xMDguMC4xNDYyLjU0IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTA4LjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiJodHRwczovL21pZGpvdXJuZXkuY29tLyIsInJlZmVycmluZ19kb21haW4iOiJtaWRqb3VybmV5LmNvbSIsInJlZmVycmVyX2N1cnJlbnQiOiIiLCJyZWZlcnJpbmdfZG9tYWluX2N1cnJlbnQiOiIiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjoxNjU0ODUsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9",
            "cookie": "__dcfduid=bd4952da854311ed84c3d2b021342784; __sdcfduid=bd4952da854311ed84c3d2b021342784da6fde66fc4973fff5924765a745fb366af87b50683075f2c9c61e1f28d63a8d; _gcl_au=1.1.179244136.1672076252; _ga=GA1.2.361174841.1672076253; _gid=GA1.2.1509612705.1672076253; OptanonConsent=isIABGlobal=false&datestamp=Mon+Dec+26+2022+22%3A50%3A15+GMT%2B0500+(Pakistan+Standard+Time)&version=6.33.0&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1&AwaitingReconsent=false; locale=en-GB; __cfruid=3bfb80ac3b9c52270bdf5952ce6eae3bd10e159f-1672116983; __cf_bm=cMGe2uQitkdb_U4gACZzBqm6D7UgXb3Sjg9OS2E4swc-1672119923-0-AckfIpWr4m2N+PNiyiqb9eK7cKw3svKob6mzzwPvn6NS7V1QqJ1mYdH8UzmTjpjlkMUdVaI1hg1v4nR5obJc5VMGgbM2oUgaWX7cQKgCL3nM+R3yGhiJEbmKh1C+mYYt42eqmf2k/kVpyTifVmqe8QE=",
            "Referer": "https://discord.com/channels/662267976984297473/1008571063732539392",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "------WebKitFormBoundaryHzDLGhlryAjGBUT1\r\nContent-Disposition: form-data; name=\"payload_json\"\r\n\r\n{\"type\":2,\"application_id\":\"936929561302675456\",\"guild_id\":\"662267976984297473\",\"channel_id\":\"1008571063732539392\",\"session_id\":\"49dfe3c23a84328d01c8e08bede27952\",\"data\":{\"version\":\"994261739745050686\",\"id\":\"938956540159881230\",\"name\":\"imagine\",\"type\":1,\"options\":[{\"type\":3,\"name\":\"prompt\",\"value\":\"A rebot learning to program itself in purple background\"}],\"application_command\":{\"id\":\"938956540159881230\",\"application_id\":\"936929561302675456\",\"version\":\"994261739745050686\",\"default_permission\":true,\"default_member_permissions\":null,\"type\":1,\"nsfw\":false,\"name\":\"imagine\",\"description\":\"There are endless possibilities...\",\"dm_permission\":true,\"options\":[{\"type\":3,\"name\":\"prompt\",\"description\":\"The prompt to imagine\",\"required\":true}]},\"attachments\":[]},\"nonce\":\"1057173446309445632\"}\r\n------WebKitFormBoundaryHzDLGhlryAjGBUT1--\r\n",
        "method": "POST"
    });

    // const data = await request.json();
    console.log(request);
}
useFetch();