import './style.css'
//import typescriptLogo from './typescript.svg'
//import viteLogo from '/vite.svg'
//import { setupCounter, setupChange } from './counter.ts'


const inputTitle = document.querySelector('#inputTitle') as HTMLInputElement;
const inputDescription = document.querySelector('#inputDescription') as HTMLTextAreaElement;
const app = document.querySelector('#todoList') as HTMLDivElement;
const cleanbtn = document.querySelector('#clean') as HTMLButtonElement;
const done = document.querySelector('#doneList') as HTMLDivElement;
const form = document.querySelector('form') as HTMLFormElement;
const tab1 = document.querySelector('#tab1') as HTMLButtonElement;
const tab2 = document.querySelector('#tab2') as HTMLButtonElement;
const tab3 = document.querySelector('#tab3') as HTMLButtonElement;

const modal = document.querySelector("#markDialog") as HTMLDialogElement;
const modalDelete = document.querySelector("#delDialog") as HTMLDialogElement;

const cancelButton = document.querySelector("#btncanceldone") as HTMLButtonElement;
const doneTodoButton = document.querySelector("#btnmarkdone") as HTMLButtonElement;
const btndeletetodo = document.querySelector("#btndeletetodo") as HTMLButtonElement;
const btncanceltodo = document.querySelector("#btncanceltodo") as HTMLButtonElement;  
const todocounter = document.querySelector("#todocounter") as HTMLSpanElement;
const donecounter = document.querySelector("#donecounter") as HTMLSpanElement;
const toast = document.querySelector("#toast") as HTMLDivElement;
// btngotit

const handleDelete = (e:Event) : void=> {
  modalDelete.showModal();
  btndeletetodo.addEventListener('click', function () {
    const btnel = e.target as HTMLButtonElement;
    const buttonClass = btnel.dataset.id;
    console.log(buttonClass)
    const el = btnel.parentNode?.parentNode?.parentNode;
    el?.remove();
    modalDelete.close();
    //count
    todocounter.textContent = `${app.children.length}`
    donecounter.textContent = `${done.children.length}`
    message('"To do" item succesfully deleted ✅');
  });

  btncanceltodo.addEventListener('click', function () {
    modalDelete.close();
  });
}

const buildDateTime = () :string => {
  const date = new Date()
  const fullDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2,"0")}/${date.getFullYear()}
    ${date.getHours().toString().padStart(2,"0")}:${date.getMinutes().toString().padStart(2,"0")}:${date.getSeconds().toString().padStart(2,"0")}`
  return fullDate;
}

const handleSubmit = (e: Event) => {
  e.preventDefault();

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
  dateP.classList.add('text-sm', 'mt-10');
  
  dateP.textContent = `Created: ${buildDateTime()}`;
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
  message('"To do" item succesfully added ✅');
}

const message = (message:string) => {
  toast.children[0].children[0].textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('elementFadeIn');
  setTimeout(() => toast.classList.add('hidden'), 1500);
}

const clean = () :void => {
  inputTitle.value = "";
  inputDescription.value = "";
}


const handleMark = (e:Event) => {
  const elch = e.target as HTMLInputElement;
  modal.showModal();
  doneTodoButton.addEventListener("click", function () {
    const id = `${elch.dataset.id}`
    const elemento = document.querySelector(`.${id}`) as HTMLDivElement;
    elemento.children[0].children[1].children[1].classList.add('hidden')
    elemento.children[0].children[1].children[0].children[0].innerHTML="✅"
    elemento.children[0].children[1].children[0].children[1].classList.add('deleted')
    
    const createdp = elemento.children[0].children[0].children[2]
    
    const markeddone = document.createElement('p')
    markeddone.textContent ="Marked as done " + buildDateTime();
    markeddone.classList.add('text-sm')
    createdp.append(markeddone);
   
    elch.disabled = true;
    done.appendChild(elemento);
    console.log(app)
    console.log(done)
    todocounter.textContent = `${app.children.length}`
    donecounter.textContent = `${done.children.length}`
    modal.close();
  });

  cancelButton.addEventListener("click", function () {
    elch.checked = false;
    modal.close();
  });
}

function openTab(evt: Event, option: string) {
  const currElement = evt as Event;
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLDivElement>;
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  const element = document.getElementById(option) as HTMLDivElement;
  element.style.display = "block";
  currElement.currentTarget.className += " active";
}

document.addEventListener('submit', e => handleSubmit(e))
cleanbtn.addEventListener('click', clean);
tab1.addEventListener('click', (e) => openTab(e,'new'));
tab2.addEventListener('click', (e) => openTab(e,'todo'));
tab3.addEventListener('click', (e) => openTab(e,'done'));
//document.addEventListener('click', e => handleDelete(e))



//setupCounter(document.querySelector<HTMLButtonElement>('#add')!),
//setupChange(document.querySelector<HTMLInputElement>('#inputTitle')!);
