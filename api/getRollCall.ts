
//https://clerk.house.gov/evs/2025/roll102.xml
import type { BunRequest } from 'bun'; 
import { parse } from 'node-html-parser';
import type { formatDiagnostics } from 'typescript';
import { XMLParser } from 'fast-xml-parser';
export default async function getRollCall(req : BunRequest): Promise<Response> {
    const parser = new XMLParser();
    const { searchParams } = new URL(req.url);
    let Year = searchParams.get('Year');
    let RollNumber = searchParams.get('RollNumber');
    let tprom = await (await fetch(`https://clerk.house.gov/evs/${Year}/roll${RollNumber}.xml`))
    console.log(tprom)
    let parsedData = parser.parse(await tprom.text());
    let output = [] as any;
    let votes = parsedData["rollcall-vote"]["vote-data"]["recorded-vote"];
    for(let v of votes) {
        v["id"] = nameToId(v["legislator"])
        output.push(v);
    }
    return Response.json(output);
}
import type { HTMLElement } from 'node-html-parser';
import { nameToId } from '../lib/idUtils';

function getVotersFromTable(table: HTMLElement){
    let out = []
    let cols = Array.from(table.querySelectorAll("td"));

    for (let col of cols) {
        let text = col.innerText;
        console.log(text);
    }

}