const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const app = express();
const session = require("express-session");
const flush = require("connect-flash");

const shortId = require("shortid");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flush());

app.get("/", async (req, res) => {
  console.log("request recieved");
  let shortUrls;
  try {
    await mongoose.connect(
      process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/urlShortener",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    shortUrls = await ShortUrl.find();
  } catch (err) {
    console.log("error");
    console.error(err);
  }
  res.render("index", {
    shortUrls: shortUrls,
    message: req.flash("message"),
    prevData: { fullUrl: req.flash("fullUrl"), slug: req.flash("slug") },
  });
});

app.post("/shorten", async (req, res) => {
  if (!req.body.fullUrl) {
    req.flash("message", "fullUrl is Required!");
    res.redirect("/");
    return;
  }

  if (!validURL(req.body.fullUrl)) {
    req.flash("message", "fullUrl is invalid! Please provide valid URL");
    res.redirect("/");
    return;
  }

  let slug = req.body.slug;
  if (slug) {
    let shortUrl = await ShortUrl.findOne({ shortUrl: slug });
    if (shortUrl != null) {
      req.flash("message", "Slug already Exists");
      req.flash("fullUrl", req.body.fullUrl);
      req.flash("slug", slug);
      res.redirect("/");
      return;
    }
  }

  if (!slug) {
    slug = await generateSlug();
  }

  await createShortUrl(req.body.fullUrl, slug);
  res.redirect("/");
});

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

const generateSlug = async () => {
  let slug = null,
    shortUrl = null;
  do {
    slug = shortId.generate();
    shortUrl = await ShortUrl.findOne({ shortUrl: slug });
  } while (shortUrl != null);

  return slug;
};

const createShortUrl = async (fullUrl, slug) => {
  await ShortUrl.create({ fullUrl: fullUrl, shortUrl: slug });
};

app.get("/:slug", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.slug });
  if (shortUrl == null) {
    return res.sendStatus(404);
  }

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.fullUrl);
});

app.listen(process.env.PORT || 5000);
