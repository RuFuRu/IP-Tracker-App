const input = document.querySelector("#search-ip") as HTMLInputElement;

interface jsonResponse {
  "ip": string,
  "network": string,
  "version": string,
  "city": string,
  "region": string,
  "region_code": string,
  "country": string,
  "country_name": string,
  "country_code": string,
  "country_code_iso3": string,
  "country_capital": string,
  "country_tld": string,
  "continent_code": string,
  "in_eu": boolean,
  "postal": string,
  "latitude": number,
  "longitude": number,
  "timezone": string,
  "utc_offset": string,
  "country_calling_code": string,
  "currency": string,
  "currency_name": string,
  "languages": string,
  "country_area": number,
  "country_population": number,
  "asn": string,
  "org": string
}

export interface fetchResult {
  ip: string,
  country: string,
  regionName: string,
  city: string,
  zip: string,
  timezone: string,
  isp: string,
  lat: number,
  lon: number
}

export async function fetchIpAPI(): Promise<fetchResult | void> {
    const searchedValue = input.value;
    if(searchedValue === '') {
      const response = await fetch('https://ipapi.co/json/');
      const json: jsonResponse = await response.json();
      return {
        ip: json.ip,
        country: json.country_name,
        regionName: json.region,
        city: json.city,
        zip: json.postal,
        timezone: json.timezone,
        isp: json.org,
        lat: json.latitude,
        lon: json.longitude
      };
    }
    
    if(!isIpv4Correct(searchedValue).isItCorrect) {
      if(!isIpv6Correct(searchedValue).isItCorrect) {
        return alert("Bad input!");
      }
    }

    const response = await fetch(`https://ipapi.co/${searchedValue}/json/`);
    const json: jsonResponse = await response.json();
    
    return {
      ip: json.ip,
      country: json.country,
      regionName: json.country_name,
      city: json.city,
      zip: json.postal,
      timezone: json.timezone,
      isp: json.org,
      lat: json.latitude,
      lon: json.longitude
    };
}



interface isIpCorrect {
  isItCorrect: boolean,
}

function isIpv4Correct(input: string): isIpCorrect {
  const ipv4regex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/gi;
  if(!ipv4regex.test(input)) {
      return {
        isItCorrect: false,
      }
  };

  const arr = input.split(".")
  for(let i = 0; i < arr.length; i++) {
    if(parseInt(arr[i]) >= 255 && parseInt(arr[0]) > 0) {
      return {
        isItCorrect: false,
      }
    }
  }

  return {
    isItCorrect: true
  }
}


function isIpv6Correct(input: string): isIpCorrect {
  const ipv6regex = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  if(!ipv6regex.test(input)) {
    return {
      isItCorrect: false,
    }
  }

  return {
    isItCorrect: true
  }
}