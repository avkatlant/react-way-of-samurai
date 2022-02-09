import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "6b917dfc-dc0b-4ac2-a6d4-8e68d81f5ae5",
  },
});

export const uesersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users/?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },

  follow(userId) {
    return instance.post(`follow/${userId}/`);
  },

  unfollow(userId) {
    return instance.delete(`follow/${userId}/`);
  },

  getProfile(userId) {
    console.log("Obsolete method. Please profileAPI objest");
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}/`);
  },

  getStatus(userId) {
    return instance.get(`profile/status/${userId}/`);
  },

  updateStatus(status) {
    return instance.put(`profile/status/`, { status: status });
  },
};

export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },
};
