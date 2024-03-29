import React from "react";
import store from "../../../store";
import {changeKeywordInput, changePickTime, closeOpenArea, getPoolProfitInfo} from "../../common/model/PoolModel";
import {DatePicker, Icon, Input} from "antd";
import moment from "moment";
import {getTimePeriod, isEmpty, todayFormat} from "../../common/Common";
import {ACTION, OPERATION} from "../../common/Config";

export default class AdvanceSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.on = 0;
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
    searchProfit(){
        getPoolProfitInfo()
    }
    changeInput(e){
        changeKeywordInput(e.target.value);
    }
    changeTimePeriod(value){
        this.on = value;
        this.setState(this.state)
        changePickTime('from',false,getTimePeriod(this.on)[0])
        changePickTime('to',false,getTimePeriod(this.on)[1])
    }
    render() {
        const pid = this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]
        const coin = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CURRENT_COIN][pid]
        const profit = this.state[OPERATION.PROFIT_INFO][ACTION.PROFIT_DATA][pid]
        const dateFormat = 'YYYY-MM-DD';
        return(
            <React.Fragment>
                <div onClick={this.closeCreateArea.bind(this)} className={"add-delete-background"}></div>
                <div className={"advance-search"}>
                    <h5>高级搜索</h5>
                    <Icon onClick={this.closeCreateArea.bind(this)} type="close" style={{position:"absolute",top:"18px",left:"386px",fontSize:"12px"}} />
                    <Input value={this.state[OPERATION.PROFIT_INFO][ACTION.PROFIT_CONDITION][ACTION.PROFIT_KEYWORD][pid]} onChange={this.changeInput.bind(this)} className={"search"} placeholder="请输入名称/地址等关键字" />
                    {this.on === 1?
                        <button onClick={this.changeTimePeriod.bind(this,1)} className={"but1 on"}>本月</button>:
                        <button onClick={this.changeTimePeriod.bind(this,1)}  className={"but1"}>本月</button>
                    }
                    {this.on === 2?
                        <button onClick={this.changeTimePeriod.bind(this,2)}  className={"but2 on"}>上月</button>:
                        <button onClick={this.changeTimePeriod.bind(this,2)}  className={"but2"}>上月</button>
                    }
                    {this.on === 3?
                        <button onClick={this.changeTimePeriod.bind(this,3)}  className={"but3 on"}>今年</button>:
                        <button onClick={this.changeTimePeriod.bind(this,3)}  className={"but3"}>今年</button>
                    }
                    {this.on === 4?
                        <button onClick={this.changeTimePeriod.bind(this,4)} className={"but4 on"}>去年</button>:
                        <button onClick={this.changeTimePeriod.bind(this,4)} className={"but4"}>去年</button>
                    }

                    <button style={{display:"none"}} className={"but5 on"}>委托</button>
                    <button style={{display:"none"}} className={"but6"}>未委托</button>
                    {isEmpty(this.state[OPERATION.PROFIT_INFO][ACTION.PROFIT_CONDITION][ACTION.PROFIT_FROM_DATA][pid])?
                        <DatePicker className={"date date1"} defaultValue={moment(todayFormat(),dateFormat)} placeholder="开始日期"  />:
                        <DatePicker className={"date date1"} defaultValue={moment(this.state[OPERATION.PROFIT_INFO][ACTION.PROFIT_CONDITION][ACTION.PROFIT_FROM_DATA][pid],dateFormat)} placeholder="开始日期"  />
                    }
                    {isEmpty(this.state[OPERATION.PROFIT_INFO][ACTION.PROFIT_CONDITION][ACTION.PROFIT_TO_DATA][pid])?
                        <DatePicker className={"date date2"} defaultValue={moment(todayFormat(),dateFormat)} placeholder="结束日期"  />:
                        <DatePicker className={"date date2"} defaultValue={moment(this.state[OPERATION.PROFIT_INFO][ACTION.PROFIT_CONDITION][ACTION.PROFIT_TO_DATA][pid],dateFormat)} placeholder="开始日期"  />
                    }
                    <div className={"hr"}></div>
                    <input onClick={this.searchProfit.bind(this)}  className={"submit"} type={"button"} value={"确定并开始搜索"} />
                </div>
            </React.Fragment>
        )
    }
}