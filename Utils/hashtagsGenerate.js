const axios = require("axios");
const getHashtags = async (keywords) => {
  const request = await axios.get(`https://brain.predis.ai/tools/get_kw_hashtags/?keywords=${keywords}&timezone=Asia%2FKarachi&page_address=https%3A%2F%2Fpredis.ai%2Ffree-hashtag-generator%2F`);
  return request.data;
}




module.exports = getHashtags;