
import React, { Component } from 'react';

export const APPLICATION_KEY = "DfumPgZWQYQZ989YoUJg0GmkOYxPE5V2";
export const KAVIMO_ACCESS_TOKEN = "NQ7SaXAVvEgB78uxzkbLCPLLm6KkQ_LD";
export const API_TIMEOUT = 20000;//miliseconds

// export const HEADER_BRAND_COLOR  = '#00BCD4';
// export const FOOTER_BRAND_COLOR  = '#00BCD4';
// export const CONTENT_BRAND_COLOR = '#ecf0f1'; 
// export const BUTTONT_BRAND_COLOR = '#2980b9'; 

export const BRAND_COLOR_1  = '#00BCD4';
export const BRAND_COLOR_2  = '#ecf0f1'; 
export const BRAND_COLOR_3  = '#273c75'; 

export const secondsToHms = (d) => {
     d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ?  ("0" + h).slice(-2) + ':' : '00:';
    var mDisplay = m > 0 ?  ("0" + m).slice(-2) + ':' : '00:';
    var sDisplay = s > 0 ?  ("0" + s).slice(-2)  : '00';
    return hDisplay + mDisplay + sDisplay; 
}

