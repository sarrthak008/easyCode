
const responder = (res,success=true,meesage="these is default message",data=null,statusCode=200) =>{
  res.json({
    success,
    meesage,
    data,
  }).status(statusCode)
}

export {responder}