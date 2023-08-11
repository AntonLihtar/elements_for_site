const cols = document.querySelectorAll('.col')


document.addEventListener('keydown', event => {
  event.preventDefault()
  if (event.code.toLowerCase() === 'space') {
    setRandomColors()
  }
})

document.addEventListener('click', event => {
  let type = event.target.dataset.type
  if (type === 'lock') {
    const node =
      event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0]

    ruleLock(node)
  } else if (type === 'copy') {
    copyToClickboard(event.target.textContent)
  }
})

function ruleLock(node) {
  node.classList.toggle('fa-lock-open')
  node.classList.toggle('fa-lock')
}

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : []

  if (colors.length > 1) { //если цвета определены в хеше то ставим замки
    cols.forEach(el => {
      ruleLock(el.querySelector('i'))
    })
  }

  cols.forEach((col, index) => {

    const i = col.querySelector('i')
    const isLocked = i.classList.contains('fa-lock')

    const text = col.querySelector('h2')
    const button = col.querySelector('button')


    if (isLocked && !isInitial) { //если замок то добавится цвет
      colors.push(text.textContent)
      return
    }


    const colorsValue = colors[index]

    let color = (isInitial && colorsValue)
      ? colors[index]
      : chroma.random()

    if (colors.length < 5) {
      colors.push(color)
    }

    text.textContent = color
    col.style.background = color

    setTextColor(text, color)
    setTextColor(button, color)
  })

  updateColorsHash(colors)
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
  document.location.hash = ''
  document.location.hash = colors
    .map(col => {
      return col.toString().substring(1)
    }).join('-')
}

function getColorsFromHash() {
  //если длина хеша больше 1 то возвразаем массив цветов
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map(color => '#' + color)
  }

  return []
}

setRandomColors(true)
