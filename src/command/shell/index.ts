import  ls from "./ls"
import  docker from "./docker"

type shell={
    [shell:string]:commandFlatform
}
var shellMap:shell = {
    'ls':ls,
    'docker':docker,
}

export default shellMap