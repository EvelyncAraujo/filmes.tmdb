import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTJlMWFiMWZjNWUwYWQxMWIwZGQ5MDMxZWI0MWY4MSIsInN1YiI6IjY1MDQ2ODgwZDdkY2QyMDBmZmVkYzQzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IYS00krHEJZ7PDy1T3I99wNAgM9wnJ4wnikXxeHVB_M`
  }
})

export default api