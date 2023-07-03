import Navbar from "./Navbar";

function HeaderBar() {
  return (
    <>
      <header className="sticky-top border-bottom border-black">
        <div
          className="bg-success pt-2 "
          style={{
            backgroundImage: 'url("http://localhost:3000/images/header.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1
            className="d-flex justify-content-center "
            href="/"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            <a
              href="/"
              className="text-decoration-none text-white text-shadow "
            >
              Mesa de Juegos
            </a>
          </h1>
          <nav className="d-flex justify-content-end">
            <Navbar />
          </nav>
        </div>
      </header>
    </>
  );
}

export default HeaderBar;
