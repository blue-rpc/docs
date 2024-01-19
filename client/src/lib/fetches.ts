import { rpcAPI } from "@/API";

export async function sendUserMessage (name: string, message: string) {
    return await rpcAPI.users.greet.query({name})
}