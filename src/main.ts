import './style.css'
//import typescriptLogo from './typescript.svg'
//import viteLogo from '/vite.svg'
//import { setupCounter, setupChange } from './counter.ts'


const inputTitle = document.querySelector('#inputTitle') as HTMLInputElement;
const inputDescription = document.querySelector('#inputDescription') as HTMLTextAreaElement;
const app = document.querySelector('#app') as HTMLDivElement;
const cleanbtn = document.querySelector('#clean') as HTMLButtonElement;
const done = document.querySelector('#done') as HTMLDivElement;
const form = document.querySelector('form') as HTMLFormElement;

const modal = document.querySelector("#markDialog") as HTMLDialogElement;
const modalDelete = document.querySelector("#delDialog") as HTMLDialogElement;

const cancelButton = document.querySelector("#btncanceldone") as HTMLButtonElement;
const doneTodoButton = document.querySelector("#btnmarkdone") as HTMLButtonElement;
const btndeletetodo = document.querySelector("#btndeletetodo") as HTMLButtonElement;
const btncanceltodo = document.querySelector("#btncanceltodo") as HTMLButtonElement;  
const todocounter = document.querySelector("#todocounter") as HTMLSpanElement;
const donecounter = document.querySelector("#donecounter") as HTMLSpanElement;

const handleDelete = (e:Event) : void=> {
  modalDelete.showModal();

  btndeletetodo.addEventListener('click', function () {
    const btnel = e.target as HTMLButtonElement;
    const buttonClass = btnel.dataset.id;
    console.log(buttonClass)
    //const element = document.querySelector(`.${buttonClass}`) as HTMLDivElement;
    const el = btnel.parentNode?.parentNode?.parentNode;
    el?.remove();
    modalDelete.close();
    //count
    todocounter.textContent = `${app.children.length}`
    donecounter.textContent = `${done.children.length}`
  });

  btncanceltodo.addEventListener('click', function () {
    modalDelete.close();
  });
}

const handleSubmit = (e: Event) => {
  console.log(e)
  e.preventDefault();
  //form.classList.add('w-60', 'm-auto')
  const date = new Date()
  const fullDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2,"0")}/${date.getFullYear()}
    ${date.getHours().toString().padStart(2,"0")}:${date.getMinutes().toString().padStart(2,"0")}:${date.getSeconds().toString().padStart(2,"0")}`
  const id = Date.now();
  const cardItemContainer = document.createElement('div')
  const contentContainer = document.createElement('div');
  const button = document.createElement('button')
  const title = document.createElement('p');
  const description = document.createElement('p');
  const dateP = document.createElement('p');
  const buttonsContainer = document.createElement('div');
  const rowContainer = document.createElement('div')
  const rowCheck = document.createElement('div');
  const labelCheck = document.createElement('label')
  const check = document.createElement('input');
  //
  cardItemContainer.classList.add(`S${id}`, 'row', 'justify-between', 'container', 'container-item');
  contentContainer.classList.add('col','justify-between');
  title.classList.add('title');
  description.classList.add('description', 'secondary-text');
  buttonsContainer.classList.add('col','justify-between');
  rowContainer.classList.add('row', 'justify-between');
  rowCheck.classList.add('row', 'justify-end')
  button.classList.add('hover:primary','primary', 'text-black');
  rowContainer.classList.add('w-full');
  cardItemContainer.classList.add('p-4', 'elementFadeIn');
  dateP.classList.add('text-sm');
  
  dateP.textContent = `Created: ${fullDate}`;
  title.textContent= inputTitle.value;
  description.textContent = inputDescription.value;
  labelCheck.textContent = 'Mark as done';
  
  check.type="checkbox";
  check.dataset.id =  `S${id}`;
  button.dataset.id = `S${id}`;
  button.innerText = "Delete";
  button.onclick=handleDelete;
  check.onchange=handleMark;
  
  
  rowCheck.append(labelCheck, check);
  buttonsContainer.append(rowCheck, button);
  contentContainer.append(title, description, dateP);
  rowContainer.append(contentContainer, buttonsContainer);
  cardItemContainer.append(rowContainer);
  app.appendChild(cardItemContainer);
  todocounter.textContent = `${app.children.length}`
  // clean
  clean();
}

const clean = () :void => {
  inputTitle.value = "";
  inputDescription.value = "";
}


const handleMark = (e:Event) => {
  const elch = e.target as HTMLInputElement;
  modal.showModal();

  const date = new Date();
  doneTodoButton.addEventListener("click", function () {
    const id = `${elch.dataset.id}`
    const elemento = document.querySelector(`.${id}`) as HTMLDivElement;
    elemento.children[0].children[1].children[1].classList.add('hidden')
    elemento.children[0].children[1].children[0].children[0].innerHTML="✅"
    elemento.children[0].children[1].children[0].children[1].classList.add('hidden')
      const fullDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2,"0")}/${date.getFullYear()}
    ${date.getHours().toString().padStart(2,"0")}:${date.getMinutes().toString().padStart(2,"0")}:${date.getSeconds().toString().padStart(2,"0")}`
    
    const createdp = elemento.children[0].children[0].children[2]
    const prevText = createdp.textContent;
    createdp.textContent = prevText + " " + "Marked as done " + fullDate;
   
    elch.disabled = true;
    done.appendChild(elemento);
    todocounter.textContent = `${app.children.length}`
    donecounter.textContent = `${done.children.length}`
    modal.close();
  });

  cancelButton.addEventListener("click", function () {
    elch.checked = false;
    modal.close();
  });
}

document.addEventListener('submit', e => handleSubmit(e))
cleanbtn.addEventListener('click', clean);
//document.addEventListener('click', e => handleDelete(e))



//setupCounter(document.querySelector<HTMLButtonElement>('#add')!),
//setupChange(document.querySelector<HTMLInputElement>('#inputTitle')!);
