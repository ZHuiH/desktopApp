declare enum CHANNEL{
    COMMAND='command',
    DOCKER='docker',
    SETTING='setting'
}
type message={
    channel:string
}
interface Window {
    data:any
}
