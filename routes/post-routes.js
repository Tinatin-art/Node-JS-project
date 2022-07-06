const express = require('express');
const { getPost,
        deletePost,
        getEditPost,
        editPost, 
        getPosts,
        getAddPost,
        addPost
     } = require('../controllers/post-controller');

const router = express.Router();

router.get('/post/:id', getPost);
router.delete('/post/:id', deletePost);
router.get('/edit/:id', getEditPost);
router.put('/edit/:id', editPost);
router.get('/posts', getPosts);
router.post('/add-post', addPost);
router.get('/add-post', getAddPost);

module.exports = router;