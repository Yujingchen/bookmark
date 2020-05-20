let draggedEl

const handleDrag = (event) => {
    event.preventDefault()
};
const handleDragStart = (event, el) => {
    console.log("start")
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

const bookmarkEls = document.getElementsByClassName("bookmark__listItem");


(() => {
    if (bookmarkEls) {
        for (const el of bookmarkEls) {
            addEvent(el)
        }
    }
})()

function myFunction() {
    console.log("hi")
}


