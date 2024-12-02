import React, { createContext, useState, useEffect } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ userData, children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userData || !userData.user_id) return;
      try {
        const response = await fetch(`http://localhost:8080/notifications/${userData.user_id}`);
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        } else {
          console.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userData.user_id]);

  const unreadCount = notifications.filter((notif) => !notif.is_read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, setNotifications }}>
      {!loading && children}
    </NotificationContext.Provider>
  );
};
