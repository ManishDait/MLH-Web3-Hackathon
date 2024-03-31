import './Navbar.css';
import Gravatar from 'react-gravatar'

const Navbar = ({account}) => {
    return (
      <header>
        <nav class="navbar navbar-light bg-light">
          <a href='#' class="navbar-brand p-2">Web3 CloudStore</a>
          <div class="d-flex align-items-center justify-content-center gap-1">
            <div class="rounded">
              <Gravatar md5={account}/>
            </div>
            <p class="m-0 px-2">{account}</p>
          </div>
        </nav>
      </header>
    );
}

export default Navbar;
