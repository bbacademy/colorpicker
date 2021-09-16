class RGB {
  constructor(value = '#000000') {
    this.value = value
  }

  data = new Uint8ClampedArray(3)

  set r(n) { this.data[0] = n }
  set g(n) { this.data[1] = n }
  set b(n) { this.data[2] = n }

  get r() { return this.data[0] }
  get g() { return this.data[1] }
  get b() { return this.data[2] }

  get value() {
    return [...this.data].map(RGB.encodeHex).join('').toUpperCase().padStart(7, '#')
  }
  set value(str) {
    Object.assign(this, RGB.parseHex(str))
  }
  toString() {
    return this.value
  }
  toJSON() {
    return { r: this.r, g: this.g, b: this.b }
  }

  static encodeHex = num => num.toString(16).padStart(2, '0')
  static parseHex = str => ({
    r: parseInt(str.slice(1, 3), 16),
    g: parseInt(str.slice(3, 5), 16),
    b: parseInt(str.slice(5, 7), 16)
  })
}
