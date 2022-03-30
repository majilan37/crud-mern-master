import jwt from "jsonwebtoken";
// Generate JWT
function generateJWT(id: string): string {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
}
