const { Configuration, OpenAIApi } = require("openai");

const emailHandler= async(body)=>{
    const {subject,length, temperature}= body;
        let generationContext= 'Behave like a buggy trained model giving off subject result';
        if(temperature>.8){
            generationContext= 'keep your accuracy to 50% in writing the marketing email';
        }
        const prompt= `${generationContext} \n\n Completion_length:${length}\n\ncontext: Writing an Email\n\nsubject:${subject}\n\n`;
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 1024
        });
        return completion.data;
}

module.exports = emailHandler;
