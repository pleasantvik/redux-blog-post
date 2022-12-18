import { useSelector } from 'react-redux'
import { notificationAction, selectAllNotifications } from './notificationSlice'
import { selectAllUsers } from '../users/usersSLice'
import { parseISO } from 'date-fns/esm'
import { formatDistanceToNow } from 'date-fns'
import { useDispatch } from 'react-redux'
import { useLayoutEffect } from 'react'
import classNames from 'classnames'

export const NotificationList = () => {
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(notificationAction.allNotificationsRead())
  })

  const renderNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)

    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown user',
    }

    const notificationClassname = classNames('notification', {
      new: notification.isNew,
    })
    return (
      <div className={notificationClassname} key={notification.id}>
        <div>
          <strong>{user.name}</strong> {notification.message}
        </div>
        <div title={notification.date}>
          <em>{timeAgo} ago</em>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderNotifications}
    </section>
  )
}
