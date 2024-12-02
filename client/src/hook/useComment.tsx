import { useState, useEffect } from "react";
import axios from "axios";
import { TPcomment } from "../types/comment";

const useComments = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState<TPcomment[]>([]);
  const [loading, setLoading] = useState(false);

  const createComment = async (newComment) => {
    console.log(newComment)
    try {
        setLoading(true);
        const response = await axios.post('/api/comments', newComment); 
        setComments(response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response?.data);
        } else {
            console.error('Error:', error.message);
        }
    } finally {
        setLoading(false);
    }};

    const getCommentByProductId = async (id:string) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/comments/${id}`); 
            setComment(response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
        } finally {
            setLoading(false);
        }};

  return { comments,createComment,comment,getCommentByProductId};
};

export default useComments;
