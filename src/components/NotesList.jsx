import React from 'react';
import NoteItem from './NoteItem';

function NotesList({
  notes,
  onDelete,
  onArchive,
  searchKeyword,
  dataTestId = 'notes-list',
}) {
  // TODO [Basic] validasi notes agar tidak kosong.
  const hasNotes = Array.isArray(notes) && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        {/* TODO [Basic] tampilkan pesan kosong yang informatif ketika tidak ada catatan. */}
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan
        </p>
      </div>
    );
  }

  // TODO [Advanced] kelompokkan catatan per bulan-tahun
  const groupedNotes = notes.reduce((groups, note) => {
    const date = new Date(note.createdAt);
    const groupKey = `${date.getFullYear()}-${date.getMonth()}`;

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(note);
    return groups;
  }, {});

  return (
    <div className="notes-list" data-testid={dataTestId}>
      {/* TODO [Basic] gunakan array.map untuk merender NoteItem untuk setiap catatan. */}
      {/* TODO [Skilled] ekstrak tombol aksi menjadi komponen reusable agar dipakai NoteItem. */}
      {/* TODO [Advanced] kelompokkan catatan per bulan-tahun dan render tiap grup dalam <section className="notes-group">. */}
      {Object.entries(groupedNotes).map(([groupKey, groupNotes]) => {
        const [year, month] = groupKey.split('-');
        const groupDate = new Date(year, month);

        return (
          <section
            key={groupKey}
            className="notes-group"
            data-testid={`${groupKey}-group`}
          >
            <h3>
              {groupDate.toLocaleString('id-ID', {
                month: 'long',
                year: 'numeric',
              })}
            </h3>

            <span data-testid={`${groupKey}-group-count`}>
              {groupNotes.length} catatan
            </span>

            {groupNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}

export default NotesList;
