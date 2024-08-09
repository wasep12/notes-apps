const notesContainer = document.getElementById("notesContainer");
const editPopup = document.getElementById("edit-popup");
const confirmDeletePopup = document.getElementById("confirm-delete-popup");
const editContent = editPopup.querySelector(".popup-content");
const confirmDeleteContent = confirmDeletePopup.querySelector(
  ".confirm-delete-content"
);
let noteToEdit = null;
let noteToDelete = null;

// Data dumi untuk catatan
const notes = [
  {
    id: "notes-jT-jjsyz61J8XKiI",
    title: "Welcome to Notes, Dimas!",
    body: "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
    createdAt: "2022-07-28T10:03:12.594Z",
    archived: false,
  },
  {
    id: "notes-aB-cdefg12345",
    title: "Meeting Agenda",
    body: "Discuss project updates and assign tasks for the upcoming week.",
    createdAt: "2022-08-05T15:30:00.000Z",
    archived: false,
  },
  {
    id: "notes-XyZ-789012345",
    title: "Shopping List",
    body: "Milk, eggs, bread, fruits, and vegetables.",
    createdAt: "2022-08-10T08:45:23.120Z",
    archived: false,
  },
  {
    id: "notes-1a-2b3c4d5e6f",
    title: "Personal Goals",
    body: "Read two books per month, exercise three times a week, learn a new language.",
    createdAt: "2022-08-15T18:12:55.789Z",
    archived: false,
  },
  {
    id: "notes-LMN-456789",
    title: "Recipe: Spaghetti Bolognese",
    body: "Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...",
    createdAt: "2022-08-20T12:30:40.200Z",
    archived: false,
  },
  {
    id: "notes-QwErTyUiOp",
    title: "Workout Routine",
    body: "Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.",
    createdAt: "2022-08-25T09:15:17.890Z",
    archived: false,
  },
  {
    id: "notes-abcdef-987654",
    title: "Book Recommendations",
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: "2022-09-01T14:20:05.321Z",
    archived: false,
  },
  {
    id: "notes-zyxwv-54321",
    title: "Daily Reflections",
    body: "Write down three positive things that happened today and one thing to improve tomorrow.",
    createdAt: "2022-09-07T20:40:30.150Z",
    archived: false,
  },
  {
    id: "notes-poiuyt-987654",
    title: "Travel Bucket List",
    body: "1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA",
    createdAt: "2022-09-15T11:55:44.678Z",
    archived: false,
  },
  {
    id: "notes-asdfgh-123456",
    title: "Coding Projects",
    body: "1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project",
    createdAt: "2022-09-20T17:10:12.987Z",
    archived: false,
  },
  {
    id: "notes-5678-abcd-efgh",
    title: "Project Deadline",
    body: "Complete project tasks by the deadline on October 1st.",
    createdAt: "2022-09-28T14:00:00.000Z",
    archived: false,
  },
  {
    id: "notes-9876-wxyz-1234",
    title: "Health Checkup",
    body: "Schedule a routine health checkup with the doctor.",
    createdAt: "2022-10-05T09:30:45.600Z",
    archived: false,
  },
  {
    id: "notes-qwerty-8765-4321",
    title: "Financial Goals",
    body: "1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.",
    createdAt: "2022-10-12T12:15:30.890Z",
    archived: false,
  },
  {
    id: "notes-98765-54321-12345",
    title: "Holiday Plans",
    body: "Research and plan for the upcoming holiday destination.",
    createdAt: "2022-10-20T16:45:00.000Z",
    archived: false,
  },
  {
    id: "notes-1234-abcd-5678",
    title: "Language Learning",
    body: "Practice Spanish vocabulary for 30 minutes every day.",
    createdAt: "2022-10-28T08:00:20.120Z",
    archived: false,
  },
];

// Menampilkan catatan
// Menampilkan catatan
function displayNotes() {
  notesContainer.innerHTML = "";
  notes
    .slice()
    .reverse()
    .forEach((note) => {
      // Membalik urutan notes
      const noteElement = document.createElement("note-item");
      noteElement.note = {
        ...note,
        date: new Date(note.createdAt).toLocaleString(), // Format tanggal
      };
      notesContainer.prepend(noteElement); // Menambahkan catatan baru di atas
    });
}

// Menangani event ketika catatan ditambahkan
document.addEventListener("note-added", (event) => {
  notes.unshift(event.detail); // Menambahkan catatan baru ke awal array
  displayNotes();
});

displayNotes();

// Menangani event ketika catatan ditambahkan
document.addEventListener("note-added", (event) => {
  notes.push(event.detail);
  displayNotes();
});

// Menangani event ketika catatan akan diedit
document.addEventListener("edit-note", (event) => {
  noteToEdit = event.detail;

  // Format tanggal untuk input datetime-local
  const formattedDate = new Date(noteToEdit.createdAt)
    .toISOString()
    .slice(0, 16);

  editContent.innerHTML = `
    <h2>Edit Note</h2>
    <form id="edit-form">
      <label for="edit-title">Note Title</label>
      <input type="text" id="edit-title" name="title" value="${noteToEdit.title}" required />
      <span id="title-error" class="error-message"></span> <!-- Elemen untuk pesan kesalahan judul -->

      <label for="edit-body">Note Description</label>
      <textarea id="edit-body" name="body" rows="4" required>${noteToEdit.body}</textarea>
      <span id="body-error" class="error-message"></span> <!-- Elemen untuk pesan kesalahan isi -->

      <label for="edit-created-at">Date and Time</label>
      <input type="datetime-local" id="edit-created-at" name="created-at" value="${formattedDate}" />

      <button type="submit">Save Changes</button>
      <button type="button" id="cancel-edit">Cancel</button>
    </form>
  `;

  // Menangani event listener untuk popup edit
  const closeEditPopupBtn = document.getElementById("close-edit-popup");
  const cancelEditBtn = document.getElementById("cancel-edit");
  const editForm = document.getElementById("edit-form");

  // Menutup popup edit
  if (closeEditPopupBtn) {
    closeEditPopupBtn.onclick = () => {
      editPopup.style.display = "none";
    };
  }

  // Membatalkan pengeditan
  if (cancelEditBtn) {
    cancelEditBtn.onclick = () => {
      editPopup.style.display = "none";
    };
  }

  // Menyimpan perubahan dengan validasi manual
  if (editForm) {
    editForm.onsubmit = (e) => {
      e.preventDefault();

      const updatedTitle = e.target.querySelector("#edit-title").value;
      const updatedBody = e.target.querySelector("#edit-body").value;
      const updatedCreatedAt = e.target.querySelector("#edit-created-at").value;

      // Ambil elemen pesan kesalahan
      const titleError = e.target.querySelector("#title-error");
      const bodyError = e.target.querySelector("#body-error");

      // Reset pesan kesalahan
      titleError.textContent = "";
      bodyError.textContent = "";

      let isValid = true;

      // Validasi panjang karakter
      if (updatedTitle.length < 3) {
        titleError.textContent = "⚠️ Title must be at least 3 characters long.";
        isValid = false;
      }

      if (updatedBody.length < 10) {
        bodyError.textContent =
          "⚠️ Description must be at least 10 characters long.";
        isValid = false;
      }

      if (!isValid) {
        return; // Hentikan pengiriman form jika ada kesalahan
      }

      // Menyimpan perubahan jika validasi berhasil
      const index = notes.findIndex((n) => n.id === noteToEdit.id);
      if (index !== -1) {
        notes[index] = {
          ...notes[index],
          title: updatedTitle,
          body: updatedBody,
          createdAt: updatedCreatedAt || new Date().toISOString(), // Gunakan waktu inputan atau waktu saat ini
        };
        displayNotes();
        editPopup.style.display = "none";
      }
    };
  }

  editPopup.style.display = "flex";
});

// Menangani event ketika catatan akan dihapus
document.addEventListener("delete-note", (event) => {
  noteToDelete = event.detail;
  confirmDeleteContent.innerHTML = `
    <p id="delete-confirm-message">Are you sure you want to delete the note titled "${noteToDelete.title}"?</p>
    <button id="confirm-delete">Yes</button>
    <button id="cancel-delete">No</button>
  `;

  // Mengonfirmasi penghapusan
  const confirmDeleteBtn = document.getElementById("confirm-delete");
  if (confirmDeleteBtn) {
    confirmDeleteBtn.onclick = () => {
      const index = notes.findIndex((n) => n.id === noteToDelete.id);
      if (index !== -1) {
        notes.splice(index, 1);
        displayNotes();
        confirmDeletePopup.style.display = "none";
      }
    };
  }

  // Membatalkan penghapusan
  const cancelDeleteBtn = document.getElementById("cancel-delete");
  if (cancelDeleteBtn) {
    cancelDeleteBtn.onclick = () => {
      confirmDeletePopup.style.display = "none";
    };
  }

  confirmDeletePopup.style.display = "flex";
});

// Menangani event ketika catatan akan dihapus
document.addEventListener("delete-note", (event) => {
  noteToDelete = event.detail;
  confirmDeleteContent.innerHTML = `
    <p id="delete-confirm-message">Are you sure you want to delete the note titled "${noteToDelete.title}"?</p>
    <button id="confirm-delete">Yes</button>
    <button id="cancel-delete">No</button>
  `;

  // Mengonfirmasi penghapusan
  const confirmDeleteBtn = document.getElementById("confirm-delete");
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener(
      "click",
      () => {
        const index = notes.findIndex((n) => n.id === noteToDelete.id);
        if (index !== -1) {
          notes.splice(index, 1);
          displayNotes();
          confirmDeletePopup.style.display = "none";
        }
      },
      { once: true }
    );
  }

  // Membatalkan penghapusan
  const cancelDeleteBtn = document.getElementById("cancel-delete");
  if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener(
      "click",
      () => {
        confirmDeletePopup.style.display = "none";
      },
      { once: true }
    );
  }

  confirmDeletePopup.style.display = "flex";
});
