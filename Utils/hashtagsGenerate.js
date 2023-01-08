const fetch = require("node-fetch");
const getHashtags = async (keywords) => {
    return  await fetch("https://inflact.com/hg/hashtag/search/", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
          "cache-control": "no-cache",
          "content-type": "application/json",
          "pragma": "no-cache",
          "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Microsoft Edge\";v=\"108\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "cookie": "move_modal=8f1e82e7d677b8d6604bf6e20b84c4f2ddcd338da20784e2e64b35e6efb2059da%3A2%3A%7Bi%3A0%3Bs%3A10%3A%22move_modal%22%3Bi%3A1%3Bb%3A1%3B%7D; gtm_exp=e09631611dddf0041aafbc2dddceda73a27f07862428c09ecf813b0acd0c4857a%3A2%3A%7Bi%3A0%3Bs%3A7%3A%22gtm_exp%22%3Bi%3A1%3Bs%3A19%3A%22%7B%22AdsProviders3%22%3A1%7D%22%3B%7D; calc_plan=c1cef1f3106ff512070508bd023e1f0460b34819bfc7c0961f6fdf3e628dabeda%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22calc_plan%22%3Bi%3A1%3Bs%3A97%3A%22%7B%22currency_id%22%3A2%2C%22period%22%3A1%2C%22pack%22%3A%22customize%22%2C%22is_hg%22%3A1%2C%22price%22%3A19%2C%22is_user_trial_enabled%22%3Atrue%7D%22%3B%7D; wv_inf_test=72b52eb8217e6f76c76644a86699369f85c67d14b7d4b89642c39b4e5c193673a%3A2%3A%7Bi%3A0%3Bs%3A11%3A%22wv_inf_test%22%3Bi%3A1%3Bi%3A1%3B%7D; _ga=GA1.2.1544025518.1672828443; _gid=GA1.2.1313766077.1672828443; _ym_uid=16728284451003140612; _ym_d=1672828445; _ym_isad=1; hashtag_guest_search_counter=4b79bf494c9cf896ee1616d9ecacf4689fab1d7bba01910cad03b8efe6de6268a%3A2%3A%7Bi%3A0%3Bs%3A28%3A%22hashtag_guest_search_counter%22%3Bi%3A1%3Bi%3A1%3B%7D; _ym_visorc=w; DashboardPopup=89042e349afaf3e93d64d9769d3f9083adc658b3e236023ebaf6622dfe4d17e8a%3A2%3A%7Bi%3A0%3Bs%3A14%3A%22DashboardPopup%22%3Bi%3A1%3Bi%3A1%3B%7D; ingramer_sid=hp5cagmr72p9njj97ns41k6ems; _identity=88c4b311564c618d7269f633bcb2697950b33641a032f6db5b3a5b7e12e92bdda%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22_identity%22%3Bi%3A1%3Bs%3A52%3A%22%5B1959592%2C%2266xlmx-i0cuoQEK6GxZly1-aM7_jo6oa%22%2C1036800%5D%22%3B%7D; _csrf=89cecf54ac007a1e31c71cc4a3d11365b8e8256507e4f1ea88dc870524b94e96a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22srRbGGA3m63GlFf3YwkVd6CMtGMWEHod%22%3B%7D; cw_user_5auV8rkkVqu4oVS8Nv6ZQkm7=7c6080677fb7b306a1f39cd36e88c2d8; cw_conversation=eyJhbGciOiJIUzI1NiJ9.eyJzb3VyY2VfaWQiOiJkZDY2YjEwOS1jZDNkLTRiMzgtOTE2OS02MDkwYzBjOWNkNjciLCJpbmJveF9pZCI6MTR9.bci0J4w9-2udfs9_qS9suazlX-1Kc_jNjlMcK83aYSE; from_landing=ac1e403e001c94872b307b3f183ee317007ef9c7009b0261c1b32b379fc8a6c8a%3A2%3A%7Bi%3A0%3Bs%3A12%3A%22from_landing%22%3Bi%3A1%3Bs%3A7%3A%22hashtag%22%3B%7D; hashtag_search_counter=8851726fd599db1f044a063f87922c37c2df7a28a57458c79c6e0bf126c8d2f4a%3A2%3A%7Bi%3A0%3Bs%3A22%3A%22hashtag_search_counter%22%3Bi%3A1%3Bi%3A8%3B%7D; _gat_gtag_UA_123352983_1=1",
          "Referer": "https://inflact.com/tools/instagram-hashtag-generator/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body":`{\"type\":\"KEYWORD\",\"value\":\"${keywords}\"}`, 
        "method": "POST"
      });
}

// duplicate of the above function, with axios
// const getHashtags = async (keywords) => {
//     return  await fetch("https://inflact.com/hg/hashtag/search/", {
//         "headers": {
//             "accept": "*/*",
//             "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
//             "cache-control": "no-cache",
//             "content-type": "application/json",
//             "pragma": "no-cache",
//             "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Microsoft Edge\";v=\"108\"",
//             "sec-ch-ua-mobile": "?0",
//             "sec-ch-ua-platform": "\"Windows\"",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "same-origin",
//             "cookie": "move_modal=8f1e82e7d677b8d6604bf6e20b84c4f2ddcd338da20784e2e64b35e6efb2059da%3A2%3A%7Bi%3A0%3Bs%3A10%3A%22move_modal%22%3Bi%3A1%3Bb%3A1%3B%7D; gtm_exp=e09631611dddf0041aafbc2dddceda73a27f07862428c09ecf813b0acd0c4857a%3A2%3A%7Bi%3A0%3Bs%3A7%3A%22gtm_exp%22%3Bi%3A1%3Bs%3A19%3A%22%7B%22AdsProviders3%22%3A1%7D%22%3B%7D; from_landing=ac1e403e001c94872b307b3f183ee317007ef9c7009b0261c1b32b379fc8a6c8a%3A2%3A%7Bi%3A0%3Bs%3A12%3A%22from_landing%22%3Bi%3A1%3Bs%3A7%3A%22hashtag%22%3B%7D; calc_plan=c1cef1f3106ff512070508bd023e1f0460b34819bfc7c0961f6fdf3e628dabeda%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22calc_plan%22%3Bi%3A1%3Bs%3A97%3A%22%7B%22currency_id%22%3A2%2C%22period%22%3A1%2C%22pack%22%3A%22customize%22%2C%22is_hg%22%3A1%2C%22price%22%3A19%2C%22is_user_trial_enabled%22%3Atrue%7D%22%3B%7D; wv_inf_test=72b52eb8217e6f76c76644a86699369f85c67d14b7d4b89642c39b4e5c193673a%3A2%3A%7Bi%3A0%3Bs%3A11%3A%22wv_inf_test%22%3Bi%3A1%3Bi%3A1%3B%7D; _ga=GA1.2.1544025518.1672828443; _gid=GA1.2.1313766077.1672828443; _ym_uid=16728284451003140612; _ym_d=1672828445; _ym_isad=1; _ym_visorc=w; hashtag_guest_search_counter=4b79bf494c9cf896ee1616d9ecacf4689fab1d7bba01910cad03b8efe6de6268a%3A2%3A%7Bi%3A0%3Bs%3A28%3A%22hashtag_guest_search_counter%22%3Bi%3A1%3Bi%3A1%3B%7D; ingramer_sid=rpg6fa8qnkilatbmpln6qhn0rk; _identity=f5d142c897571b6ae2d2232f9716a49e32b4ae4e9357151cd4e65a7a2ded1b0ea%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22_identity%22%3Bi%3A1%3Bs%3A52%3A%22%5B1959358%2C%22GUlus1ReKP31tIT832EwBsUpEYAelIcL%22%2C1036800%5D%22%3B%7D; _csrf=1d492c8c06bae14cd35d4f7211b478718cee0b6117220e93926f47a3df086f97a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22hz9ukbwFV9t6eygF0hKTjpGpG3NJLOXa%22%3B%7D; hashtag_search_counter=42fb7c9a6ff970d380c2ba8a2750fefe6cbeac14b9c4d31b3d7ade265dd2bc0ca%3A2%3A%7Bi%3A0%3Bs%3A22%3A%22hashtag_search_counter%22%3Bi%3A1%3Bi%3A3%3B%7D; _gat_gtag_UA_123352983_1=1",
//             "Referer": "https://inflact.com/tools/instagram-hashtag-generator/",
//             "Referrer-Policy": "strict-origin-when-cross-origin"
//         },
//         "body":`{\"type\":\"KEYWORD\",\"value\":\"${keywords}\"}`, 
//         "method": "POST"
//     });
// }

// const getHashtags = async (keywords) => {
//     fetch("https://inflact.com/hg/hashtag/search/", {
//         "headers": {
//             "accept": "*/*",
//             "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
//             "cache-control": "no-cache",
//             "content-type": "application/json",
//             "pragma": "no-cache",
//             "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Microsoft Edge\";v=\"108\"",
//             "sec-ch-ua-mobile": "?0",
//             "sec-ch-ua-platform": "\"Windows\"",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "same-origin"
//         },
//         "referrer": "https://inflact.com/tools/instagram-hashtag-generator/",
//         "referrerPolicy": "strict-origin-when-cross-origin",
//         "body": `"{\"type\":\"KEYWORD\",\"value\":\"${keywords}\",\"reCaptchaToken\":\"03AD1IbLDqkRRAgzr5YwbQ2i3YI2Giq51RxHdELK-vB1AxYS7SBYLrVoK8Upk0jTanhHipWrJ-q4BLysf1eEDGwQG73OkpIayaaUi_SfQhtiutmceFySHnhjIPPo-Cm75O_B21uY9Rq92vL2vMhs4KKWa221aRHA4JQTQiH37LXNsKZh_Py-7JCeECPxiR_-oSTGvm1v0IHcm6BcyMCOrzoNi4TIzLkNCijYxTDKQ1t8b5-Dmja6pnMm9aHu4xt9yOEv2gZoE04Yv6wy8a_V7bpS-RofGk36SpzlqIAVWWlquz8xoJcU9YA9x-JjD91LyWfjft51n7ypFqFJg_d2x_b3zyngiHOE9SyeH6_Wu6TGNCE36OKlxLPCp0UxP2jl32bGwj5hnRi9PQkcuCpz_ixPdvu7yEEnYHZHM69s4YdHJUX5u_JmTe2gxPkGNgvSsTXNQ5DHFeFfi181y7xj49PfZ9WV2RegS7tPdGwyBLX_csQDLebX2KtproHyXYjmUTtqYVXF8qrwVl\"}"`,
//         "method": "POST",
//         "mode": "cors",
//         "credentials": "include"
//     });
// }






module.exports = getHashtags;