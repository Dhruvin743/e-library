const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const { userModel } = require("../schema/userschema");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const response = require("response-time");
const path = require("path");
// const uuidv6 = require("uuid").v6;
// const store = new session.MemoryStore();
const sessionModel = require("../schema/sessionSchema");
require("dotenv").config();

const router = express();

const {
	SESS_LIFETIME = 60 * 1000,
	NODE_ENV = "development",
	SESS_NAME = "libsid",
	SESS_SECRET = "my_deppest_sectet",
} = process.env;
const IN_PROD = NODE_ENV === "production";

mongoose.connect("mongodb://127.0.0.1:27017/librarydb").then(() => {
	console.log("dbconee");
});

router.use(response());
router.use(cookieParser());
router.use(bodyParser.raw());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

router.use(
	session({
		resave: false,
		saveUninitialized: false,
		name: SESS_NAME,
		secret: SESS_SECRET,
		cookie: {
			sameSite: "lax",
			maxAge: eval(SESS_LIFETIME),
			secure: IN_PROD,
		},
	})
);

const searchUserDB = async (req, res, next) => {
	let search = req.cookies[SESS_NAME];
	if (search) {
		search = String(search).split(".")[0].split(":")[1];
		const out = (await sessionModel.findOne({ [`uSess.${search}`]: { $exists: true } }, { _id: 0, uSess: 1 })) || {};
		if (out.uSess?.length) {
			const user = await userModel.findById({ _id: out.uSess[0][search] });
			try {
				const book = user.uBooks.find((v) => {
					if (v.book_id === req.params.find) {
						return v;
					}
				});
				if (book) {
					return res.send({ cached: 1, ...book._doc });
				}
				next();
			} catch (error) {
				console.log(error.message);
				next();
			}
		} else {
			res.send({ code: 1 });
		}
	} else {
		res.send({ code: 1 });
	}
};

const redirectToHome = async (req, res, next) => {
	let search = req.cookies[SESS_NAME];
	if (search) {
		search = String(search).split(".")[0].split(":")[1];
		const out = (await sessionModel.findOne({ [`uSess.${search}`]: { $exists: true } }, { _id: 0, uSess: 1 })) || {};
		if (!out.uSess?.length) {
			res.send({ code: 1 });
		} else {
			req.otherParm = out;
			req.search = search;
			next();
		}
	} else {
		res.send({ code: 1 });
	}
};

router.get("/logincheck", redirectToHome, (req, res) => {
	res.send({ code: 0 });
});

router.get("/getpdf", (req, res) => {
	let search = req.cookies[SESS_NAME];
	console.log(search);
	if (search) {
		const filepath = path.join(__dirname, "../public", "sample-3pp.pdf");
		res.status(200);
		res.sendFile(filepath);
	} else {
		res.status(403).send();
	}
});

router.post("/login", async (req, res) => {
	const data = { uEmail: req.body.email, uPass: req.body.pass };
	const out = await userModel.findOne(data);
	if (out) {
		// const sessionID = uuidv6();
		// sessions[sessionID] = { valid: true };
		// res.cookie("session", sessionID, { maxAge: 1000 * 30 });
		req.session.USERID = out._id;
		const obj = {};
		obj[req.sessionID] = req.session.USERID;
		let usession = new sessionModel();
		usession.uSess.push(obj);
		await usession.save();
		// res.set("Set-Cookie", `libid=${out._id}`);
		res.send({ code: 0, msg: "logged in " });
	} else {
		res.send({ code: 1 });
	}
});

router.post("/signup", async (req, res) => {
	const data = { uEmail: req.body.email, uPass: req.body.pass };
	const out = await userModel.findOne(data);
	if (out) {
		res.send({ code: 0 });
	} else {
		await userModel.create(data).then((_) => {
			res.send({ code: 1 });
		});
	}
});

router.get("/favoritebooks", redirectToHome, async (req, res) => {
	try {
		const data = await userModel.findById({ _id: req.otherParm.uSess[0][req.search] }, { uBooks: 1, _id: 0 });
		res.send({ data: data.uBooks.filter((v) => v.bIsFavorite) });
	} catch (error) {
		console.log(error.message);
		res.send({ code: 1 });
	}
});

router.get("/rentedbooks", redirectToHome, async (req, res) => {
	try {
		const data = await userModel.findById({ _id: req.otherParm.uSess[0][req.search] }, { uBooks: 1, _id: 0 });
		res.send({ data: data.uBooks.filter((v) => v.bIsRented) });
	} catch (error) {
		console.log(error.message);
		res.send({ code: 1 });
	}
});

router.get("/markedbookes", redirectToHome, async (req, res) => {
	try {
		const data = await userModel.findById({ _id: req.otherParm.uSess[0][req.search] }, { uBooks: 1, _id: 0 });
		res.send({ data: data.uBooks.filter((v) => v.bIsMarked) });
	} catch (error) {
		console.log(error.message);
		res.send({ code: 1 });
	}
});

router.get("/home", async (req, res) => {
	let search = req.cookies[SESS_NAME];
	if (search) {
		search = String(search).split(".")[0].split(":")[1];
		const out = (await sessionModel.findOne({ [`uSess.${search}`]: { $exists: true } })) || {};
		if (out) {
			try {
				fetch("https://openlibrary.org/trending/daily.json?limit=24&page=1")
					.then((data) => {
						return data.json();
					})
					.then((out) => {
						res.send({ code: 0, data: out.works });
					})
					.catch((err) => {
						console.log(err);
						res.end();
					});
			} catch (error) {
				console.log(error.message);
				return res.end();
			}
		} else {
			return res.send({ code: 1 });
		}
	} else {
		return res.send({ code: 1 });
	}
});

router.get("/logout", async (req, res) => {
	let search = req.cookies[SESS_NAME];
	if (search) {
		search = String(search).split(".")[0].split(":")[1];
		const out = (await sessionModel.findOne({ [`uSess.${search}`]: { $exists: true } })) || {};
		if (out) {
			await sessionModel.deleteOne(out);
			res.cookie(`${SESS_NAME}`, "", { sameSite: "lax", maxAge: 0 });
		}
	}
	res.send({ code: 1 });
});

router.get("/getbook/:find", searchUserDB, async (req, res) => {
	const data = await fetch(`https://openlibrary.org/works/${req.params.find}.json`);
	const out = await data.json();
	res.send({ cached: 0, ...out });
});

router.get("/search/:find", async (req, res) => {
	if (req.cookies.libid) {
		try {
			const searchStr = req.params.find.replaceAll(" ", "+");
			const data = await fetch(`https://openlibrary.org/search.json?q=${searchStr}&limit=12`);
			const out = await data.json();
			res.send({ code: 0, data: out.docs });
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	} else {
		res.send({ code: 1 });
	}
});

router.post("/favorite", async (req, res) => {
	console.log("favoooo");
	let search = req.cookies[SESS_NAME];
	if (search) {
		search = String(search).split(".")[0].split(":")[1];
		const userid = (await sessionModel.findOne({ [`uSess.${search}`]: { $exists: true } }, { _id: 0, uSess: 1 })) || {};
		if (userid.uSess?.length) {
			const user = await userModel.findById({ _id: userid.uSess[0][search] });
			const out = user.uBooks.filter((v, i) => v.bTitle === req.body.title);
			if (out.length) {
				out[0].bIsFavorite = !user.uBooks.find((v) => v.bTitle === req.body.title).bIsFavorite;
				user.uBooks.set(
					user.uBooks.findIndex((v) => v.bTitle === out[0].bTitle),
					out[0]
				);
				await user.save();
				res.send({ code: 0, bIsFavorite: out[0].bIsFavorite });
			} else {
				user.uBooks.push({
					book_id: req.body.bookid,
					bCover: req.body.cover ? [req.body.cover] : [],
					bDescription: req.body.desc,
					bTitle: req.body.title,
					bIsFavorite: true,
				});
				await user.save();
				return res.send({ code: 0, bIsFavorite: true });
			}
		} else {
			res.send({ code: 1 });
		}
	} else {
		res.send({ code: 1 });
	}
});

router.post("/borrow", async (req, res) => {
	let search = req.cookies[SESS_NAME];
	if (search) {
		search = String(search).split(".")[0].split(":")[1];
		const userid = (await sessionModel.findOne({ [`uSess.${search}`]: { $exists: true } }, { _id: 0, uSess: 1 })) || {};
		if (userid.uSess?.length) {
			const user = await userModel.findById({ _id: userid.uSess[0][search] });
			const out = user.uBooks.filter((v) => v.bTitle === req.body.title);
			if (out.length) {
				out[0].bIsRented = !user.uBooks.find((v) => v.bTitle === req.body.title).bIsRented;
				user.uBooks.set(
					user.uBooks.findIndex((v) => v.bTitle === out[0].bTitle),
					out[0]
				);
				await user.save();
				return res.send({ code: 0, bIsRented: out[0].bIsRented });
			} else {
				user.uBooks.push({
					book_id: req.body.bookid,
					bCover: req.body.cover ? [req.body.cover] : [],
					bDescription: req.body.desc,
					bTitle: req.body.title,
					bIsRented: true,
				});
				await user.save();
				return res.send({ code: 0, bIsRented: true });
			}
		} else {
			res.send({ code: 1 });
		}
	} else {
		res.send({ code: 1 });
	}
});

router.post("/bookmark", async (req, res) => {
	let search = req.cookies[SESS_NAME];
	if (search) {
		search = String(search).split(".")[0].split(":")[1];
		const userid = (await sessionModel.findOne({ [`uSess.${search}`]: { $exists: true } }, { _id: 0, uSess: 1 })) || {};
		if (userid.uSess?.length) {
			const user = await userModel.findById({ _id: userid.uSess[0][search] });
			const out = user.uBooks.filter((v) => v.bTitle === req.body.title);
			if (out.length) {
				out[0].bIsMarked = !user.uBooks.find((v) => v.bTitle === req.body.title).bIsMarked;
				user.uBooks.set(
					user.uBooks.findIndex((v) => v.bTitle === out[0].bTitle),
					out[0]
				);
				await user.save();
				return res.send({ code: 0, bIsMarked: out[0].bIsMarked });
			} else {
				user.uBooks.push({
					book_id: req.body.bookid,
					bCover: req.body.cover ? [req.body.cover] : [],
					bDescription: req.body.desc,
					bTitle: req.body.title,
					bIsMarked: true,
				});
				await user.save();
				return res.send({ code: 0, bIsMarked: true });
			}
		} else {
			res.send({ code: 1 });
		}
	} else {
		res.send({ code: 1 });
	}
});

module.exports = router;
