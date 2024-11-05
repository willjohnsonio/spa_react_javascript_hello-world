const baseUrl = "dev-aggvwbxi.us.auth0.com";
const redirectUrl =
  "http://localhost:4040/callback";
// const redirectUrl = "https://air0.michaelswanson.me";
const authorizeParams =
  "/authorize?client_id=sXN5OQ8TFVqaZ6rw8Wdh8rgTTCCe6CBj&response_type=code&prompt=login&scope=openid%20profile&redirect_uri=";

const guestCheckoutData = {
  email: "mswanson%40atko.com",
  phone: "1-512-555-5555",
  given: "Everett",
  family: "Dietrich",
  dob: "1982-03-26",
};

let extParams = "";
Object.keys(guestCheckoutData).forEach((key) => {
  extParams += `&ext-${key}=${guestCheckoutData[key]}`;
});

export const loginUrl = `${baseUrl}${authorizeParams}${redirectUrl}`;
// export const signupUrl = `${baseUrl}${authorizeParams}${redirectUrl}&screen_hint=signup`;
export const signupUrl = `${baseUrl}${authorizeParams}${redirectUrl}&screen_hint=signup${extParams}`;