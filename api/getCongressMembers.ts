//TODO: ADD FILTERS FOR MEMBER LIST

export default async function Handle(): Promise<Response> {
    let response1  = await fetch(`https://api.congress.gov/v3/member?api_key=${process.env.CONGRESS_API}&limit=250&currentMember=true&format=json`,{
        method: "GET",
    })
    let response2 = await fetch(`https://api.congress.gov/v3/member?api_key=${process.env.CONGRESS_API}&limit=250&currentMember=true&format=json&offset=250`,{
      method: "GET",
    })
    let response3 = await fetch(`https://api.congress.gov/v3/member?api_key=${process.env.CONGRESS_API}&limit=100&currentMember=true&format=json&offset=500`,{
      method: "GET",
    })
    let response1Json = await response1.json();
    let response2Json = await response2.json();
    let response3Json = await response3.json();
    // console.log(response1Json.members.length)
    // console.log(response2Json.members.length)
    // console.log(response3Json.members.length)

    let fullList = response1Json.members.concat(response2Json.members.concat(response3Json.members));
    
    return Response.json(
      fullList
    )
}
