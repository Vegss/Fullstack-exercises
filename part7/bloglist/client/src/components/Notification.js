import { useSelector } from 'react-redux'
import '../app.css'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)


  return (
    <div className={notification.type}>{notification.message}</div>
  )
}

export default Notification