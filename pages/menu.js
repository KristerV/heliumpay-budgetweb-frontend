import config from '../config'
import ApiClient from '../utils/ApiClient'
import LayoutColumns from '../components/LayoutColumns'

const client = new ApiClient(config.apiUrl)

export default (props) => (
	<LayoutColumns isLoggedIn={client.isLoggedIn()} />
)