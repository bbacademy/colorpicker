class ColorPicker {
  constructor(selector, color = '#000000') {
    this.element = selector instanceof HTMLElement ? selector : document.querySelector(selector)
    this.element.innerHTML = template.innerHTML
    this.element.addEventListener('input', this.update)
    this.element.addEventListener('click', this.action)
    this.color = new RGB(color)
    this.render()
    console.log(JSON.stringify(this.color), this.color)
  }
  render = () => {
    this.element.querySelectorAll('[data-bind]').forEach(el => {
      if (!el.matches(':focus,:active')) {
        el.value = this.color[el.dataset.bind]
      }
    })
  }
  update = ({ target: el }) => {
    if (el.matches('[data-bind]')) {
      this.color[el.dataset.bind] = el.value
      this.render()
    }
  }
  action = ({ target:el }) => {
    if (el.matches('[data-action]')) {
      const fn = this[el.dataset.action]
      if (fn instanceof Function) fn.call(this)
    }
  }
  cancel() {
    console.log('action cancel', this.color.value, this.color.toJSON())
  }
  select() {
    console.log('action select', this.color.toData())
  }
}

addEventListener('load', () => {
  new ColorPicker('#view1')
  new ColorPicker(document.getElementById('view2'), '#FF00FF')
  new ColorPicker(view3, '#FF0000')
})
