import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });

    // setTimeout(() => {
    res.status(200).json(posts);
    // }, 3000);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

export const getPost = async (req, res) => {
  const id = req.params.id;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post ID format" });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          return res.status(200).json({ ...post, isSaved: !!saved });
        } else {
          return res.status(200).json({ ...post, isSaved: false });
        }
      });
    }

    res.status(200).json({ ...post, isSaved: false });
  } catch (err) {
    console.error("Error in getPost:", err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const createPostWithDocument = async (req, res) => {
  const userId = req.userId;

  const { propertyDoc, cnicFront, cnicBack } = req.files;

  if (!propertyDoc || !cnicFront || !cnicBack) {
    return res.status(400).json({ message: "All documents must be uploaded" });
  }

  const postData = JSON.parse(req.body.postData);
  const postDetail = JSON.parse(req.body.postDetail);

  try {
    // Create Post and PostDetail
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        userId: userId,
        postDetail: {
          create: postDetail,
        },
      },
    });

    // Save each document with file paths and link to post & user
    const documents = [
      { file: propertyDoc[0], name: "propertyDoc" },
      { file: cnicFront[0], name: "cnicFront" },
      { file: cnicBack[0], name: "cnicBack" }
    ];

    for (let doc of documents) {
      await prisma.propertyDocument.create({
        data: {
          fileUrl: `/uploads/propertyDocs/${doc.file.filename}`,
          userId: userId,
          postId: newPost.id,
        },
      });
    }

    res.status(201).json({
      post: newPost,
      documents,
    });

  } catch (err) {
    console.error("Error creating post with document:", err);
    res.status(500).json({ message: "Failed to create post with document" });
  }
};



export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {

  const postId = req.params.id;
  const tokenUserId = req.userId;
  const { postData, postDetail } = req.body;

  const post = postData;

  if (!isValidObjectId(postId)) {         
    return res.status(400).json({ message: "Invalid post ID format" });
  }

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
      include: { postDetail: true },
    });

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (existingPost.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not authorized to update this post" });
    }

    const {
      title,
      price,
      images,
      address,
      city,
      bedroom,
      bathroom,
      latitude,
      longitude,
      type,
      property,
    } = post;

    const postUpdateData = {
      title,
      price,
      images,
      address,
      city,
      bedroom,
      bathroom,
      latitude,
      longitude,
      type,
      property,
    };

    let postDetailUpdateData = null;
    if (postDetail) {
      if (existingPost.postDetail) {
        postDetailUpdateData = { update: postDetail };
      } else {
        postDetailUpdateData = { create: postDetail };
      }
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        ...postUpdateData,
        ...(postDetailUpdateData && { postDetail: postDetailUpdateData }),
      },
      include: { postDetail: true },
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to update post" });
  }
};







export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

     // Step 1: Delete PropertyDocument (if exists)
     await prisma.savedPost.deleteMany({
      where: { postId: id },
    });

     // Step 2: Delete PropertyDocument (if exists)
     await prisma.propertyDocument.deleteMany({
      where: { postId: id },
    });

    // Step 3: Delete PostDetail (if exists)
    await prisma.postDetail.deleteMany({
      where: { postId: id },
    });

    // Step 4: Delete Post
    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
