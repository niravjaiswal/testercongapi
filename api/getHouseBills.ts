import type { BunRequest } from "bun";
import { MakeRequest } from "../lib/helpers";
import { parse } from 'node-html-parser';
export default async function GetHouseBills(req : BunRequest): Promise<Response> {
    let output = [] as any
    for(let i = 1; i <= 10; i ++){
        let data = await fetch(`https://clerk.house.gov/Votes/MemberVotes?page=${i}`)
        let dom = parse(await data.text()); 
        for(let div of dom.querySelectorAll(".role-call-vote")){
            let additon = {} as any
            additon["Roll"] = div.querySelectorAll("a").filter((e) => {
                return e.getAttribute("aria-label")?.includes("Roll")
            })[0].attributes.href
            let d = additon["Roll"].split("/")[2];
            additon["Year"] = d.substring(0,4);
            additon["RollNumber"] = d.substring(4, d.indexOf("?"))
            let billlink = additon["Bill"] = div.querySelectorAll("a").filter((e) => {
                return e.getAttribute("aria-label")?.includes("bill")
            })[0].attributes.href
            additon["BillLink"] = billlink
            let split = billlink.split("/");
            additon["Congress"] =  split[4];
            additon["BillType"] = split[5];
            additon["Bill"] = split[6];
            for(let subdib of div.querySelectorAll(".roll-call-description")) {
                let v = subdib.text.split(":")[0].split(" ")
                additon[v[v.length -1]] = subdib.text.split(":")[1]
            }
            output.push(additon);
        }
    }
    return Response.json(output) as any
}
