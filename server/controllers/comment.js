// controllers/comment.controller.js
import Comment from "../models/comment.js";


export const createComment = async (req, res) => {
  try {
    const { productIds, userId, content,star,stt } = req.body;

    // Kiểm tra mảng productIds
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ message: "productIds must be a non-empty array." });
    }

    const comment = new Comment({ productIds, userId, content,stt,star });
    await comment.save();
    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Failed to create comment", error });
  }
};

export const getComments = async (req, res, next) => {
  try {
    const data = await Comment.find({});
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lay danh sach Comment thanh cong!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong co commentnao!" });
  } catch (error) {
    next(error);
  }
};


export const getCommentsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Tìm tất cả comment liên quan đến productId
    const comments = await Comment.find({ productIds: productId }).populate("userId", "name");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments", error });
  }
};


export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { show, productIds } = req.body;

    const updatedData = { show, updatedAt: Date.now() };
    if (Array.isArray(productIds)) updatedData.productIds = productIds;

    const updatedComment = await Comment.findByIdAndUpdate(commentId, updatedData, { new: true });

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment updated successfully", updatedComment });
  } catch (error) {
    res.status(500).json({ message: "Failed to update comment", error });
  }
};


export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment", error });
  }
};