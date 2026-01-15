const Signin = () => {

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <p>Username: <input type="text" onChange={e => e.target.value}></input></p>
        <p>Password: <input type="password" onChange={e => e.target.value}></input></p>
        <button type="submit">Sign in</button>
      </form>
    </div>
   )
}

export default Signin