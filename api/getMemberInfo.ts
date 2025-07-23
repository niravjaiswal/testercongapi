import { MakeRequest } from "../lib/helpers"

export interface GetMemberInfo {
    data: Data
  }
  
  export interface Data {
    member: Member
    request: RequestData
  }
  
  export interface Member {
    bioguideId: string
    birthYear: string
    cosponsoredLegislation: CosponsoredLegislation
    currentMember: boolean
    deathYear: string
    depiction: Depiction
    directOrderName: string
    district: number
    firstName: string
    invertedOrderName: string
    lastName: string
    middleName: string
    partyHistory: PartyHistory[]
    sponsoredLegislation: SponsoredLegislation
    state: string
    terms: Term[]
    updateDate: string
  }
  
  export interface CosponsoredLegislation {
    count: number
    url: string
  }
  
  export interface Depiction {
    attribution: string
    imageUrl: string
  }
  
  export interface PartyHistory {
    partyAbbreviation: string
    partyName: string
    startYear: number
  }
  
  export interface SponsoredLegislation {
    count: number
    url: string
  }
  
  export interface Term {
    chamber: string
    congress: number
    district: number
    endYear: number
    memberType: string
    startYear: number
    stateCode: string
    stateName: string
  }
  
  export interface RequestData {
    bioguideId: string
    contentType: string
    format: string
  }
  

export default async function GetMemberInfo(req : Request): Promise<Response> {
    let id = req.url.split("/").pop()
    let b = await fetch(`https://api.congress.gov/v3/member/${id}?api_key=${process.env.CONGRESS_API}&format=json`, {
        method: "GET",
    })
    let out : Data = (await b.json());
    let allsponsored = await MakeRequest( out.member.cosponsoredLegislation.url , {});
    console.log(allsponsored)
    allsponsored.sponsoredLegislation = (await MakeRequest( out.member.sponsoredLegislation.url , {})).sponsoredLegislation;
    console.log(allsponsored)
    return Response.json({
        data: out,
        legislation: allsponsored,
    })
}

