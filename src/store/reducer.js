import {CHANGE_INPUT, ADD_ITEM, DELETE_ITEM, CAHNGE_STATUS} from './type';
const defaultState = {
  taskCompleteNum: 0,
  inputValue: '',
  list: [
    {
      content: '早8点开会，分配今天点代码任务',
      status: 0
    },
    {
      content: '早8点开会，分配今天点代码任务',
      status: 0
    },
    {
      content: '早8点开会，分配今天点代码任务',
      status: 0
    },
    {
      content: '早8点开会，分配今天点代码任务',
      status: 0
    }
  ]
};

export default (state = defaultState, action) => {
  // state 原来定义点值
  // action 新增数据
  // Reducer 里只能接受state,不能改变state;
  let newState = JSON.parse(JSON.stringify(state));
  let taskCompleteNum;
  switch (action.type) {
    case CHANGE_INPUT:
      newState.inputValue = action.value;
      return newState;
    case ADD_ITEM:
      newState.list.push({
        content: newState.inputValue,
        status: 0
      });
      newState.inputValue = '';
      return newState;
    case DELETE_ITEM:
      newState.list.splice(action.index, 1); // 删除
      taskCompleteNum = newState.list.filter(function (item) {
        return item.status === 1;
      });      
      newState.taskCompleteNum = taskCompleteNum.length;
      return newState;
    case CAHNGE_STATUS: // 完成
      newState.list[action.ListItem.index].status= Number(!action.ListItem.status);
      taskCompleteNum = newState.list.filter(function (item) {
        return item.status === 1;
      });      
      newState.taskCompleteNum = taskCompleteNum.length;
      return newState;
    default:
      return state;
  }
};