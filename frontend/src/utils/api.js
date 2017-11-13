const URL = "http://localhost:3001"
const TOKEN = 'nklprmr07udcty';
const headers = {
  'Accept': 'application/json',
  'Authorization': TOKEN
}

  // To get all the categories
    export const getAllCategories = () =>
      fetch(`${URL}/categories`, { headers })
      .then(res => res.json())

  // To get all posts
    export const getAllPosts = () =>
      fetch(`${URL}/posts`, {headers})
      .then(res => res.json())

  // To get category posts
    export const getCategoryPosts = (category) =>
      fetch(`${URL}/${category}/posts`, {headers})
      .then(res => res.json())

  // Add new post with POST method
    export const addNewPost = (data) =>
      fetch(`${URL}/posts`,{
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( data )
      }).then(res => res.json())

  // Edit post with PUT method
    export const editPost = ( data ) =>
      fetch(`${URL}/posts/${data.id}`, {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify( data )
      }).then(res => res.json())

  // To get Post detail
      export const getPostDetailById = (postId) =>
      fetch(`${URL}/posts/${postId}`, {headers})
      .then(res => res.json())

  // To get comments on post
      export const getCommentsByPostId = (postId) =>
      fetch(`${URL}/posts/${postId}/comments`, {headers})
      .then(res => res.json())

      // Add new post with POST method
      export const addNewComment = (data) =>
        fetch(`${URL}/comments`,{
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( data )
        }).then(res => res.json())

  // vote up or Down
      export const voteUpDown = (postId, optionData) =>
      fetch(`${URL}/posts/${postId}`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(optionData)
      }).then((res) => res.json())

  // vote up or Down comment
      export const voteUpDownComment = (commentId, optionData) =>
      fetch(`${URL}/comments/${commentId}`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(optionData)
      }).then((res) => res.json())

      export const deletePost = (postId) =>
      fetch(`${URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
      }).then((res) => res.json())

      export const deleteComment = (commentId) =>
      fetch(`${URL}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
      }).then((res) => res.json())

      export const editComment = (data) =>
      fetch(`${URL}/comments/${data.id}`, {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => res.json())
