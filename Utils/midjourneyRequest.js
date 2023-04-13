const fetch = require("node-fetch");

const getMidJourneyImage = async (prompt) => {
    const re1=`${Math.floor(Math.random()*6779)}*${Math.floor(Math.random()*5569)}*${Math.floor(Math.random()*6619)}`;
    console.log(re1);

    const request = await fetch("https://discord.com/api/v9/interactions", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": "MTA1Njk4OTA3MTg4NjUyMDM2MQ.Gk8tMh.sk37FEmBzBYwSjNo0pfMSeTMvc5CpCde-C7onM",
          "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryNnVVlgurJFkBajJc",
          "sec-ch-ua": "\"Chromium\";v=\"112\", \"Microsoft Edge\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-debug-options": "bugReporterEnabled",
          "x-discord-locale": "en-GB",
          "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzExMi4wLjAuMCBTYWZhcmkvNTM3LjM2IEVkZy8xMTIuMC4xNzIyLjM0IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTEyLjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiJodHRwczovL3d3dy5taWRqb3VybmV5LmNvbS8iLCJyZWZlcnJpbmdfZG9tYWluIjoid3d3Lm1pZGpvdXJuZXkuY29tIiwicmVmZXJyZXJfY3VycmVudCI6Imh0dHBzOi8vd3d3Lm1pZGpvdXJuZXkuY29tLyIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6Ind3dy5taWRqb3VybmV5LmNvbSIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjE4ODU4NiwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbCwiZGVzaWduX2lkIjowfQ=="
        },
        "referrer": "https://discord.com/channels/662267976984297473/933565701162168371",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "------WebKitFormBoundaryNnVVlgurJFkBajJc\r\nContent-Disposition: form-data; name=\"payload_json\"\r\n\r\n{\"type\":2,\"application_id\":\"936929561302675456\",\"guild_id\":\"662267976984297473\",\"channel_id\":\"933565701162168371\",\"session_id\":\"5c5f957118231cbbd68c702203481586\",\"data\":{\"version\":\"1077969938624553050\",\"id\":\"938956540159881230\",\"name\":\"imagine\",\"type\":1,\"options\":[{\"type\":3,\"name\":\"prompt\",\"value\":\""+prompt+"\"}],\"application_command\":{\"id\":\"938956540159881230\",\"application_id\":\"936929561302675456\",\"version\":\"1077969938624553050\",\"default_member_permissions\":null,\"type\":1,\"nsfw\":false,\"name\":\"imagine\",\"description\":\"Create images with Midjourney\",\"dm_permission\":true,\"options\":[{\"type\":3,\"name\":\"prompt\",\"description\":\"The prompt to imagine\",\"required\":true}]},\"attachments\":[]},\"nonce\":\""+re1+"\"}\r\n------WebKitFormBoundaryNnVVlgurJFkBajJc--\r\n",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      });

    // console.log(request);

}



module.exports = getMidJourneyImage;