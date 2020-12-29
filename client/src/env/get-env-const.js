import devConst from './env-dev-const'
import prodConst from './env-prod-const'

export const getEnvConst = () => {
    if (process.env.NODE_ENV !== 'production') {
        return devConst
    } else {
        return prodConst
    }
}