import './style.css'
import showMap from "./map";
import {fetchIpAPI, fetchResult} from './ipAPI';

const ipPara = document.querySelector('.ip-address > p') as HTMLParagraphElement;
const locationPara = document.querySelector('.location > p') as HTMLParagraphElement;
const timezonePara = document.querySelector('.timezone > p') as HTMLParagraphElement;
const ispPara = document.querySelector('.isp > p') as HTMLParagraphElement;

getIp().catch((e) => alert(`${e}, if problems persit , please refresh the website`));

document.querySelector("button")?.addEventListener('click', () => {
    getIp().catch((e) => alert(`${e}, if problems persit , please refresh the website`));
});


async function getIp() {
    const result = await fetchIpAPI();
    const castedResult = result as fetchResult;

    ipPara.textContent = castedResult.ip;
    locationPara.textContent = `${castedResult.country}
    ${castedResult.regionName} ${castedResult.city}
    ${castedResult.zip}`;
    timezonePara.textContent = castedResult.timezone;
    ispPara.textContent = castedResult.isp;

    showMap(castedResult.lat, castedResult.lon);
}