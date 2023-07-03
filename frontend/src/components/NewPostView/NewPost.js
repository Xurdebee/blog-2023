import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

const NewPost = () => {
  const [header, setHeader] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);

  const submitPost = (event) => {
    event.preventDefault();

    if (header.trim() === '') {
      alert('Escribe un título, algo se te ocurrirá.');
      return;
    }
    if (body.trim() === '') {
      alert('Escribe un texto, algo nuevo tendrás para contar.');
      return;
    }

    if (!image) {
      alert('Selecciona una imagen para la nueva entrada del blog.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('header', header);
    formData.append('body', body);

    fetch('http://localhost:3000/api/posts/newpost', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.href = '/';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleHeaderChange = (event) => {
    const inputText = event.target.value;
    if (inputText.length <= 40) {
      setHeader(inputText);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <Container>
      <div className="mt-5 justify-content-center row align-items-center">
        <div className="col-10 bg-success-subtle shadow-lg p-5 rounded-3">
          <div className="overflow-hidden">
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="new post"
                className="rounded-3 w-100 h-100 mb-2"
              />
            )}
            <input type="file" onChange={handleImageChange} className="mb-2" />
          </div>
          <form onSubmit={submitPost}>
            <h2 className="mt-3">
              <textarea
                value={header}
                onChange={handleHeaderChange}
                style={{
                  resize: 'none',
                  width: '100%',
                  height: 'auto',
                  minHeight: '50px',
                  maxHeight: '200px',
                }}
              />
            </h2>
            <p className="text-end text-muted mb-5">
              {header.length}/40
            </p>
            <p className="mb-5">
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                style={{
                  resize: 'none',
                  width: '100%',
                  height: 'auto',
                  minHeight: '100px',
                  maxHeight: '500px',
                }}
              />
            </p>
            <div className="mb-5">
              <div className="d-flex justify-content-between">
                <a href="/" className="btn btn-outline-secondary">
                  Cancelar
                </a>
                <button type="submit" className="btn btn-outline-success">
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default NewPost;
