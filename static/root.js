const axios = require('axios');

const uri = "https://jsonplaceholder.typicode.com/";

function allQuery(root) {
    return async () => {
        const r = await axios.get(uri + root);
        return r.data;
    }
}

function idQuery(root) {
    return async ({id}) => {
        const r = await axios.get(uri + `${root}/${id}`);
        return r.data;
    }
}
function updateQuery(root) {
    return async ({id, input}) => {
        console.log(input);
        const r = await axios.get(uri + `${root}/${id}`);
        return r.data;
    }
}

function deleteQuery(root) {
    return async ({id}) => {
        const r = await axios.delete(uri + `${root}/${id}`);
        return id;
    }
}

module.exports = {
    allUsers: allQuery('users'),
    allPosts: allQuery('posts'),
    allComments: allQuery('comments'),
    user: idQuery('users'),
    post: idQuery('posts'),
    comment: idQuery('comments'),
    commentByPost: async ({id}) => {
        const r = await axios.get(uri + `posts/${id}/comments`);
        return r.data;
    },
    updatePost: updateQuery('posts'),
    deletePost: deleteQuery('posts')
}