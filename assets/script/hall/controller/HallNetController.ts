/**
 * @description 登录场景逻辑流程控制器  
 */

import { injectService } from "../../framework/decorator/Decorators";
import { LobbyService } from "../../common/net/LobbyService";
import Controller from "../../framework/controller/Controller";
import { UpdateMoney } from "../protocol/HallMessage";
import { Manager } from "../../common/manager/Manager";
import { CommonEvent } from "../../common/event/CommonEvent";
import { MainCmd, SUB_CMD_LOBBY } from "../../common/protocol/CmdNetID";



const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class HallNetController extends Controller<LobbyService> {

    protected bindingEvents(){
        super.bindingEvents()
        this.registerEvent(MainCmd.CMD_LOBBY,SUB_CMD_LOBBY.UPDATE_MONEY,this.onMoneyUpdate,UpdateMoney);
    }

    private onMoneyUpdate( data : UpdateMoney ){
        //通知变更金钱
        dispatch(CommonEvent.UPDATE_MONEY,data.count);
    }

}

Manager.netManager.push(HallNetController);
