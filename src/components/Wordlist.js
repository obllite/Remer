import React from 'react';
import classnames from 'classnames';
import Worditem from './Worditem';
//COMPONENT 单词显示列表
//TODO 完成 wordlist 样式, 重写 scroll 样式
//TODO 基本样式完成后设置窗口的最小宽度和最小高度，比例遵循黄金比例
class Wordlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            worditem: classnames('worditem'),
            ...props 
        };
    }

    dragStart(e) {
        this.dragged = e.currentTarget;
    }
    dragEnd(e) {
        this.dragged.style.display = 'block';
        e.target.classList.remove("drag-up");
        this.over.classList.remove("drag-up");
        e.target.classList.remove("drag-down");
        this.over.classList.remove("drag-down");
        var data = this.state.data;
        var from = Number(this.dragged.dataset.id);
        var to = Number(this.over.dataset.id);
        data.splice(to, 0, data.splice(from, 1)[0]);
        //set newIndex to judge direction of drag and drop
        data = data.map((doc, index) => {
            doc.newIndex = index + 1;
            return doc;
        })
        this.setState({ data: data });
    }

    dragOver(e) {
        e.preventDefault();
        this.dragged.style.display = "none";
        if (e.target.tagName !== "LI") {
            return;
        }
        //判断当前拖拽target 和 经过的target 的 newIndex
        const dgIndex = JSON.parse(this.dragged.dataset.item).newIndex;
        const taIndex = JSON.parse(e.target.dataset.item).newIndex;
        const animateName = dgIndex > taIndex ? "drag-up" : "drag-down";
        if (this.over && e.target.dataset.item !== this.over.dataset.item) {
            this.over.classList.remove("drag-up", "drag-down");
        }
        if (!e.target.classList.contains(animateName)) {
            e.target.classList.add(animateName);
            this.over = e.target;
        }
    }
    render() {
        var listItems = this.state.data.map((item, i) => {
            return (
                <li
                    data-id={i}
                    key={i}
                    draggable='true'
                    onDragEnd={this.dragEnd.bind(this)}
                    onDragStart={this.dragStart.bind(this)}
                    data-item={JSON.stringify(item)}
                    className={this.state.worditem}
                >{item.english}</li>
            )
        });
        return (
            <ul onDragOver={this.dragOver.bind(this)} className="wordlist">
                {listItems}
            </ul>
        )
    }
}
export default Wordlist