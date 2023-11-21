import { Snapshot } from "../lib/types/snapshot";
import moment from "moment";

export default function Timeline({currentTime, duration}:{currentTime:number, duration:number}){


  return <><input className="w-full" min="0" value={currentTime} max={duration.toString()} type="range"></input>current: {moment(currentTime).format('mm:ss')} duration: {moment(duration).format('mm:ss')}</>
}