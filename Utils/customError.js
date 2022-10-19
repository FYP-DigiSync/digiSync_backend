class CustomError extends Error{
    constructor(status, message,data){
        super(message);
        this.message = message;
        this.status= status;
        this.data= data;
    }
}
module.exports= CustomError;