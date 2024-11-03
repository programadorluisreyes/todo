import './style.css'
//import typescriptLogo from './typescript.svg'
//import viteLogo from '/vite.svg'
//import { setupCounter, setupChange } from './counter.ts'
import { Card } from './components/Card.ts'


const inputTitle = document.querySelector('#inputTitle') as HTMLInputElement;
const inputDescription = document.querySelector('#inputDescription') as HTMLTextAreaElement;
const app = document.querySelector('#app') as HTMLDivElement;
/*
const addButton     = document.querySelector('#add') as HTMLButtonElement;
const cancelButton = document.querySelector('#clean') as HTMLButtonElement;

const newTodo = {
  id:Date.now(),
  title:inputTitle.value,
  description:inputDescription.value,
  completed:false
}
  */
 /*
  <div class="row justify-between container container-item">
     <div class="col justify-between">
         <p class="title">Title</p>
         <p class="description">Content</p>
     </div>
     <div class="col justify-between">
         <div class="row">
             <label>done</label>
             <input type="checkbox"></input>
         </div>
         <button id="delete" type="button">delete</button>
     </div>
  </div>
 */
  type newTodo = {
    id:number,
    title:string,
    description: String,
  }

const button = (props: newTodo):string => {
  const handleClick = (id:number) => {
    console.log(id)
  }
  return `  <div class="row justify-between container container-item">
                <div class="col justify-between">
                    <p class="title">${props.title}</p>
                    <p class="description">${props.description}</p>
                </div>
                <div class="col justify-between">
                    <div class="row">
                        <label>done</label>
                        <input type="checkbox"></input>
                    </div>
                    <button id="${props.id}" type="button" onclick="${handleClick(props.id)}">delete</button>
                </div>
            </div>`
}

const handleDelete = (e:Event) : void=> {
  
  console.log(e);
  const buttonClass = e?.target.dataset.id;
  console.log(buttonClass)
  //const element = document.querySelector(`.${buttonClass}`) as HTMLDivElement;
  const el = e?.target.parentNode
  console.log(el)
  el.remove()
}

const handleSubmit = (e: Event) => {
  e.preventDefault();
  const id = Date.now();
  const cardItemContainer = document.createElement('div')
  const button = document.createElement('button')
  //cardItemContainer.id = id.toString();
  cardItemContainer.classList.add(id.toString());
  button.dataset.id = id.toString();
  button.innerText = "Delete" + id.toString();
  button.onclick=handleDelete;
  cardItemContainer.appendChild(button);
  app.appendChild(cardItemContainer);
  //cardItemContainer.innerHTML=button({id:id, title:inputTitle.value, description:inputDescription.value} as newTodo);
  /*
  console.log(inputTitle.value);
  cardItemContainer.classList.add('row', 'justify-between', 'container', 'container-item');
  const contentContainer = document.createElement('div')
  contentContainer.classList.add('col','justify-between');
  const title = document.createElement('p')
  title.classList.add('title');
  const description = document.createElement('p')
  description.classList.add('description');
  const buttonsContainer = document.createElement('div')
  buttonsContainer.classList.add('col','justify-between');
  const rowContainer = document.createElement('div').classList.add('row');
  const label = document.createElement('label')
  label.textContent = 'done';
  const check = document.createElement('input');
  check.type="checkbox";
  //  rowContainer.appendChild(label);
  */

}

document.addEventListener('submit', e => handleSubmit(e))
//document.addEventListener('click', e => handleDelete(e))

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>To do list</h1>
    
    <p class="read-the-docs">
      Todo list content will be shown here
    </p>
    <ul id="todos">

    </ul>
    
  </div>
`

//setupCounter(document.querySelector<HTMLButtonElement>('#add')!),
//setupChange(document.querySelector<HTMLInputElement>('#inputTitle')!);
