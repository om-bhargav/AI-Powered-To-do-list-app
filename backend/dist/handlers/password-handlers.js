import { compare, genSalt, hash } from "bcrypt";
export async function hashPassword(password) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
}
export async function comparePassword(enteredPassword, currentPassword) {
    return (await compare(enteredPassword, currentPassword));
}
