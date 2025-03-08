import {Router} from "express"

const accessRouter =  Router();

import {getBanUnUser} from "../controllers/accessControl.js"

accessRouter.get('/banUnban/:userId',getBanUnUser);


export  {accessRouter}