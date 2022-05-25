import axios from "axios"

export let endpoints = {
    "categories": "/categories/",
    "courses": "/courses/",
    "lessons": (courseId) => `/courses/${courseId}/lessons/`,
    "lessons_detail": (lessonId) => `/lessons/${lessonId}/`,
    "oauth2-info": "/oauth2-info/",
    "login": "/o/token/",
    "current-user": "/users/current-user/",
    "register": "/users/",
    "comments": (lessonId) => `/lessons/${lessonId}/comments/`,
    "add-comment": (lessonId) => `/lessons/${lessonId}/add-comment/`,
}

export default axios.create({
    baseURL: "http://127.0.0.1:8000"
})