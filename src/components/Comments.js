import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import api from '../utils/api';

const createComment = async ({ projectId, taskId, commentData }) => {
  const { data } = await api.post(`/projects/${projectId}/tasks/${taskId}/comments`, commentData);
  return data;
};

export default function Comments({ projectId, taskId, comments }) {
  const [newComment, setNewComment] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['project', projectId]);
      setNewComment('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ projectId, taskId, commentData: { content: newComment } });
  };

  return (
    <div>
      <h4 className="text-lg font-medium text-gray-900 mb-2">Comments</h4>
      <ul className="space-y-2">
        {comments.map((comment) => (
          <li key={comment.id} className="bg-gray-50 p-2 rounded">
            <p className="text-sm">{comment.content}</p>
            <p className="text-xs text-gray-500">By {comment.user.name} on {new Date(comment.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className="mt-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
}