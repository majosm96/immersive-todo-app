//TODO APP

var yo = require('yo-yo')
const uuidv1 = require('uuid/v1');

var state = [];

var el = list(state, newTask)
 
function list (items, onclick) {
  return yo`<div>
  <h1>To Do</h1>
  <input type="text" id="todoVal">
  <button onclick=${onclick}>Add Task</button>
  <ul>
     ${items.map(function (item, i) {
      if (item.status !== 'done'){
          return yo`<li id="${item.id}">${item.value}
          <input type="checkbox" onclick=${done} classs="btn"></li>`
      }
     })}
  </ul>
  <h1>Done</h1>
  <ul>
     ${items.map(function (item) {
       if (item.status === 'done'){
         return yo`<li id="${item.id}">${item.value}
         <button type="checkbox" onclick=${remove} class="btn">Pending</button>></li>`
       }
     })}
  </ul>
  
  </div>`
}

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

function remove(ev) {
  var id = ev.target.parentNode.getAttribute('id')
    state = state.filter(function(el, i) {
      return id !== el.id;
    });

 var newList = list(state, newTask)
  yo.update(el, newList)
}

 
document.body.appendChild(el)