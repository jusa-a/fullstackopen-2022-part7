import { Container, Button, Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Menu = ({ user, logout }) => {
    return (
        <Navbar expand='lg'>
            <Container>
                <Navbar.Brand>Blog App</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <LinkContainer to='/'>
                            <Nav.Link>Blogs</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/users'>
                            <Nav.Link>Users</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Navbar.Text>
                        Logged in as {user.name}{' '}
                        <Button
                            variant='outline-secondary rounded-pill'
                            onClick={logout}
                        >
                            logout
                        </Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Menu
