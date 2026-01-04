import bcrypt, { compare, genSalt,hash } from "bcrypt";

export async function hashPassword(password:string){
      const salt = await genSalt(10);
      const hashedPassword = await hash(password,salt);
      return hashedPassword;
}

export async function comparePassword(enteredPassword:string,currentPassword:string){
    return (await compare(enteredPassword,currentPassword));
}