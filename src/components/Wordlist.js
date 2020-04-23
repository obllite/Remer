import React,{useState} from 'react';
import classnames from 'classnames';
import Worditem from './Worditem'
function Wordlist(props) {
    let {
        data,
        ...rest
    } = props
    const wordlist = classnames('wordlist');
    const worditem = classnames('worditem');
    const [dragitem, setdragitem] = useState(null);
    const [overitem, setoveritem] = useState(null);
    const [worddata, setworddata] = useState(data)
    const dragStart = (e) => {
        setdragitem(e.currentTarget)
        //console.log(dragitem)
    }
    const dragOver = (e) => {
        e.preventDefault();
        dragitem.style.display = 'none';
        if (e.target.className !== worditem) {
            return
        }
        const dragIndex = JSON.parse(dragitem.dataset.item).newIndex;
        const targetIndex = JSON.parse(e.target.dataset.item).newIndex;
        const animateName = dragIndex > targetIndex ? "drag-up" : "drag-down";
        if (overitem && e.target.dataset.item !== overitem.dataset.item) {
            overitem.classList.remove("drag-up","drag-down")
        }
        if (!e.target.classList.contains(animateName)) {
            e.target.classList.add(animateName)
            setoveritem(e.target)
        }
    }
    const dragEnd = (e) => {
        if (!dragitem) {
            return
        }
        dragitem.style.display = 'grid';
        e.target.classList.remove("drag-up");
        overitem.classList.remove("drag-up");
        e.target.classList.remove("drag-down");
        overitem.classList.remove("drag-down");
        let tempData = data;
        let originIndex = Number(dragitem.dataset.id);
        let desIndex = Number(overitem.dataset.id);
        tempData.splice(desIndex,0,tempData.splice(originIndex,1)[0]);
        tempData = tempData.map((item, index)=> {
            item.newIndex = index + 1;
            return item
        })
        setworddata(tempData)
    }
    let listItems = data.map((item, index) => {
        return (
            <Worditem 
                key={index}
                wordSet={item}
                index={index}
                itemDragStart={dragStart}
                itemDragEnd={dragEnd}
            >
            </Worditem>
        )
    });
    return (
        <div
            className={wordlist}
            onDragOver={(e)=>{dragOver(e)}}
        >
                {listItems}
        </div>
    )
}

export default Wordlist