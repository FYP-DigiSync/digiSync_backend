const axios= require('axios');

// duplicate of the above function, with axios
const fetchRecentPosts= async()=> {
    return await axios.get('https://www.midjourney.com/api/app/recent-jobs/?amount=1&jobType=null&orderBy=new&user_id_ranked_score=null&jobStatus=completed&userId=1056989071886520361&dedupe=true&refreshApi=1', {
        "headers":  {
            "accept": "*/*",
            "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Microsoft Edge\";v=\"108\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": "_ga=GA1.1.984526959.1672076123; __Host-next-auth.csrf-token=835310b5ad214fd54073c0bc7e3fcd736723237435c9b999f3fe78f28a13d195%7Cc28281857d58b95b19b7e76c6bc0c7b1434f8b196d0baea8baf6d6e97b4927f1; imageSize=medium; imageLayout_2=hover; getImageAspect=3; fullWidth=false; showHoverIcons=true; __Secure-next-auth.callback-url=https%3A%2F%2Fwww.midjourney.com; __stripe_mid=c9457b33-85d5-4ebf-b5d1-f6a686062fc0e62ef6; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..7LExYCZ9XecSGGap.29rUoWq9Ed55dAP5rAyysjN5UGTc0hX7TPT4p3qEaEyn4DR6r3cBs1-vePfoTHoUeLx6a6Nlkh-UvGQYYhwNvOw5ovrp2WC1sYg85wi3v5sN0_TTQB1e5-xLGYjP2S0_zKbTzXYDHrFfx_AoNg-0uJ2y_FRm_4MUPsiLyrf_BDwJAi634F0RM_Bmzu0SuNI8CTmGe8jvVRDkfScSaHu3KLfOE2TOCL8geuqbWuUmI6EIHO0mYAIzxfVjjoeRGdhk8wRqCGmt5e6gTOw4Uw9BCBEtQIM5JHhPvk1U7HL0pyOSQ9MulwslLY7Thzt8fdNZGWyO0KWFTJfUTQexKpxjHoJt5iBWbWwDB_T-9n-tbMzLS32uv97GATjDtaXEc4x1csYfgLmW3T_F5c3e1ivLftSH6m4hxFRAeiswER2TgnO0I8LbSr07DUq8X3FKDae6rdUcv7V3yhQH_h2V0Y7mBMfVtys_KcQ_X6CJ_sbOPS-4-b_cxc0ojGCj16fcs4tW5Ba17gX1xy5LwQ1uc8xHLewoQc4cceOLKC0JiVS_ByrgMpxYQffT7P3QpFGzYzjqbLZiXEr4QNcS8SunrGx56FSLn55m6Zucf6xmNaai8NSb6rjthPsV-f8njgQWorNve3YBl-lmcUeWFjpk8GfF-2T76lx84s0qFBK_KAjSWnVEvdENSNZ5LOY4PNaNHzAu4Pk9yCi5VxTv9nteGsdgRY9zSlSNQEvpQQkFWzLkFdKcm_r7KhN1T_YIKdkrthFnvkAUzd4fdRwkrdEow1nzV-an78XC-B5lDZc3bLGLZPx-8biDRf6HA7Q6XylhbrQYIjxnCLXbvff2w9hQFXC6Pdn5ziRwAZ3k9PHWvMWEWWgfeFci4JSMiRvQUy00Am45JZnoDdpbxpalMaK6ietNvrWK4TYwcrNnjjHKUqLXA-K_Y1FbhjSp6tXPYJiOa5rFtaZ0Wol5-Trm-JlQBzmVFPlbDX5K31WApgfN8D3mJgHNH0E3JbqPXsT6jzAZxjc1ROqATSXWV14xCei82jHFKbJrbNhhFzVUTlUir8gBsHEP-Jnktt01m6sLEH7GaotY3SGNIwrg2B5ogIP9kVMRRSys3UmNetWr-_Q-x2zJou_rizFThQblhu3seVbulLwWgFcZiBeh1EhfE-5dpHYYzmy_tZ9PjpZMGXsZRCo8yMuXbzNy6uh1NFb4BwQt1WNQzvO6-GGzojZ_GS804gxpsyov8UiDJd6Ib9togjhVy_pw8DsCR4f3.FmfmGNRLpoqUJSnHjrWe_w; __stripe_sid=3b0a7cf1-fdc6-4f09-bdcb-74182ceaeca0e92af0; _ga_Q0DQ5L7K0D=GS1.1.1672083823.2.1.1672084114.0.0.0; _dd_s=rum=2&id=64d7ac0c-79e2-4a47-a990-893260eda066&created=1672083768932&expire=1672085023746",
            "Referer": "https://www.midjourney.com/app/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
          },
          "data": null,
        });
}
module.exports = fetchRecentPosts;