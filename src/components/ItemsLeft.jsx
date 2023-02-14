import {useState, useEffect} from 'react';

export default function ItemsLeft() {
    const [state, setState] = useState(0);
    
    useEffect(()=>{
        const getTodo  = JSON.parse(localStorage.getItem("todoList"));
        let left;
    
        if(getTodo != null){
            left = getTodo.filter(left => left.completed == false);
            document.querySelector(".item-left").textContent = `${left.length} items left`;
            setState(left.length);
        } 
      }, [state]);

    return (
        <span className="item-left">6 items left</span>
    );
};
