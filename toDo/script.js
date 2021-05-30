//UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName')
const btnDeleteAll = document.querySelector('#btnDeleteAll')
const taskList = document.querySelector('#task-list')
let items; 
//call event listeers
eventListeners();

//load items

loadItems();


function eventListeners(){

    //submit event
    form.addEventListener('submit',addNewItem);

     // delete an item

     taskList.addEventListener('click',deleteItem)
    //delete all
    btnDeleteAll.addEventListener('click',deleteAll);


}


function loadItems(){
    items = getItemsFromLS();

    items.forEach(function(item){
        createItem(item);
    })

}

//get Items from Local Storage

function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items=[];
    }
    else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

//set Items to Local Storage
function setItemtoLS(text){
    items  = getItemsFromLS();

    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
   
}
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.pop(text);
    localStorage.setItem('items',JSON.stringify(items));

}
function deleteAllItemsFromLS(){
    items = getItemsFromLS();
    items = [];
    localStorage.setItem('items',JSON.stringify(items));
}


function createItem(text){
      //create li
      const li = document.createElement('li');
      li.className='list-group-item list-group-item-secondary';
      li.appendChild(document.createTextNode(text));
      //create a
      const a = document.createElement('a');
      a.classList = 'delete-item float-right';
      a.setAttribute('href','#');
      a.innerHTML ='<i class="fas fa-times"></i>';
      //add a to li
      li.appendChild(a);
      //add li to a
      taskList.appendChild(li);

}

//add new item
function addNewItem(e){
    

    if(input.value == ''){
        alert('Add a new Task');
    }
    else{

        //create item

        createItem(input.value);

        //save yo LS

        setItemtoLS(input.value);

        //clear input
        input.value='';

    }
   

        e.preventDefault();
  

 

}

//delete an item

function deleteItem(e){

    if(e.target.className === 'fas fa-times' && confirm('Are you sure about delete this task ?')){
       e.target.parentElement.parentElement.remove();
       deleteItemFromLS(e.target.parentElement.parentElement.textContext);


    }
    e.preventDefault();
}
//delete all
function deleteAll(e){

    items = getItemsFromLS();

    if(items.length>0){

        if(confirm('Are you sure about deleting all tasks ?')){
            taskList.innerHTML='';
            deleteAllItemsFromLS();
    
        }
    }
    else{
        alert('There is no task that you can delete..');
    }



   e.preventDefault();

}


