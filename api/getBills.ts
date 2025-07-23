import { MakeRequest } from "../lib/helpers";


export default async function GetBill(): Promise<Response> {
    return Response.json(await MakeRequest("/bill", {
        limit: "250"
    }));
}
