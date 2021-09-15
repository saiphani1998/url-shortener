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

mongoose.connect(
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/urlShortener",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    app.get("/", handleGetRequest);
    app.post("/shorten", handleShortenRequest);
    app.get("/:slug", handleSlugRequest);
  }
);

const handleGetRequest = async (req, res) => {
  let shortUrls, message;
  try {
    shortUrls = await getAllShortUrls();
  } catch (err) {
    console.error(err);
    message = "Something went wrong!";
  }
  res.render("index", {
    shortUrls: shortUrls || [],
    message: message || req.flash("message"),
    prevData: { fullUrl: req.flash("fullUrl"), slug: req.flash("slug") },
  });
};

const handleShortenRequest = async (req, res) => {
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

  console.log(req.body.slug);
  if (!validSlug(req.body.slug)) {
    req.flash(
      "message",
      "Slug should contain only alphanumeric and _@./+- characters"
    );
    req.flash("fullUrl", req.body.fullUrl);
    req.flash("slug", req.body.slug);
    res.redirect("/");
    return;
  }

  try {
    let slug = req.body.slug;
    if (slug) {
      let shortUrl = await getShortUrlBySlug({ slug });
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

    let createdShortUrl = await createShortUrl({
      fullUrl: req.body.fullUrl,
      slug,
    });

    res.render("success", {
      shortUrl: createdShortUrl.shortUrl,
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const handleSlugRequest = async (req, res) => {
  try {
    const shortUrl = await getShortUrlBySlug({ slug: req.params.slug });
    if (shortUrl == null) {
      return res.sendStatus(404);
    }

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.fullUrl);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const validURL = (str) => {
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
};

const validSlug = (str) => {
  var pattern = new RegExp("^[A-Za-z0-9_@./+-]*$");
  return !!pattern.test(str);
};

const generateSlug = async () => {
  let slug = null,
    shortUrl = null;
  do {
    slug = shortId.generate();
    shortUrl = await getShortUrlBySlug({ slug });
  } while (shortUrl != null);

  return slug;
};

const getAllShortUrls = async () => {
  let shortUrls = await ShortUrl.find();
  return shortUrls;
};

const getShortUrlBySlug = async ({ slug }) => {
  let shortUrl = await ShortUrl.findOne({ shortUrl: slug });
  return shortUrl;
};

const createShortUrl = async ({ fullUrl, slug }) => {
  return await ShortUrl.create({ fullUrl: fullUrl, shortUrl: slug });
};

app.listen(process.env.PORT || 5000);
