import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

function PostsShort() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/posts/all-post')
      .then((response) => response.json())
      .then((myPosts) => {
        setAllPosts(myPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const slicedText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  const handleDeletePost = (post_id) => {
    fetch(`http://localhost:3000/api/posts/delete/${post_id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al eliminar el post');
        }
      })
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <Container>
      <Row>
        {allPosts.map((post) => (
          <Col key={post.post_id} xs={12} lg={6}>
            <article>
              <div className="mt-3 d-flex bg-light rounded-3 position-relative mb-3" style={{ minHeight: '370px' }}>
                <div className="col-4">
                  <a href={`/post/${post.post_id}`}>
                    <div
                      className="image-container"
                      style={{ Height: '100%', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <img
                        src={`http://localhost:3000/images/${post.image}`}
                        alt={`Post ${post.post_id}`}
                        className="rounded-start-3 img-fluid"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </a>
                </div>
                <div className="col-8 p-3">
                  <div>
                    <a href={`/post/${post.post_id}`} className="text-decoration-none text-black">
                      <h2>{post.header}</h2>
                    </a>
                  </div>
                  <div className="mt-3 mb-5">
                    <p>{slicedText(post.body, 50)}</p>
                  </div>
                  <div className="mb-5">
                    <div>
                      <p>{moment(post.date).format('dddd D [de] MMMM [del] YYYY')}</p>
                    </div>
                    <div>
                      <p>Publicado hace {post.timeAgo}</p>
                    </div>
                  </div>
                  <div className="d-flex position-absolute bottom-0 end-0 p-3">
                    <button
                      onClick={() => handleDeletePost(post.post_id)}
                      className="btn btn-outline-danger border-0 d-flex"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-trash3-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        Eliminar
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PostsShort;
