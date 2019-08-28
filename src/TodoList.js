import React,{Component} from 'react';
import {Input, Button, List, message, Icon, Row, Col, Checkbox} from 'antd';
import 'antd/dist/antd.css';
import store from './store';
import {CHANGE_INPUT, ADD_ITEM, DELETE_ITEM, CAHNGE_STATUS} from './store/type';
const error = () => {
  message.error('请填写需要增加的内容');
};
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.changeInputValue = this.changeInputValue.bind(this);// 改变this指向
    this.storeChange = this.storeChange.bind(this);// 改变this指向
    this.addList = this.addList.bind(this);// 改变this指向
    store.subscribe(this.storeChange);
  }
  render() { 
    return ( 
      <div style={{margin:'20px'}}>
        <div>
          <Input 
            placeholder="write..." 
            style={{width:'250px'}}
            onChange={this.changeInputValue}
            value={this.state.inputValue}
          />
          <Button type="primary" style={{marginLeft:'10px'}} onClick={() => {this.addList()}}>增加</Button>
        </div>
        <div style={{width: '300px',margin: '10px'}}>
        <List
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => (
            <List.Item >
              <Row style={{width: '100%'}}>
                <Col span={2} >
                  <Checkbox defaultChecked={false} onChange={() => {this.changeStatus(item,index)}}/>
                </Col>
                <Col span={18} style={{textDecoration:item.status ? 'line-through' : 'initial'}}>
                  {item.content}
                </Col>
                <Col span={4} style={{textAlign:'right',height: '100%'}}>
                  <Icon type="close-circle" onClick={() => {this.deleteItem(index)}} />
                </Col>
              </Row>
            </List.Item>
          )}
        />
        <Row style={{width: '100%',lineHeight: '30px'}}>
          <Col span={12}>
            总计： {this.state.list.length}
          </Col>
          <Col span={12}>
            完成个数：{this.state.taskCompleteNum}
          </Col>
        </Row>
        </div>
      </div>
     );
  }
  changeInputValue(e) {
    const action = {
      type: CHANGE_INPUT,
      value: e.target.value
    }
    store.dispatch(action);
  }
  storeChange() {
    this.setState(store.getState())
  }
  addList() {
    const action = {
      type: ADD_ITEM
    };
    if (!this.state.inputValue) {
      return error();
    }
    store.dispatch(action)
  }
  deleteItem(index) {
    const action = {
      type: DELETE_ITEM,
      index
    }
    store.dispatch(action)
  }
  changeStatus(ListItem,index) {
    ListItem.index = index;
    const action = {
      type: CAHNGE_STATUS,
      ListItem
    }
    store.dispatch(action)
  }
}
 
export default TodoList;