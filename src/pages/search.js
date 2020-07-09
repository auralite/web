import { usePageLayout } from '../components/App/PageLayout'
import withAuth from '../middleware/auth'

const Search = () => {
	return <span>soon!</span>
}

Search.getLayout = usePageLayout('Search')
Search.middleware = withAuth()

export default Search
