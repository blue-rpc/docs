import {rpcAPI} from "./output"

export async function doSomethingWithUser (id : string) {
    const user = await rpcAPI.users.info.query({id})

    console.log(user.name, user.email, user.isMature);
    
}