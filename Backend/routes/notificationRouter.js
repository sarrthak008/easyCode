import { Router } from "express";
const notificationRouter = Router();


// Import Controllers
import {addNotification,getNotification,deleteNotification } from "./../controllers/notificationControl.js";

notificationRouter.get('/getnotificatons', getNotification);
notificationRouter.post('/createnotification', addNotification);
notificationRouter.delete('/deletenotification', deleteNotification);




export {notificationRouter}