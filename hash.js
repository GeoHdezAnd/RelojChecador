import { hash } from 'bcrypt';

async function generateHash(password) {
    const saltRounds = 10;
    try {
        const hashedPassword = await hash(password, saltRounds);
        console.log("Hashed password:", hashedPassword);
    } catch (error) {
        console.error("Error generating hash:", error);
    }
}

generateHash("superAdmin");