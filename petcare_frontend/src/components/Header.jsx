function Header({ title, description }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  )
}

export default Header