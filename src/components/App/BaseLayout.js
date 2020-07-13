import AlertManager from './AlertManager'

const BaseLayout = ({ children }) => <AlertManager>{children}</AlertManager>

export const useBaseLayout = () => (page) => <BaseLayout>{page}</BaseLayout>

export default BaseLayout
