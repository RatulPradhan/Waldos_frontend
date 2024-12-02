
const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("./database");

const app = express();
const port = 8080;

// Configure multer for post photos
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "images/posts"));
	},
	filename: async function (req, file, cb) {
		const { user_id } = req.body;
		// Assume a function to create a new post and get post_id
		const postId = await db.createPost({ user_id });
		const fileExtension = path.extname(file.originalname);
		cb(null, `${postId}${fileExtension}`);
		req.postId = postId;
	},
});
const upload = multer({ storage: storage });

app.post("/upload_post_photo", upload.single("photo"), async (req, res) => {
	try {
		const postId = req.postId;
		const fileName = req.file.filename;
		// Update the post with photo_id
		await db.updatePostPhoto(postId, fileName);
		res.json({ photo_id: fileName });
	} catch (error) {
		console.error("Error uploading post photo:", error);
		res.status(500).json({ message: "Failed to upload photo" });
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});