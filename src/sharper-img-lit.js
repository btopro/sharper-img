import { LitElement, html } from 'lit';

export class SharperImgLit extends LitElement {
  static get tag() {
    return 'sharper-img-lit';
  }

  constructor() {
    super();
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
    this.baseurl = window.location.origin;
    // defaults, using img pulled in or default
    this.alt = img.alt || '';
    this.src = img.src || '';
    this.loading = img.loading || 'lazy';
    this.decoding = img.decoding || 'async';
    this.fetchpriority = img.fetchpriority || 'high';
    this.width = parseInt(img.width || 300);
    this.height = parseInt(img.height || 200);
    this.quality = 80;
    this.srcconverted = "";
    // wipe anything that may be here from before as we'll replace with our own
    this.innerHTML = null;
  }

  // properties
  static get properties() {
    return {
      src: { type: String },
      srcconverted: { type: String },
      loading: { type: String },
      fetchpriority: { type: String },
      decoding: { type: String },
      alt: { type: String },
      quality: { type: Number },
      height: { type: Number },
      width: { type: Number },
      baseurl: { type: String},
    };
  }

  // any of our values change associated w/ the image generation rebuild
  updated(changedProperties) {
    if (
      changedProperties.has('width') ||
      changedProperties.has('height') ||
      changedProperties.has('quality') ||
      changedProperties.has('baseurl') ||
      changedProperties.has('src')
    ) {
      this.srcconverted = new URL('api/generateImage', this.baseurl).toString() + `?${new URLSearchParams({
        height: this.height,
        width: this.width,
        quality: this.quality,
        src: this.src,
      }).toString()}`;
    }
  }

  // no shadow on this
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <img 
      src="${this.srcconverted}" 
      height="${this.height}" 
      width="${this.width}" 
      alt="${this.alt}" 
      fetchpriority="${this.fetchpriority}"
      decoding="${this.decoding}"
      loading="${this.loading}"
    />`;
  }
}

customElements.define(SharperImgLit.tag, SharperImgLit);