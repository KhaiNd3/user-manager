const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();
const port = 3000;
const mongoConnect = require("../src/database").mongoConnect;// Just attach the function name to the variable
const index = require("./routing/index");
const authentication = require("./routing/authentication");
const passport = require("../src/passportconfig");
const userManagement = require("./routing/userManagement");
const statusManagement = require("./routing/statusManagement")

app.use(function (req, res, next) {
    if (!req.user)
        res.header(
            "Cache-Control",
            "private, no-cache, no-store, must-revalidate"
        );
    next();
});

app.use(
    session({
        secret: "mysupersecrect",
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 3600000 }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("views", [path.join(__dirname, "views"),path.join(__dirname, "views/user"), path.join(__dirname, "views/status")]);
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")))

app.use("/", authentication);

app.use("/", index);

app.use("/", statusManagement)

app.use("/user", userManagement);

mongoConnect(() => {
    app.listen(port);
});
