class NoteInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();

      const title = this.shadowRoot.querySelector("#title").value;
      const body = this.shadowRoot.querySelector("#body").value;
      const createdAt = this.shadowRoot.querySelector("#created-at").value;

      let isValid = true;

      // Clear previous error messages
      this.shadowRoot.querySelector("#title-error").textContent = "";
      this.shadowRoot.querySelector("#body-error").textContent = "";

      // Validate title
      if (title.length < 5) {
        this.shadowRoot.querySelector(
          "#title-error"
        ).innerHTML = `⚠️ Title must be at least 5 characters long.`;
        isValid = false;
      }

      // Validate body
      if (body.length < 10) {
        this.shadowRoot.querySelector(
          "#body-error"
        ).innerHTML = `⚠️ Description must be at least 10 characters long.`;
        isValid = false;
      }

      if (isValid) {
        const note = {
          id: `notes-${Date.now()}`,
          title,
          body,
          createdAt: createdAt || new Date().toISOString(), // Gunakan waktu inputan atau waktu saat ini
          archived: false,
        };
        const event = new CustomEvent("note-added", { detail: note });
        document.dispatchEvent(event);
        this.shadowRoot.querySelector("form").reset();
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 25px;
        }
        label {
          font-weight: bold;
        }
        input, textarea {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          padding: 10px;
          background-color: #6200ea;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #3700b3;
        }
        .error-message {
          color: #ff0000;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 5px;
        }
        .error-icon {
          font-weight: bold;
        }
      </style>
      <form id="note-form">
        <label for="title">Note Title</label>
        <input type="text" id="title" name="title" required />
        <div class="error-message" id="title-error"></div>

        <label for="body">Note Description</label>
        <textarea id="body" name="body" rows="4" required></textarea>
        <div class="error-message" id="body-error"></div>

        <label for="created-at">Date and Time</label>
        <input type="datetime-local" id="created-at" name="created-at" required/>

        <button type="submit">Add Note</button>
      </form>
    `;
  }
}

customElements.define("note-input", NoteInput);
