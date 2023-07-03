import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

function EditablePost() {
  const [post, setPost] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedHeader, setUpdatedHeader] = useState("");
  const [updatedBody, setUpdatedBody] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);

  const { post_id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/post/${post_id}`)
      .then((response) => response.json())
      .then((post) => {
        console.log(post);
        setPost(post[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [post_id]);

  const handleEdit = () => {
    setEditing(true);
    setUpdatedHeader(post.header);
    setUpdatedBody(post.body);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("image", updatedImage);
    formData.append("header", updatedHeader);
    formData.append("body", updatedBody);

    fetch(`http://localhost:3000/api/posts/editpost/${post_id}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((savedPost) => {
        setPost(savedPost);
        setEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleHeaderChange = (event) => {
    setUpdatedHeader(event.target.value);
  };

  const handleBodyChange = (event) => {
    setUpdatedBody(event.target.value);
  };

  const handleImageChange = (event) => {
    setUpdatedImage(event.target.files[0]);
  };

  const handleDeletePost = () => {
    const confirmed = window.confirm(
      "¿Estás seguro de quierer borrar el post?"
    );

    if (confirmed) {
      fetch(`http://localhost:3000/api/posts/delete/${post_id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error al eliminar el post");
          }
        })
        .then((data) => {
          console.log(data);
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const charactersCount = updatedHeader.length;

  return (
    <>
      {post && (
        <article key={post.post_id}>
          {editing ? (  
              <Container>
                <div className="mt-5 justify-content-center row align-items-center">
                  <div className="col-10 bg-success-subtle shadow-lg p-5 rounded-3">
                    {updatedImage && (
                      <img
                        src={URL.createObjectURL(updatedImage)}
                        alt={`Updated post ${post.post_id}`}
                        className="rounded-3 w-100 h-100 mb-2"
                      />
                    )}
                    {!updatedImage && (
                      <img
                        src={`http://localhost:3000/images/${post.image}`}
                        alt={`Post ${post.post_id}`}
                        className="rounded-3 w-100 h-100 mb-2"
                      />
                    )}
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="mb-2"
                    />
                    <form>
                      <div>
                        <h2 className="mt-3">
                          <textarea
                            value={updatedHeader || post.header}
                            onChange={handleHeaderChange}
                            style={{
                              resize: "none",
                              width: "100%",
                              height: "auto",
                              minHeight: "50px",
                              maxHeight: "200px",
                            }}
                          />
                        </h2>
                        <p className="text-end text-muted mb-5">
                          {charactersCount}/40
                        </p>
                        <p className="mb-5">
                          <textarea
                            value={updatedBody || post.body}
                            onChange={handleBodyChange}
                            style={{
                              resize: "none",
                              width: "100%",
                              height: "auto",
                              minHeight: "100px",
                              maxHeight: "500px",
                            }}
                          />
                        </p>
                        <div className="mb-5">
                          <div className="d-flex justify-content-between">
                            <button
                              onClick={handleCancel}
                              className="btn btn-outline-secondary"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={handleSave}
                              className="btn btn-outline-success"
                            >
                              Guardar
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </Container>
          ) : (
            <Container>
              <div className="mt-5 justify-content-center row align-items-center">
                <div className="col-10 bg-success-subtle shadow-lg p-5 rounded-3">
                  <img
                    src={`http://localhost:3000/images/${post.image}`}
                    alt={`Post ${post.post_id}`}
                    className="rounded-3 w-100 h-100 mb-2"
                  />
                  <form>
                    <div>
                      <h2 className="mb-3">{post.header}</h2>
                      <p className="mb-5">{post.body}</p>
                      <div className="mb-5">
                        <div>
                          <p>
                            Creado el{" "}
                            {moment(post.date).format(
                              "dddd D [de] MMMM [del] YYYY"
                            )}
                          </p>
                        </div>
                        <div className="mb-5">
                          <p>
                            Editado el{" "}
                            {moment(post.date).format(
                              "dddd D [de] MMMM [del] YYYY"
                            )}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <button
                            onClick={handleEdit}
                            className="btn btn-outline-primary"
                          >
                            Editar
                          </button>
                          <button
                            onClick={handleDeletePost}
                            className="btn btn-outline-danger"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Container>
          )}
        </article>
      )}
    </>
  );
}

export default EditablePost;
