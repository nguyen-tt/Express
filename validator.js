const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;
    const errors = [];

    if (title == null) {
      errors.push({ field: "title", message: "This field is required" });
    } else if (title.length >= 255) {
        errors.push({ field: "title", message: "Should contain less than 255 characters" });
    }
    if (director == null) {
      errors.push({ field: "director", message: "This field is required" });
    } else if (director.length >= 255) {
      errors.push({ field: "director", message: "Should contain less than 255 characters" });
    }
    if (year == null) {
      errors.push({ field: "year", message: "This field is required" });
    } else if (year.length >= 255) {
      errors.push({ field: "year", message: "Should contain less than 255 characters" });
    }
    if (color == null) {
      errors.push({ field: "color", message: "This field is required" });
    } else if (color.length >= 255) {
      errors.push({ field: "color", message: "Should contain less than 255 characters" });
    } else if (color != "1" && color != "0") {
      errors.push({ field: "color", message: "Should contain 0 or 1"});
    }
    if (duration == null) {
      errors.push({ field: "duration", message: "This field is required" });
    } else if (isNaN(duration)) {
      errors.push({ field: "duration", message: "This field required a number"})
    }
   
    if (errors.length) {
      res.status(422).json({ validationErrors: errors });
    } else {
      next();
    }
};


const validateUser = (req, res, next) => {
    const { firstname, lastname, email, city, language, password } = req.body;
    const errors = [];
    const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

    if (firstname == null) {
      errors.push({ field: "firstname", message: "This field is required" });
    } else if (firstname.length >= 255) {
        errors.push({ field: "firstname", message: "Should contain less than 255 characters" });
    }
    if (lastname == null) {
      errors.push({ field: "lastname", message: "This field is required" });
    } else if (lastname.length >= 255) {
        errors.push({ field: "lastname", message: "Should contain less than 255 characters" });
    }
    if (email == null) {
      errors.push({ field: "email", message: "This field is required" });
    } else if (email.length >= 255) {
        errors.push({ field: "email", message: "Should contain less than 255 characters" });
    } else if (!emailRegex.test(email)) {
        errors.push({ field: 'email', message: 'Invalid email' });
    }
    if (city.length >= 255) {
      errors.push({ field: "city", message: "Should contain less than 255 characters" });
    }
    if (language.length >= 255) {
      errors.push({ field: "language", message: "Should contain less than 255 characters" });
    }
    if (password.length >= 255) {
      errors.push({field: "Password", message: "Should contain less than 255 characters" });
    }
   
    if (errors.length) {
      res.status(422).json({ validationErrors: errors });
    } else {
      next();
    }
};



module.exports = {
    validateMovie,
    validateUser,
};