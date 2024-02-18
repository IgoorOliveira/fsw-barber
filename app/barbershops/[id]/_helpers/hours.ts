import { addMinutes, setHours, setMinutes } from "date-fns"
import { format } from "date-fns/format";


export const generateDayTimeList = (date: Date): String[] => {
    const startTime = setMinutes(setHours(date, 9), 0);
    const endTime = setMinutes(setHours(date, 18), 0);
    const interval = 45;
    const timeList: String[] = []

    let currentTime = startTime;

    while(currentTime <= endTime) {
        timeList.push(format(currentTime, "HH:mm"));
        currentTime = addMinutes(currentTime, interval);
    }

    return timeList;

}