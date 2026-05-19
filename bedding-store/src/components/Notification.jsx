import { useEffect } from 'react'
import { useApp } from '../context/AppContext'
import './Notification.css'

function Notification() {
  const { notification } = useApp()

  if (!notification) return null

  return (
    <div className={`notification notification-${notification.type}`}>
      <div className="notification-icon">
        {notification.type === 'success' && '✓'}
        {notification.type === 'error' && '✕'}
        {notification.type === 'warning' && '⚠'}
        {notification.type === 'info' && 'ℹ'}
      </div>
      <p className="notification-message">{notification.message}</p>
    </div>
  )
}

export default Notification
