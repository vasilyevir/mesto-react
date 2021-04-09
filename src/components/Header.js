function Header(props){
    return(
        <header className="header">
            <div className="logo"></div>
            {props.children}
        </header>
    )
}
export default Header;  