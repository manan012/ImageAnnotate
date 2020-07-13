import axios from "axios"

export const fetchNotifications = () => {
    return axios.get("/api/notifications/");
}

const NOTIFICATION = {
    fetchNotifications,
}

export default NOTIFICATION;