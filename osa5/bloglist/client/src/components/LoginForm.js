import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({
  notification,
  handleLogin,
  handleUserChange,
  handlePasswordChange
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input onChange={handleUserChange}/>
        </div>
        <div>
          <label>Password</label>
          <input type='password' onChange={handlePasswordChange}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  notification: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleUserChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm