class NoteHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          header {
            background-color: #6200ea;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
          }
        </style>
        <header>
          Notes App
        </header>
      `;
  }
}

customElements.define("note-header", NoteHeader);
