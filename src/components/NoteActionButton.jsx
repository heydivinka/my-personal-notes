    import React from 'react';

    /**
     * Komponen reusable untuk tombol aksi pada note item
     * @param {string} variant - Jenis tombol: 'delete' atau 'archive'
     * @param {function} onClick - Handler ketika tombol diklik
     * @param {string} children - Teks yang ditampilkan pada tombol
     */
    function NoteActionButton({ variant, onClick, children }) {
    const className = variant === 'delete' 
        ? 'note-item__delete-button' 
        : 'note-item__archive-button';

    const dataTestId = variant === 'delete'
        ? 'note-item-delete-button'
        : 'note-item-archive-button';

    return (
        <button
        className={className}
        type="button"
        onClick={onClick}
        data-testid={dataTestId}
        >
        {children}
        </button>
    );
    }

    export default NoteActionButton;