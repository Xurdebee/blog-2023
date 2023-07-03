import Navbar from "./Navbar";

function HeaderBar() {
  return (
    <>
		<header className="sticky-top p-2 mb-2 bg-secondary text-white">
			<h1 className="d-flex justify-content-center" href="/">
				<a href="/" className="text-decoration-none text-white">Mesa de juego</a>
				</h1>
			<nav className="d-flex justify-content-end">
				<Navbar  />
			</nav>
		</header>
    </>
  );
}

export default HeaderBar;
