import type { BunRequest } from "bun";

import { parse } from 'node-html-parser';
const readData = Bun.file("./api/cIds.json").json()
export async function getFunding(request : BunRequest): Promise<Response> {
    let data : any = await readData ;
    let name = request.url.split("/").at(-1);
    let entry  = data.find((v: any) => v.lowerCasename == name || v.altKey == name);
    let res = await(await fetch(`https://www.opensecrets.org/members-of-congress/${name?.replaceAll(' ', '-' ).toLocaleLowerCase()}/summary?cid=${entry.id}`)).text();
    let html =  parse(res);
    let table = html.querySelectorAll("tbody");
    let contributors = table[1].querySelectorAll("tr");
    let out = [];
    for(let v of contributors) {
        let tds = v.querySelectorAll("td")

        let d = { 
          name: tds[0].innerText,
          total: tds[1].innerText,
          indv: tds[2].innerText,
          pac: tds[3].innerText,

        }

        out.push(d)
    }
    let types = table[3]
    let typesout = []
    for(let v of types.querySelectorAll("tr")){
        let tds = v.querySelectorAll("td");
        let d = {
            source: tds[0].innerHTML.trim(),
            amount: tds[1].innerText.trim(),
            percent: tds[2].innerText.trim()
        }
        typesout.push(d)
    }
    return Response.json({
        contributors: out,
        sources: typesout
    })
}