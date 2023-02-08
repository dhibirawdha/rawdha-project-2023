const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/posts", async (req, res) => {
  const data = await Post.find();
  if (!data) {
    return res.json({ msg: "Post empty" });
  }
  return res.json({ data });
});

router.get("/post/:id", async (req, res) => {
  try {
    const IdPost = req.params.id;
    if (!IdPost) {
      return res.json({ msg: "you need to enter the post ID" });
    }
    const data = await Post.findById(IdPost);
    return res.json({ data });
  } catch (err) {
    return res.json({ msg: "there is no post with this handle ID" });
  }
});

router.post("/post", async (req, res) => {
  const { titre, contenu } = req.body;
  if (!titre || !contenu) {
    return res.json({ msg: "you need to enter title and content" });
  }
  const InsertPost = await Post(req.body);
  InsertPost.save();
  if (InsertPost) {
    return res.json({ InsertPost });
  } else {
    return res.json({ msg: "an error" });
  }
});

router.put("/post/:id", async (req, res) => {
  const PostID = req.params.id;
  const titre = req.body.titre;
  const contenu = req.body.contenu;
  if (!PostID) {
    return res.json({ msg: "You need to enter the Handle ID of the post" });
  }
  if (!titre || !contenu) {
    return res.json({ msg: "you need to enter the title and the content" });
  }
  const updatePost = await Post.findByIdAndUpdate(PostID, req.body);
  if (updatePost) {
    return res.json({ updatePost });
  } else {
    return res.json({ msg: "The handle ID of the post not found" });
  }
});

router.delete("/post/:id", async (req, res) => {
  const handleID = req.params.id;
  if (!handleID) {
    return res.json({ msg: "The handle ID not found" });
  }
  const removePost = Post.findByIdAndRemove(handleID).exec();
  if (!removePost) {
    return res.json({ msg: "there is a problem the post not removed!" });
  } else {
    return res.json({ msg: "the post is removed" });
  }
});

module.exports = router;
