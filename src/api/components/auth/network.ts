import { Router } from "express";
import Controller from ".";
import config from "../../../config";
import passport from '../../passport'

const router = Router()

router.get("/", Controller.register)

router.get("/login/success", Controller.loginSucces);


router.get("/login/failed", Controller.loginFailed);


router.get("/google", passport.authenticate('google', { scope: ["profile"] }))

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: `${config.front.URL}`,
        failureRedirect: "/login/failed",
        failureMessage: true,
        
    })
);

router.get("/logout", (req, res, next) => {
    req.logout((e) => {
        if(e) {
            return next(e)
        }
    })
    res.redirect(`${config.front.URL}`);
});

export default router