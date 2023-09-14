const Blog = ({ blog }) => (
  <div>
    Title: {blog.title}, Blog: {blog.author}, likes:{blog.likes}, By {blog.user.username}
  </div>  
)

export default Blog