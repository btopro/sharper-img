export class SharperImg extends HTMLElement {
  static get tag() {
    return 'sharper-img';
  }

  constructor() {
    super();
    this.rendering = false;
    // progressive enhancement, tho less performant
    var img = this.querySelector("img");
    if (!img) {
      // performance minded prog enhancement
      if (this.querySelector("template") && this.querySelector("template").content.children[0] && this.querySelector("template").content.children[0].tagName === 'IMG') {
        img = this.querySelector("template").content.children[0];
      }
      else {
        img = {};
      }
    }
    this.baseurl = this.baseurl || window.location.origin;
    // defaults, using img pulled in or default
    this.alt = img.alt || this.alt || '';
    this.src = img.src || this.src || '';
    this.loading = img.loading || this.loading || 'lazy';
    this.decoding = img.decoding || this.decoding || 'async';
    this.fetchpriority = img.fetchpriority || this.fetchpriority || 'high';
    this.width = parseInt(img.width || this.width || 300);
    this.height = parseInt(img.height || this.height || 200);
    // defaults on the wrapper element
    this.style.display = 'inline-block';
    this.style.width = this.width + 'px';
    this.style.height = this.height + 'px';
    // wipe anything that may be here from before as we'll replace with our own
    this.innerHTML = null;
    this.quality = this.quality || 80;
    this.endpoint = 'api/generateImage';
  }

  // notice these changing
  static get observedAttributes() {
    return ['endpoint', 'srcconverted', 'src', 'loading', 'fetchpriority', 'decoding', 'alt', 'quality', 'height', 'width', 'baseurl']
  }

  // rerender when we get hits on these important aspects
  attributeChangedCallback(attr, oldValue, newValue) {
    if (['endpoint', 'width', 'height', 'quality', 'baseurl', 'src'].includes(attr) && this.width && this.height && this.quality && this.baseurl && this.src) {
      this.srcconverted = new URL(this.endpoint, this.baseurl).toString() + `?${new URLSearchParams({
        height: this.height,
        width: this.width,
        quality: this.quality,
        src: this.src,
      }).toString()}`;
    }
    // render when srcconverted is set
    if (attr === 'srcconverted' && this.src != '' && !this.rendering) {
      this.rendering = true;
      // loads the image in the background in-case of quality change
      let i = new Image();
      i.onload = () => {
        this.render();
      };
      i.onerror = () => {
        this.rendering = false;
      };
      i.src = this.srcconverted;
    }
  }

  render() {
    this.innerHTML = null;
    this.innerHTML = `
    <img 
      src="${this.srcconverted}" 
      height="${this.height}" 
      width="${this.width}" 
      alt="${this.alt}" 
      fetchpriority="${this.fetchpriority}"
      decoding="${this.decoding}"
      loading="${this.loading}"
    />`;
    this.rendering = false;
  }

  // getter and setter palooza

  get endpoint() {
    return this.getAttribute('endpoint');
  }

  set endpoint(val) {
    this.setAttribute('endpoint', val);
  }

  get height() {
    return this.getAttribute('height');
  }

  set height(val) {
    this.setAttribute('height', val);
  }

  get width() {
    return this.getAttribute('width');
  }

  set width(val) {
    this.setAttribute('width', val);
  }

  get src() {
    return this.getAttribute('src');
  }

  set src(val) {
    this.setAttribute('src', val);
  }

  set srcconverted(val) {
    this.setAttribute('srcconverted', val);
  }

  get srcconverted() {
    return this.getAttribute('srcconverted');
  }

  set loading(val) {
    this.setAttribute('loading', val);
  }

  get loading() {
    return this.getAttribute('loading');
  }

  set fetchpriority(val) {
    this.setAttribute('fetchpriority', val);
  }

  get fetchpriority() {
    return this.getAttribute('fetchpriority');
  }

  get quality() {
    return this.getAttribute('quality');
  }

  set quality(val) {
    this.setAttribute('quality', val);
  }

  get alt() {
    return this.getAttribute('alt');
  }

  set alt(val) {
    this.setAttribute('alt', val);
  }

  get baseurl() {
    return this.getAttribute('baseurl');
  }

  set baseurl(val) {
    this.setAttribute('baseurl', val);
  }

  get decoding() {
    return this.getAttribute('decoding');
  }

  set decoding(val) {
    this.setAttribute('decoding', val);
  }
}

customElements.define(SharperImg.tag, SharperImg);