import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

export default function NavbarTop() {
  return (
    <Navbar expand="lg" className="bg-white py-0">
        <Container>
          <Link to={'/'} className='text-decoration-none'>
            <Navbar.Brand className='arabic-font fw-bold' href="#">Quran</Navbar.Brand>
          </Link>
          <Navbar.Toggle className='my-3' aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <NavLink to={'/'} className={'nav-link'} activeclassname="active">
                Home
              </NavLink>
              <NavLink to={'/doa'} className={'nav-link'} activeclassname="active">
                Doa
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
