import React, { useEffect } from 'react';
import './App.css';



const BookMarkItem = (
  {
    to,
    children,
  }) => {
  if (to !== undefined) {
    return (
      <li className="bookmark__listItem" draggable="true">
        <a draggable="false" href={to} tabIndex="0" className="bookmark__link" target="right_side">
          <i className="fas fa-globe-americas bookmark__listItem__icon" />
          <span className="bookmark__listItem__content noselect">
            {children}
          </span>
        </a>
      </li >
    )
  }
  return null
}

let draggedEl

const handleDrag = (event) => {
  event.preventDefault()
};
const handleDragStart = (event, el) => {
  if (el) {
    draggedEl = el
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', el.outerHTML);
  }
};
const handleDragOver = (event, el) => {
  event.preventDefault();
  if (el) {
    el.classList.add('bookmark__listItem-over');
    event.dataTransfer.dropEffect = 'move'
  }
};
const handleDragLeave = (event, el) => {
  if (el) {
    el.classList.remove('bookmark__listItem-over')
  }
};
const handleDragEnd = (event, el) => {
  if (el) {
    el.classList.remove('bookmark__listItem-over');
  }
};
const handleDrop = (event, overEle) => {
  event.preventDefault();
  overEle.classList.remove('bookmark__listItem-over');
  if (overEle !== draggedEl && overEle) {
    overEle.parentNode.removeChild(draggedEl);
    const dragEleHTML = event.dataTransfer.getData('text/html');
    overEle.insertAdjacentHTML('beforebegin', dragEleHTML);
    draggedEl = overEle.previousSibling;
    addEvent(draggedEl)
  }
};


const addEvent = (el) => {
  el.addEventListener("drag", handleDrag, false)
  el.addEventListener("dragstart", (event) => handleDragStart(event, el), false);
  el.addEventListener("dragover", (event) => handleDragOver(event, el), false);
  el.addEventListener("dragleave", (event) => handleDragLeave(event, el), false);
  el.addEventListener("dragleave", (event) => handleDragEnd(event, el), false);
  el.addEventListener("drop", (event) => handleDrop(event, el), false);
}


function App() {
  useEffect(() => {
    const bookmarkEls = document.querySelectorAll('.bookmark__listItem')
    if (bookmarkEls) {
      for (const el of bookmarkEls) {
        addEvent(el)
      }
    }
  })
  return (
    <div className="content">
      <div className="bookmark__main">
        <h4 className="bookmark__title">Favourite</h4>
        <ul className="bookmark__list">
          <BookMarkItem to="https://www.bbc.com">BBC News</BookMarkItem>
          <BookMarkItem to="https://www.hs.fi">Helsingin Sanomat</BookMarkItem>
          <BookMarkItem to="https://www.vasabladet.fi">Vasabladet</BookMarkItem>
          <BookMarkItem to="https://www.foxnews.com">FOX News</BookMarkItem>
          <BookMarkItem to="https://www.theguardian.com">Guardian </BookMarkItem>
        </ul>
      </div>
    </div>
  );
}

export default App;
