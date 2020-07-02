import { usePageLayout } from '../../../components/App/PageLayout'
import PostPage from '../../../components/App/PostPage'
import { withAuthInfo } from '../../../middleware/auth'

const Post = PostPage

Post.getLayout = (page) => usePageLayout()(page)

Post.getInitialProps = async ({ query }) => {
	return { postId: query.post }
}

Post.middleware = withAuthInfo()

export default Post
