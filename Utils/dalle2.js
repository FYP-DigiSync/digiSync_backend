const got =require('got');

class DalleError extends Error {
    constructor(response) {
      super();
      this.response = response;
    }
  }


class Dalle {
  constructor(bearerToken) {
    this.bearerToken = bearerToken;
    this.url = "https://labs.openai.com/api/labs";
  }

  async generate(prompt) {
    // let task = await got.post(`${this.url}/tasks`, {
    //   json: {
    //     task_type: "text2im",
    //     prompt: {
    //       caption: prompt,
    //       batch_size: 1,
    //     },
    //   },
    //   headers: {
    //     Authorization: `Bearer ${ this.bearerToken }`
    //   }
    // }).json();
    let task= {
        id:"task-mWL5qorzdSNDtcO7RRulH6cp"
    }
    task = await this.getTask(task.id);
    return task;
  }

  async getTask(taskId) {
    return await got.get(`${this.url}/tasks/${taskId}`, {
      headers: {
        Authorization: "Bearer " + this.bearerToken,
      },
    }).json();
  }
  
  async list(options = { limit: 50, fromTs: 0 }) {
    return await got.get(`${this.url}/tasks?limit=${ options.limit }${ options.fromTs ? `&from_ts=${ options.fromTs }` : '' }`, {
        headers: {
          Authorization: "Bearer " + this.bearerToken,
        },
      }).json();
  }
  
  async getCredits() {
    return await got.get(`${ this.url }/billing/credit_summary`, {
        headers: {
          Authorization: "Bearer " + this.bearerToken,
        },
      }).json();
  }
}

module.exports= Dalle;