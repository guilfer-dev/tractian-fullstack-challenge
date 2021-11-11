import bcrypt from "bcryptjs";

const hashData = async (data) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(data, salt);
    } catch (error) {
        throw new Error("Hashing failed", error);
    }
};
const compareData = async (inputData, hashedData) => {
    try {
        return await bcrypt.compare(inputData, hashedData);
    } catch (error) {
        throw new Error("Comparison failed", error);
    }
};

export { hashData, compareData }