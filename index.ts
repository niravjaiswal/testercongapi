import GetBill from "./api/getBills"
import Handle from "./api/getCongressMembers"
import GetHouseBills from "./api/getHouseBills"
import GetMemberInfo from "./api/getMemberInfo"

import getRollCall from "./api/getRollCall"
import getUserData from "./api/user/getUserData"
import login from "./api/user/login"
import register from "./api/user/register"
import GetSenateBills from "./api/getSenateBills"
import "./db/db"
import { consrtuctTable } from "./lib/idUtils"
import { getFunding } from "./api/getFunding"
//CONGRESS_API


console.log("Starting")
consrtuctTable();
Bun.serve({
    routes: {
        "/getFunding/:id" : getFunding,
        "/getBio/:id" : async ( id: Request) => {
           let data = await (await fetch(`https://bioguide.congress.gov/search/bio/${id.url.split("/").at(-1)}.json`, {
        })).json()
            return  Response.json(data);
        },
        "/getCongress" : Handle,
        "/getHouseBills": GetHouseBills,
        "/getSenateBills":GetSenateBills,
        "/getMemberInfo/:id" : GetMemberInfo,
        "/getBills" : GetBill,
        "/user/register": register,
        "/user/login": login,
        "/getRollCall": getRollCall,
        "/test": (_)=> {
            return new Response(Bun.file("./test.html"))
        },
        "/user/getUserData": getUserData,

    },
    fetch: (req) => {
        req.headers.set('Access-Control-Allow-Origin', '*');
        req.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        return new Response("404")
    }
})