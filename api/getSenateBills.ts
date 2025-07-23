import type { BunRequest } from "bun";
import { MakeRequest } from "../lib/helpers";
import { parse } from 'node-html-parser';
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");

const parser = new XMLParser();

export default async function GetSenateBills(req : BunRequest): Promise<Response> {
  
    const { searchParams } = new URL(req.url);
    let Congress = searchParams.get('Congress');
    let Session = searchParams.get('Session');
    let data = await fetch(`https://www.senate.gov/legislative/LIS/roll_call_lists/vote_menu_${Congress}_${Session}.xml`)
    let parsedData = parser.parse(await data.text());
    let output = [] as any
    let votes = parsedData.vote_summary.votes.vote;
    votes.forEach((vote:any) => {
        let addition = {} as any;
        
        let vote_number = vote.vote_number.toString();
        for (let i = 0; i < 5 - vote.vote_number.toString().length; i++) {
            vote_number = "0" + vote_number;
            
        }
        addition["RollNumber"] = vote_number;
        addition["Question"] = vote.question;
        if (vote.question["#text"]){
            addition["Question"] = vote.question["#text"];
        }
        addition["Status"]= vote.result;
        addition["Description"] = vote.title;
        addition["Type"] = vote.issue;
        addition["Congress"] = parsedData.vote_summary.congress;
        addition["Year"] = parsedData.vote_summary.congress_year;
        output.push(addition)
    });
    return Response.json(output);
}