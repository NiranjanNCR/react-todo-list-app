import React ,{useEffect, useState} from 'react'
import "./style.css";

//get the localStorage data back
const getLocalData = ()=>{
  const lists = localStorage.getItem("mytodolist");
  if(lists){
return JSON.parse(lists);
  }else{
    return [];
  }
}

const Todo = () => {
  const [inputdata ,setInputData] = useState("");
  const [items,setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
const [toggleButton ,setToggleButton] = useState(false);

  // add the item
  const addItem = () =>{
    if(!inputdata){
      alert("Plz enter the data");
    }else if(inputdata && toggleButton){
      setItems(
        items.map((curElem) =>{
          if(curElem.id ===isEditItem){
            return {...curElem, name : inputdata};
          }
          return curElem;
        })
      );

      setInputData([]);
    setIsEditItem(null);
    setToggleButton(false);

    }else{
        const myNewInputData = {
          id: new Date().getTime().toString(),
          name: inputdata,
        };
     setItems([...items, myNewInputData]);
     setInputData("");
    }
  };

  //Edit the Items in the list 
  const editItem =(index ) =>{
    const item_todo_edited = items.find((curElem)=>{
      return curElem.id ===index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  }

  // How we can delete the items in list
const deleteItem = (index) =>{
  const updatedItems = items.filter((curElem) =>{
  return curElem.id !== index;
  });
  setItems(updatedItems);
};


//Remove all Items
const removeAll = () =>{
  setItems([]);
}

//
useEffect(()=>{
  localStorage.setItem("mytodolist",JSON.stringify(items));
}, [items]);
  return (
    <>
    <div className='main-container'>
      <div className='child-container'>
        <figure>
          <img src="😂" alt="" />
          <figcaption>📝</figcaption>

        </figure>
        <div className='add-item'>
          <input type="text"
          placeholder='✍Add items'
          className='form-control' 
          value={inputdata}
          onChange={(event) => setInputData(event.target.value)}
          />
          {toggleButton ? (
            <i className="fa fa-edit add-btn"  onClick={addItem}></i>) :
            (<i className="fa fa-plus add-btn"  onClick={addItem}></i>
          )}
          {/* <i className="fa fa-plus add-btn" onClick={addItem}></i> */}
        </div>

{/* Show item here */}
<div className='showItems'>
{items.map((curElem) =>{
  return(
    <div className='eachItem' key={curElem.id}>
    <h3>{curElem.name}</h3>
    <i className="far fa-edit add-btn" 
    onClick={()=> editItem(curElem.id)}></i>
    <i className="far fa-trash-alt add-btn1"  
    onClick={()=> deleteItem(curElem.id)}></i>
  </div>
  )
})

}

  
</div>
        <div className='show-item'>
          <button 
          className='btn effect04' 
          data-sm-link-text="Remove All" 
          onClick={removeAll}>
            <span>Clear list</span>
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
export default Todo;