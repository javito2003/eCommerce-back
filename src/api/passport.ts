import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import passport from 'passport'
import config from '../config'
import axios from 'axios'
import { IResponse } from '../network/response'
import { IUserEntity } from '../models/IUser'
import * as auth from '../auth'



passport.use(new GoogleStrategy({
    clientID: config.passportGoogle.clientID,
    clientSecret: config.passportGoogle.clientSecret,
    callbackURL: config.passportGoogle.callbackURL
}, async function verify(accessToken, refreshToken, profile, cb) {
    let toSend = {
        username: profile.displayName,
        subject: profile.id,
        origin: profile.provider
    }
    try {
        let { data } = await axios.post<IResponse<IUserEntity>>(`${config.api_db.URL}/user/create`, toSend)        
        let user = data.body
        let toReturn = {
            userId: user.Id,
            token: auth.sign(user.Id)
        }
        cb(null, toReturn)

    } catch (error) {
        cb("Error to login", undefined)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user as any) // revisar aca
})

export default passport