var form=document.getElementById('addForm');
var itemList=document.getElementById('items');
var filte=document.getElementById("filter");
form.addEventListener("submit",addItem);

//delete event
itemList.addEventListener('click',removeItem);
  
//filte
filte.addEventListener('keyup',filterItems);

function addItem(e){
  e.preventDefault();
  // get input valu
  var newItem=document.getElementById('item').value;
  var desc=document.getElementById('description').value;
  var userDetails = {
    item: newItem,
    description: desc
  };

  // Check if localStorage already has user details
  var storedItems = localStorage.getItem('userItems');
  var itemsArray = storedItems ? JSON.parse(storedItems) : [];

  // Push the new user details to the array
  itemsArray.push(userDetails);

  // Save the updated array to localStorage
  localStorage.setItem('userItems', JSON.stringify(itemsArray));
  var para=document.createElement('p');
  
  //create new li element
  var li=document.createElement('li');
  li.className="list-group-item";

  //add text node with input value
  li.appendChild(document.createTextNode(newItem));
  li.appendChild(document.createTextNode(desc));

  // add delete button
  var del=document.createElement("button");
  del.className="btn btn-danger btn-sm float-right delete";
  del.appendChild(document.createTextNode("X"));
  li.appendChild(del);
  itemList.appendChild(li);
  itemList.appendChild(para);
}


function removeItem(e){
  if(e.target.classList.contains('delete')){
    if(confirm("Are you sure?")){
      var li=e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}


function filterItems(e){
var text=e.target.value.toLowerCase();
var items=itemList.getElementsByTagName('li');
Array.from(items).forEach(function(item){
  var itemName=item.firstChild.textContent;
  if(itemName.toLocaleLowerCase().indexOf(text)!=-1){
    item.style.display="block";
  }
  else{
    item.style.display="none";
  }
})
}