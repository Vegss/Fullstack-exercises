import { useSelector } from 'react-redux'
import '../app.css'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  if (!notification.message) return null

  return (
    <Alert variant={notification.type}>{notification.message}</Alert>
  )
}

export default Notification