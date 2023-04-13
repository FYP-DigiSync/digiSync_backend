const axios = require('axios');

// duplicate of the above function, with axios
const fetchRecentPosts = async () => {
  return await axios.get("https://www.midjourney.com/api/app/recent-jobs/?amount=1&dedupe=true&jobStatus=completed&jobType=null&orderBy=new&prompt=undefined&refreshApi=1&userId=192c847b-cd9f-43e7-816f-87d59c94a580&user_id_ranked_score=null&_ql=todo&_qurl=https%3A%2F%2Fwww.midjourney.com%2Fapp%2F", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "sec-ch-ua": "\"Chromium\";v=\"112\", \"Microsoft Edge\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_ga=GA1.1.1026004242.1680806474; __stripe_mid=3367a8c9-bccc-4a40-aa6f-a04aff254134dfa339; imageSize=medium; imageLayout_2=hover; getImageAspect=2; fullWidth=false; showHoverIcons=true; __Host-next-auth.csrf-token=12c38855173c4e1cd7b8aaadf7daee0306b42c26b3b964ddb5f959da8d123e5e%7C7aa2363b69b803e4f84740c8471a1b2cabe0ab1222faa6fdb18c1b5889b8d5b6; __stripe_sid=a04ae333-9f84-45a2-9f5f-f5f1bf19ae7c7dd1c2; __Secure-next-auth.callback-url=https%3A%2F%2Fwww.midjourney.com%2Fapp%2F; _dd_s=rum=0&expire=1681322311919; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Un108blJsp1JN03T.SEfipoDOZeKZbZ1-_hZW6FxeTyByq_SxsRUd0AqUY9QeKkiy0flvVhXJ0pjle7FMZNrDMslAwsJz1x67UsE-k7kF9y3Cc0x08Md-o9Q0owWP-DfMqU6Pkvd4mI4CC4OuiszWMHUPMmtYuXTd5Hl-UB1-6gFCUx9lfdAN3USxI5rkI3sFppH429WOmRV5Dy_P5iNUYBMARpNP3fQ56OWKyuDckzJOtA3IrC0ZK2eObsj6HRXQTgM8Vr91D-Miw5t4zcYlTwnE5C7MvguyPKh3lYH1poCErJWsqS05FDkgWIZuTOmd-RNTVz1_N8VGJEEK1y-BCnWXW6e76EV3wHycqYYF1pLVE7U6yyY2M3ErmYCeFnDVIjSK8RpMxWpIGBnFxEQYK9Oj7H81N4g7tv11SlWe3Qcm00FLIyg_6GIXo-CL13500QdDEOSNXg9-dn87Wk4CrjAIVzmy5lfLU-O9cYHu9XMgk9GObqBAseo6F53X6xHKOq1Pc4YSIy6nQUBgZ8JLsyTAAzxWwYl3-QNq_RzkF1aU1x-r-fprpI2AkqqOjBoGA2yrkdC7spzAGJ--dCdj_rpPvRPnHCPgtgGKiINRLx4UgGTQ-AM7In9AtWWb1_DtbA57_yuSfl7hJ6psYapEWYWQH1FRmTNxqRpvU8LKeHx3su2say2R7oF9kHyXOoyv0VIwGccZj0SdK8LqHpPtuHOnKatiBOH7Ba6CAuLdLifuE4e7fNWjJeRQ6Lf5mRhZeOlLNdkUdQa1kytFxcNH8GMST5McbYYgAZJveRrPcfNqyrYSdROvw0YoNTxxKeRInb8jdOiDj7KyIthl09HH4c1h4NqWMhILOqsdLIWTGMqVnLd7CXZQD7fSc90xfg2Gja2QOCLj8Fg-SLDG958KTN3yoNPEc6QNP4sc-n9SDBn5PhN76RSXr7YoXsKrSIIhMO2NLd-iM8mpZETOS5dCCCf2jWYFIOGA94O6r50p3BMKqbHecdr5mz2fdaxqKOq2rLo8q6JweRfi-yKSQZJMknL6ph2FrEOnk2ZR7HoZqfBLF04uv98v5Y-H5YdvcOin2W1gW3Hxp9jTde-U8HkSslplD-1xS3jl3zGCbIRbNGr7tQ2PmMIAX4UZFiBBEjOe9r1cNBci3wnWdbrbjW-VNKfw0KLbPlLnfSq8RW-I0wijyrE5DJREgTd-bPh2nBWUpqXNF127J1AzA1rfTVnyQ_noROvikdcG_MJpO9IQLUqRFghgWvWNxnPHxf6BykI1lJoBxwN4sOUWkoIIqt6CE5l5b8sPqpog3HVjg2Glba8Qin4DTUl75sNld7PGduvo-fFIvTznuYV3031Z_EmcuDhE14zWFtWf7SchnEiDHH14DztfF2CIQ8pCHq7SdzEoFXLHjmNG6EteCEjIrwEfNybvAeuzeNSqJ5UUCyKHwHILRWCr7MRaQHJ8mhOoFNs4XAoV6hXmd1LLnZF_5cUHHApD7R8xUljlT-fLn97KZXG3YNd7rEzWh05Urj4naOelrC03HKZdEr7WevuSxPSqJI-Q1ye4rHiWRwxYFciFpGQp1hV7SUDA0dlYnRV5kSGmCTrLwAiH-2e-wWe7gqctjO_A2ud6dsJh5V3g9TGZriYmK7Ve-dErqpI-AOQCjmd0OZxkiQeEbkfsX5Szi0aVAvEShCZ8uS5nrJV8wqe3vpw0V5NCc_Yy6UkRUKP1_1U9p44psLCff7wumtdeAm5Awu83aDwozmoe_3OpABLJv1-VLV1VQN3o5izKxbqRcIVQE5bBp_2tHW70Yh0MNv-PQH1ZAqaYdl3b6stKZFc_Y8GV1K4lW-i9HDyU6Q6nyBxAoOUh6qKz727PPg4ETg7yVq10uI2aAKOn6ae2sJKTUNWDDXEvQxH7fSE1gFHiyqTpedBzX0Buf6AdbiEIQ0r6wz8uCpQTD5s_LG26PCbw5jgYuTPk4qgf8-tXxwUE7nHqwQrSX4tN_RcSYah-rrBT8KEBPLTvDGPtBnmHlZQjJqT_lcLwTjP7_B9f_clB-Ysaq8hUMw16A2w5sJJf0_pdbBosx8QiCYkscJBCbIiqiMh5l3S3Y_zlfNqgGpyLr6pHAP_jikUd0UASkL2wbbHY8UYr-wj14vAmC5IpHZMSls4Ui2tigBcLDFP_tBBdINxlTD2zIaXyep4BAv8owT3wd9DI5lGaSgIsatMVLWE.Gepm8E1t0EngfYTrImUs3Q; _ga_Q0DQ5L7K0D=GS1.1.1681317796.3.1.1681321412.0.0.0",
    "Referer": "https://www.midjourney.com/app/",
    "Referrer-Policy": "origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
});


  // return await axios.get('https://www.midjourney.com/api/app/recent-jobs/?amount=1&jobType=null&orderBy=new&user_id_ranked_score=null&jobStatus=completed&userId=1056989071886520361&dedupe=true&refreshApi=1', {
  //   "headers": {
  //     "accept": "*/*",
  //     "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
  //     "cache-control": "no-cache",
  //     "pragma": "no-cache",
  //     "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Microsoft Edge\";v=\"108\"",
  //     "sec-ch-ua-mobile": "?0",
  //     "sec-ch-ua-platform": "\"Windows\"",
  //     "sec-fetch-dest": "empty",
  //     "sec-fetch-mode": "cors",
  //     "sec-fetch-site": "same-origin",
  //     "cookie": "_ga=GA1.1.984526959.1672076123; __Host-next-auth.csrf-token=835310b5ad214fd54073c0bc7e3fcd736723237435c9b999f3fe78f28a13d195%7Cc28281857d58b95b19b7e76c6bc0c7b1434f8b196d0baea8baf6d6e97b4927f1; imageSize=medium; imageLayout_2=hover; getImageAspect=3; fullWidth=false; showHoverIcons=true; __Secure-next-auth.callback-url=https%3A%2F%2Fwww.midjourney.com; __stripe_mid=c9457b33-85d5-4ebf-b5d1-f6a686062fc0e62ef6; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..7LExYCZ9XecSGGap.29rUoWq9Ed55dAP5rAyysjN5UGTc0hX7TPT4p3qEaEyn4DR6r3cBs1-vePfoTHoUeLx6a6Nlkh-UvGQYYhwNvOw5ovrp2WC1sYg85wi3v5sN0_TTQB1e5-xLGYjP2S0_zKbTzXYDHrFfx_AoNg-0uJ2y_FRm_4MUPsiLyrf_BDwJAi634F0RM_Bmzu0SuNI8CTmGe8jvVRDkfScSaHu3KLfOE2TOCL8geuqbWuUmI6EIHO0mYAIzxfVjjoeRGdhk8wRqCGmt5e6gTOw4Uw9BCBEtQIM5JHhPvk1U7HL0pyOSQ9MulwslLY7Thzt8fdNZGWyO0KWFTJfUTQexKpxjHoJt5iBWbWwDB_T-9n-tbMzLS32uv97GATjDtaXEc4x1csYfgLmW3T_F5c3e1ivLftSH6m4hxFRAeiswER2TgnO0I8LbSr07DUq8X3FKDae6rdUcv7V3yhQH_h2V0Y7mBMfVtys_KcQ_X6CJ_sbOPS-4-b_cxc0ojGCj16fcs4tW5Ba17gX1xy5LwQ1uc8xHLewoQc4cceOLKC0JiVS_ByrgMpxYQffT7P3QpFGzYzjqbLZiXEr4QNcS8SunrGx56FSLn55m6Zucf6xmNaai8NSb6rjthPsV-f8njgQWorNve3YBl-lmcUeWFjpk8GfF-2T76lx84s0qFBK_KAjSWnVEvdENSNZ5LOY4PNaNHzAu4Pk9yCi5VxTv9nteGsdgRY9zSlSNQEvpQQkFWzLkFdKcm_r7KhN1T_YIKdkrthFnvkAUzd4fdRwkrdEow1nzV-an78XC-B5lDZc3bLGLZPx-8biDRf6HA7Q6XylhbrQYIjxnCLXbvff2w9hQFXC6Pdn5ziRwAZ3k9PHWvMWEWWgfeFci4JSMiRvQUy00Am45JZnoDdpbxpalMaK6ietNvrWK4TYwcrNnjjHKUqLXA-K_Y1FbhjSp6tXPYJiOa5rFtaZ0Wol5-Trm-JlQBzmVFPlbDX5K31WApgfN8D3mJgHNH0E3JbqPXsT6jzAZxjc1ROqATSXWV14xCei82jHFKbJrbNhhFzVUTlUir8gBsHEP-Jnktt01m6sLEH7GaotY3SGNIwrg2B5ogIP9kVMRRSys3UmNetWr-_Q-x2zJou_rizFThQblhu3seVbulLwWgFcZiBeh1EhfE-5dpHYYzmy_tZ9PjpZMGXsZRCo8yMuXbzNy6uh1NFb4BwQt1WNQzvO6-GGzojZ_GS804gxpsyov8UiDJd6Ib9togjhVy_pw8DsCR4f3.FmfmGNRLpoqUJSnHjrWe_w; __stripe_sid=3b0a7cf1-fdc6-4f09-bdcb-74182ceaeca0e92af0; _ga_Q0DQ5L7K0D=GS1.1.1672083823.2.1.1672084114.0.0.0; _dd_s=rum=2&id=64d7ac0c-79e2-4a47-a990-893260eda066&created=1672083768932&expire=1672085023746",
  //     "Referer": "https://www.midjourney.com/app/",
  //     "Referrer-Policy": "strict-origin-when-cross-origin"
  //   },
  //   "data": null,
  // });
}


module.exports = fetchRecentPosts;