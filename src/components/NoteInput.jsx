import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO [Basic] kelola nilai title sebagai controlled input.
      title: '',
      // TODO [Basic] kelola nilai body sebagai controlled textarea.
      body: '',
      // TODO [Advanced] simpan pesan error validasi submit
      errorMessage: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    // TODO [Basic] update state dengan nilai event.target.value.
    // TODO [Skilled] batasi judul maksimal 50 karakter dan tampilkan peringatan saat sisa karakter < 10.
    const inputTitle = event.target.value;

    if (inputTitle.length <= 50) {
      this.setState({
        title: inputTitle,
      });
    }
  }

  onBodyChangeEventHandler(event) {
    // TODO [Basic] update state body agar textarea menjadi controlled component.
    this.setState({
      body: event.target.value,
      errorMessage: '', // reset error ketika user mengetik ulang
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const { title, body } = this.state;

    // TODO [Advanced] tolak submit ketika body kurang dari 10 karakter dan tampilkan pesan error.
    if (body.trim().length < 10) {
      this.setState({
        errorMessage: 'Isi catatan minimal harus 10 karakter',
      });
      return;
    }

    // TODO [Basic] panggil props.addNote dengan data title & body dari state, lalu reset form.
    this.props.addNote({
      title: title.trim(),
      body: body.trim(),
    });

    this.setState({
      title: '',
      body: '',
      errorMessage: '',
    });
  }

  render() {
    const { title, body, errorMessage } = this.state;

    // TODO [Skilled] hitung sisa karakter jika menerapkan limit 50 karakter.
    const remainingChars = 50 - title.length;

    // Tentukan class untuk counter (tambahkan --warn jika sisa <= 10)
    const counterClass = remainingChars <= 10 
      ? 'note-input__title__char-limit note-input__title__char-limit--warn'
      : 'note-input__title__char-limit';

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {/* // TODO [Advanced] tampilkan pesan error menggunakan elemen dengan class note-input__feedback--error. */}
        {errorMessage && (
          <p className="note-input__feedback--error">
            {errorMessage}
          </p>
        )}

        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          {/* TODO [Skilled] tampilkan sisa karakter secara dinamis ketika limit judul diterapkan */}
          <p
            className={counterClass}
            data-testid="note-input-title-remaining"
          >
            Sisa karakter: {remainingChars}
          </p>

          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />

          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />

          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;