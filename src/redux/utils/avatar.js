import Chance from 'chance'

const chance = new Chance()
chance.avatar()
chance.avatar({protocol: 'https'})
chance.avatar({fileExtension: 'jpg'})
chance.avatar({email: 'mail@victorquinn.com'})
export default chance.avatar()