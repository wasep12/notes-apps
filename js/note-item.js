class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector(".edit-btn").addEventListener("click", () => {
      const event = new CustomEvent("edit-note", { detail: this.note });
      document.dispatchEvent(event);
    });
    this.shadowRoot
      .querySelector(".delete-btn")
      .addEventListener("click", () => {
        const event = new CustomEvent("delete-note", { detail: this.note });
        document.dispatchEvent(event);
      });
  }

  set note(note) {
    this._note = note;
    this.render();
  }

  get note() {
    return this._note;
  }

  render() {
    const { title, body, date } = this.note || {};
    this.shadowRoot.innerHTML = `
      <style>
        .note-item {
          padding: 16px;
          border: 1px solid #ddd;
          border-radius: 12px;
          background: linear-gradient(135deg, #f9f9f9, #e2e2e2);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin-bottom: 20px; /* Spasi bawah antar kartu */
          min-height: 250px; /* Tinggi minimum kartu */
          height: 300px; /* Tinggi kartu yang konsisten */
        }
        .note-item:hover {
          transform: scale(1.03);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }
        .actions {
          display: flex;
          gap: 10px;
          margin-top: auto; /* Pindahkan tindakan ke bagian bawah kartu */
        }
        .edit-btn {
          background-color: #6200ea;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          padding: 5px 10px;
          font-size: 14px;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }
        .edit-btn:hover {
          background-color: #3700b3;
          transform: scale(1.05);
        }
        .delete-btn {
          background-color: #ff5252;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          padding: 5px 10px;
          font-size: 14px;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }
        .delete-btn:hover {
          background-color: #ff1744;
          transform: scale(1.05);
        }
      </style>
      <div class="note-item">
        <h2>${title}</h2>
        <p>${body}</p>
        <div class="date">${date}</div>
        <div class="actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>
    `;
  }
}

customElements.define("note-item", NoteItem);
