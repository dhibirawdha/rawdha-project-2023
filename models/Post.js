const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  titre: {
    type: String,
  },
  contenu: {
    type: String,
  },
});

module.exports = mongoose.model("Post", PostSchema);
