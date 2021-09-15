class ColorPicker {
  constructor(selector, color) {
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
        if (el.matches('output')) {
          el.value = Math.round(el.value / 255 * 100) + '%'
        }
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
  cancel() {}
  select() {}
}

addEventListener('load', () => {
  a1 = new ColorPicker('#view1')
  a2 = new ColorPicker(document.getElementById('view2'), '#FF00FF')
  a3 = new ColorPicker(view3, '#FF0000')
})
