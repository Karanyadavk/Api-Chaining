import React, { useState, useEffect } from 'react';
import { fetchUsers, createPost, fetchCommentsByPostId } from '../services/api';
import APICard from './APICard';

const WorkflowBuilder = () => {
  const [users, setUsers] = useState([]);
  const [postResponse, setPostResponse] = useState(null);
  const [comments, setComments] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then((data) => setUsers(data))
      .catch((err) => setError('Failed to fetch users',err))
      .finally(() => setLoading(false));
  }, []);

  const handleCreatePost = async () => {
    if (selectedUserId && postTitle && postBody) {
      setLoading(true);
      setError(null);
      const postData = { title: postTitle, body: postBody, userId: selectedUserId };
      try {
        const post = await createPost(postData);
        console.log('Created post response:', post); 
        setPostResponse(post);
      } catch (error) {
        setError('Failed to create post');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  const handleFetchComments = async (postId) => {
    if (postId) {
      setLoading(true);
      setError(null);
      console.log('Fetching comments for postId:', postId); 
      try {
        const commentsData = await fetchCommentsByPostId(postId);
        console.log('Comments fetched:', commentsData); 
        setComments(commentsData);
      } catch (error) {
        setError('Failed to fetch comments');
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Post ID is missing, cannot fetch comments');
    }
  };

  return (
    <div className="p-6 bg-white shadow-md min-h-screen xl:w-2/3 xl:rounded-t-3xl xl:mt-16">
      <div className="space-y-6">
        <div>
          <label className="block font-medium text-2xl text-gray-700 mt-4">Select User:</label>
          <select
            onChange={(e) => setSelectedUserId(Number(e.target.value))}
            className="rounded-md bg-white px-3 py-2 w-full text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50"
          >
            <option value="">Select a User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        

        <div className="mt-8">
          <div>
            <label className="text-lg font-semibold text-gray-700">Title</label>
            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Post Title"
              className="w-full p-2 border-2 border-slate-200 rounded-xl"
            />
          </div>

          <div className="mt-4">
            <label className="text-lg font-semibold text-gray-700">Description</label>
            <textarea
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              placeholder="Post Body"
              className="w-full p-2 border-2 border-slate-200 rounded-xl"
            ></textarea>
          </div>
          <button
            onClick={handleCreatePost}
            className="px-6 py-2 mt-2 xl:px-12 xl:py-4 rounded-full bg-[#1ED760] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#21e065] transition-colors duration-200"
          >
            {loading ? <div>Loading...</div> : "Create Post"}
          </button>
        </div>


        {postResponse && (
          <div>
            <APICard title="Created Post" data={postResponse} />
            {postResponse.id && (
              <button
                onClick={() => handleFetchComments(postResponse.id)} // Use postResponse.id
                className="px-6 py-2 mt-2 xl:px-12 xl:py-4 rounded-full bg-[#1ED760] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#21e065] transition-colors duration-200"
              >
                {loading ? <div>Loading...</div> : "Fetch Comments"}
              </button>
            )}
          </div>
        )}

        {error && <div className="text-red-500">{error}</div>}

        {comments.length > 0 && (
          <div>
            <div className="border-t pt-8 text-5xl font-semibold">Comments</div>
            {comments.map((comment) => (
              <div className="pt-10 border-b-2 border-slate-200 pb-10" key={comment.id}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500 text-white text-lg uppercase flex justify-center items-center">
                    {comment.name[0]}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-lg capitalize">{comment.name}</div>
                    <div className="font-light text-sm text-gray-400">{comment.email}</div>
                  </div>
                </div>
                <div className="text-slate-800 ml-16 capitalize font-normal">{comment.body}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowBuilder;
