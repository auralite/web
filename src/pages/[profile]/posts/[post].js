import { usePageLayout } from '../../../components/App/PageLayout'
import PostPage from '../../../components/App/PostPage'

const Show = PostPage

Show.getLayout = (page) => usePageLayout()(page)

Show.getInitialProps = async ({ query }) => {
	return { postId: query.post }
}

export default Show
