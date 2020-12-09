import  ls from "./ls"

type shell={
    [shell:string]:commandFlatform
}
var shellMap:shell = {
    'ls':ls
}

export default shellMap