import * as React from "react";

type notificationProps = {
  title: string;
  message: string;
};

export const useNotification = () => {
  const [permission, setPermission] = React.useState("default");
  const [notification, setNotification] = React.useState<
    Notification | undefined
  >(undefined);

  React.useEffect(() => {
    return () => {
      if (notification) {
        notification.close();
      }
    };
  });

  const askForPermission = () => {
    Notification.requestPermission().then((perm) => {
      setPermission(perm);
    });
  };

  const showNotification = ({ title, message }: notificationProps) => {
    const notification = new Notification(title, {
      body: message,
    });
    setNotification(notification);
  };

  const closeNotification = () => {
    notification?.close();
  };

  return {
    permission,
    notification,
    askForPermission,
    showNotification,
    closeNotification,
  };
};