
const { Pool } = require("pg");

const pool = new Pool({
	user: "your_user",
	host: "localhost",
	database: "your_database",
	password: "your_password",
	port: 5432,
});

async function createPost(postData) {
	const result = await pool.query(
		"INSERT INTO post (user_id, channel_id, title, content) VALUES ($1, $2, $3, $4) RETURNING post_id",
		[postData.user_id, postData.channel_id, postData.title, postData.content]
	);
	return result.rows[0].post_id;
}

async function updatePostPhoto(postId, photoId) {
	await pool.query(
		"UPDATE post SET photo_id = $1 WHERE post_id = $2",
		[photoId, postId]
	);
}

module.exports = {
	createPost,
	updatePostPhoto,
};