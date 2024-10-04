export const fetchUsers = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        return response.json();
    } catch (error) {
        console.log("Error fetching the users", error)
        return error;
    }
  };
  
  export const createPost = async (data) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          return response.json(); 
    } catch (error) {
        console.error("Error while Creating the post", error)
        return error
    }
  };
  
  export const fetchCommentsByPostId = async (postId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId-100}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };
  