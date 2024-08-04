const createUserValidationSchema = {
  first_name: {
    isLength: {
      options: {
        min: 5,
        max: 16,
      },
      errorMessage: "The length must be minimum 5 and max 16 character long.",
    },
    notEmpty: {
      errorMessage: "This cannot be empty",
    },
    isString: {
      errorMessage: "firstName must be string",
    },
  },
  last_name : {
    notEmpty : true,
  }
};

module.exports = {createUserValidationSchema};
