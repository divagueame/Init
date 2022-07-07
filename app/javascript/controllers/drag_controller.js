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



// Connects to data-controller="drag"
export default class extends Controller {
  connect() { }
  
  dragStart(e) {
    resourceId = e.target.getAttribute(dataResourceId)
    url = e.target.getAttribute('data-url')
    e.dataTransfer.effectAllowed = 'move';
  }
  drop(e) {
    e.preventDefault()
    let parentId = e.target.getAttribute(dataParent);
    const dropTarget = this.findDropTarget(e.target, parentId)
    const draggedItem = document.querySelector(`[data-resource-id="${resourceId}"]`)
    if (draggedItem === null || dropTarget === null) {
      return true
    }
    this.setNewPosition(dropTarget, draggedItem, e);
    newPosition = [...this.element.parentElement.children].indexOf(draggedItem)
  }
  dragEnd(e) {
    e.preventDefault()
  }
  
  dragOver(e) {
    e.preventDefault()
    return true; 
  }
  dragEnter(e) {
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
    if (positionComparison && Node.DOCUMENT_POSITION_FOLLOWING) {
      dropTarget.insertAdjacentElement('beforebegin', draggedItem)
    } else if (positionComparison && Node.DOCUMENT_POSITION_PRECEDING){
      dropTarget.insertAdjacentElement('afterend', draggedItem)
    }
  }
}
