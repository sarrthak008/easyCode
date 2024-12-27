
const responder = (res,success=true,message="these is default message",data=null,statusCode=200) =>{
  res.json({
    success,
    message,
    data,
  }).status(statusCode)
}

export {responder}