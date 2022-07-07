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
  
}
