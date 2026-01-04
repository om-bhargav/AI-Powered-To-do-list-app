import { prisma } from "../db/db.js";
import { GetResult } from "../gemini-client/GetResult.js";
export async function addItem(req, res) {
    const { userid, taskName } = req.body;
    const item = await prisma.item.create({
        data: {
            task: taskName,
            userid: userid
        }
    });
    console.log(item);
    return res.status(200).json({
        success: true,
        message: "Task Added!",
        task: item
    });
}
export async function removeItem(req, res) {
    const { id, userid } = req.body;
    await prisma.item.delete({
        where: {
            id: id,
            userid: userid
        }
    });
    return res.status(200).json({
        success: true,
        message: "Task Removed!",
    });
}
export async function updateItem(req, res) {
    const { id, userid, data } = req.body;
    await prisma.item.update({
        where: {
            id: id,
            userid: userid
        },
        data: data
    });
    return res.status(200).json({
        success: true,
        message: "Task Updated!",
    });
}
export async function fetchItems(req, res) {
    const { userid } = req.body;
    const items = await prisma.item.findMany({
        where: {
            userid: userid
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return res.status(200).json({
        success: true,
        message: "items Fetched",
        data: items
    });
}
export async function tasksFromAI(req, res) {
    const { summary } = req.body;
    const result = await GetResult(summary);
    return res.status(200).json({ success: true, data: result });
}
