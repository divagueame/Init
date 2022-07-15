import { Controller } from "@hotwired/stimulus"

// Draggable elements id
const dataResourceId = "data-resource-id"

// Outer parent id
const dataParent = "data-parent";

// Remote Url to submit draggable list order changes to
let url;

// Draggable Element's Id
let resourceId;

// New position
let newPosition; 

let isDragging = false;

function showDragActive(e) {
  isDragging = true;
  // console.log('show', e.target.dataset.resourceId)
  document.querySelector("#notes").classList.add('active')
}
function hideDragActive() {
  isDragging = false;
  // console.log('hide')
  document.querySelector("#notes").classList.remove('active')
  
}

// Connects to data-controller="drag"
export default class extends Controller {
  connect() { }
  
  dragStart(e) {
 
    showDragActive(e)
    console.log('e.currentTarget')
    console.log(e.currentTarget) 
    e.currentTarget.classList.add('dragging');
    resourceId = e.currentTarget.getAttribute(dataResourceId)
    url = e.currentTarget.getAttribute('data-url')
    e.dataTransfer.effectAllowed = 'move';
 
  }
  drop(e) {
    e.preventDefault()
    hideDragActive()
    let parentId = e.currentTarget.getAttribute(dataParent);
    const dropTarget = this.findDropTarget(e.target, parentId)
    const draggedItem = document.querySelector(`[data-resource-id="${resourceId}"]`)
    if (draggedItem === null || dropTarget === null) {
      console.log('Drop unsuccessfully', draggedItem)
      console.log('Drop unsuccessfully', dropTarget)
      return true
    }
    this.setNewPosition(dropTarget, draggedItem, e);
    newPosition = [...this.element.parentElement.children].indexOf(draggedItem)
  }
  dragEnd(e) {
    e.preventDefault()
    if (resourceId === null && newPosition === null) {

      console.log('Drop end', resourceId)
      console.log('Drop end', newPosition)
      return;
    }
    let data = JSON.stringify({
      resource: {
        id: resourceId,
        position: newPosition
      }
    })
    fetch(url, {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "X-CSRF-Token": this.getMetaValue("csrf-token"),
        "Content-Type": "application/json"
      },
      body: data 
    })
  }
  
  dragOver(e) {
    e.preventDefault()
    return true; 
  }
  dragEnter(e) {
    console.log('Drag enter')
    console.log(e.target)
    // console.log(this)
    e.preventDefault()
  }


  findDropTarget(target, parentId) {
    if (target === null) {
      return null
    }
    if (target.id === parentId){
      return null
    }
    if (target.classList.contains("draggable")) {
      return target
    }
    return this.findDropTarget(target.parentElement, parentId)
  }

  setNewPosition(dropTarget, draggedItem) {
    const positionComparison = dropTarget.compareDocumentPosition(draggedItem)
    if (positionComparison & Node.DOCUMENT_POSITION_FOLLOWING) {
      console.log('NEXT POSITION')
      dropTarget.insertAdjacentElement('beforebegin', draggedItem)
    } else if (positionComparison & Node.DOCUMENT_POSITION_PRECEDING){
      console.log('PREV POSITION')
      dropTarget.insertAdjacentElement('afterend', draggedItem)
    }
  }

  getMetaValue(name) {
    const el = document.head.querySelector(`meta[name="${name}"]`);
    return el.getAttribute("content")
  } 
}

document.querySelectorAll('.note').forEach(item => {
  item.addEventListener('mouseenter', e => {
    // if (!isDragging) { return false };
  // console.log(e.target)
  })
})

 
 
