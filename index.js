//TODO APP

var ToDoApp = (function () {
  // import external modules
  var yo = require('yo-yo')
  const uuidv1 = require('uuid/v1');
  //state
  var state = [];
  //list
  var el = list(state, newTask)

  //--Medthods
  //List
  function list (items, onclick) {
    return yo`<div>
    <h1>To Do</h1>
    <input type="text" id="todoVal">
    <button onclick=${onclick}>Add Task</button>
    <ul>
       ${items.map(function (item, i) {
        if (item.status !== 'done'){
            return newLi(item)
        }
       })}
    </ul>
    <h1>Done</h1>
    <ul>
       ${items.map(function (item) {
         if (item.status === 'done'){
          return newLi(item)
         }
       })}
    </ul>
    
    </div>`
  }
  //Add li Item 
  function newLi (item) {
    if(item.status === 'pending') {
      return yo`<li id="${item.id}">${item.value}
      <input type="checkbox" onclick=${done} classs="btn"></li>`
    } else {
      return yo`<li id="${item.id}">${item.value}
      <button type="checkbox" onclick=${remove} class="btn">Pending</button>></li>`
    }
  }

  //Add new task 
  function newTask () {
    var todo = {};
      todo.id = uuidv1();
      todo.value = document.getElementById('todoVal').value;
      todo.status = 'pending';
      state = [
        ...state,
        todo
      ];
    
    // construct a new list and efficiently diff+morph it into the one in the DOM 
    var newList = list(state, newTask)
    yo.update(el, newList)
  }
  //Done task 
  function done(ev) {
    // add a new random number to our list 
    var id = ev.target.parentNode.getAttribute('id')
      state.map(function(item) {
        console.table(state)
        if (item.id == id){
          item.status = 'done';
        }
      });
  
   var newList = list(state, newTask)
    yo.update(el, newList)
  }  
  //Remove
  function remove(ev) {
    var id = ev.target.parentNode.getAttribute('id')
      state = state.filter(function(el, i) {
        return id !== el.id;
      });
  
   var newList = list(state, newTask)
    yo.update(el, newList)
  }

  //Create elemnet 
  var createElement = function createElement(){
    document.body.appendChild(el)
  }
  

  return {
    createElement: createElement
  }

})();


ToDoApp.createElement();