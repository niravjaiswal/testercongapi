import type { BunRequest } from 'bun'; 
import { parse } from 'node-html-parser';
import type { formatDiagnostics } from 'typescript';
import { XMLParser } from 'fast-xml-parser';
export default async function getSenateRollCall(req : BunRequest): Promise<Response> {
    let output = [] as any;
    


    return Response.json(output);
}