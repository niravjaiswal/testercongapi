
const data = Bun.file("./api/cIds.json").json() as any
var newdata = []
for(let v of await data) {
    let name = v.name;
    let newkey = name?.replaceAll(' ', '-' ).toLocaleLowerCase();
    
    let altKey = newkey.split('-')[0] + '-' + newkey.split('-').at(-1)
    newdata.push({
        name: name,
        lowerCasename: newkey,
        altKey: altKey,
        id: v.id,
    })

}
Bun.file("./api/cIds.json").write(JSON.stringify(newdata));