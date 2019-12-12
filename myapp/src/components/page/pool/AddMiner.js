import React from "react";
import store from "../../../store";
import {addChooseMiner, addPoolMiner, closeOpenArea, getCanAddMiner} from "../../common/model/PoolModel";
import {ACTION, OPERATION} from "../../common/Config";
import {Checkbox, Icon} from "antd";

export default class AddMiner extends React.Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        getCanAddMiner();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    closeCreateArea(){
        closeOpenArea()
    }
    selectMiner(hid,e){
        addChooseMiner(e.target.checked,hid,OPERATION.ADD_MINER)
    }
    addPoolMiner(){
        addPoolMiner()
    }
    render() {
        const listItems =(
            Object.keys(this.state[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.CAN_ADD_MINER]).map((key)=> {
                return(
                    <div key={key}  className={"miner-list"}>
                        <p className={"text1"}>{this.state[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.CAN_ADD_MINER][key]['name']}</p>
                        <p className={"text2"}>{this.state[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.CAN_ADD_MINER][key]['bind_time']}</p>
                        <p className={"text3"}>{this.state[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.CAN_ADD_MINER][key]['address']}</p>
                        <Checkbox onChange={this.selectMiner.bind(this,this.state[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.CAN_ADD_MINER][key]['hardware_id'])} style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                    </div>
                )
            })
        )
        return(
            <div>
                <div onClick={this.closeCreateArea.bind(this)} className={"add-delete-background"}></div>
                <div className={"add-delete-miner"}>
                    <h5>添加矿工</h5>
                    <Icon onClick={this.closeCreateArea.bind(this)} type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />
                    <div className={"add-miner-top"}>
                        <p className={"tip1"}>矿机名</p>
                        <p className={"tip2"}>日期</p>
                        <p className={"tip3"}>所在地</p>
                    </div>
                    <div className={"list-area"}>
                        {listItems}
                    </div>
                    <input onClick={this.addPoolMiner.bind(this)} className={"confirm"} type={"button"} value={"确定"} />
                    <h6>已选择{this.state[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.CHOOSE_CAN_ADD].length}台</h6>
                </div>
            </div>
        )
    }

}