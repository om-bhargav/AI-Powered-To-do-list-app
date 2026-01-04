import bcrypt from "bcrypt";

async function hashPassword(password:string){
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password,salt);
    return pass;
}
async function comparePassword(currentPassword:string,enteredPassword:string){
    return (await bcrypt.compare(currentPassword,enteredPassword));
}

export {hashPassword,comparePassword};