/**
 * 현재 시간과 알람시간의 차이를 돌려줌
 */
import moment from "moment";

export const AlarmCheck = (time: string) => {
    let diff: number = null;
    if (time) {
        const currTime = moment(new Date())
        const savedTime = moment(time).startOf("minutes")
        diff = moment.duration(savedTime.diff(currTime)).asMilliseconds()
        if (diff < 0) {
            savedTime.add(1, "days")
        }
        diff = moment.duration(savedTime.diff(currTime)).asMilliseconds()
    }
    return diff
}