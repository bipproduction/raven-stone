import { apiUserLogpost } from './api/api_post';
import { funGetAll } from './fun/fun_get_all';
import { funUserLogWrite } from './fun/fun_write';
import { valListUserLog } from './val/val_list_user_log';



const userLogFun = {
    funUserLogWrite,
    funGetAll
}

const userLogVal = {
    valListUserLog
}

const userLogApi = {

}

export {
    userLogFun,
    userLogVal,
    userLogApi
};



