const item = document.querySelector('.item')
const placeholders = document.querySelectorAll('.placeholder')

item.addEventListener('dragstart', dragstart)
item.addEventListener('dragend', dragend)

for (const placeholder of placeholders) {
    placeholder.addEventListener('dragover', dragover) //находимся над территорией
    placeholder.addEventListener('dragenter', dragenter) //внутри терр
    placeholder.addEventListener('dragleave', dragleave) //защли и вышли с территории
    placeholder.addEventListener('drop', dragdrop) //отпустили
}

function dragstart(event) { //как только эл сдвинули
    event.target.classList.add('hold') //добавляем бордер
    setTimeout(() => {
        event.target.classList.add('hide')
    }, 0)


}
function dragend(event) {
    event.target.className = "item";
}

function dragover(event) { // по умолчанию не дает перетачикивать элементы
    event.preventDefault() //отключаем стандартное поведение
}
function dragenter(event) {
    event.target.classList.add('hovered')
}
function dragleave(event) {
    event.target.classList.remove('hovered')
}
function dragdrop(event) {
    event.target.classList.remove('hovered')
    event.target.append(item) // помещаем в блок элемент
}