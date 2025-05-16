import './Header.css'


const Header_move =()=>{
    return (
    <div className='cover'>
    <header className="header-hbox">
      <div className="logo"> 
      <h3 className="Footer_logo">GI Movies</h3>
      </div>
      <nav className="nav-links">
        <button className="nav-button">Search</button>
        <button className="nav-button">Recommend me</button>
        <button className="nav-button">About</button>
        <button className="nav-button">Log out</button>
        
      </nav>
    </header>
    </div>
        
    )
}




export default Header_move