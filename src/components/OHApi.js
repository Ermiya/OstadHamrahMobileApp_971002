import React, { Component } from 'react';
import * as Common from './Common';

var jwt_decode = require('jwt-decode');

//-------------------------------------
//const BASE_URL = 'http://5.160.65.115/api/';
//const BASE_URL = 'http://www.nikatarh.com/api/'; 
const BASE_URL = 'http://www.daneshgahhamrah.com/api/'; 
//const BASE_URL = 'http://localhost:49973/api/'; 


const VERIFICATION_URL = BASE_URL + 'verify/VerifyMobileNo';
const AUTHENTICATE_URL = BASE_URL + 'Authenticate';
const REGISTER_URL = BASE_URL + 'user/register';
const FAVORITE = BASE_URL + 'favorite';
const ONUSERFAVORITE =  BASE_URL + 'favorite/OnUserFavorite';
const OFFUSERFAVORITE = BASE_URL + 'favorite/OffUserFavorite'
const PAGEDVIDEOLIST  = BASE_URL + 'lesson/GetPagedVideoList';
const LIKECONTENT = BASE_URL + 'lesson/LikeContent';
const DISLIKECONTENT = BASE_URL + 'lesson/dislikeContent';
// ---- KAVIMO -------------------------
const BASE_KAVIMO_URL = 'https://kavimo.com/api/v1/';
const AUTHENTICATE_KAVIMO_URL = BASE_KAVIMO_URL + 'auth/?access-token=' + Common.KAVIMO_ACCESS_TOKEN;
const MEDIA_KAVIMO_URL = BASE_KAVIMO_URL + 'medias/?access-token='      + Common.KAVIMO_ACCESS_TOKEN;
//---------------------------------------
export const getVerifyCode = async (anonymousToken, mobileNo) => {
  try {
    const response = await fetch(VERIFICATION_URL, {
      timeout: Common.API_TIMEOUT,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonymousToken}` 
      },
      body: JSON.stringify({
         MobileNo: mobileNo,
      }),
    });

    const json = await response.json();
    console.log('verify json : ');
    console.log(json);

    return json;
  } catch (error) {
    console.log('OHApi_Component catch getVerifyCode method : : ');
    console.log(error);
    throw error;
  }
}
//---------
export const getAuthenticateAnonymousToken = async (mobileNo) => {
  try {
    const response = await fetch(AUTHENTICATE_URL, {
      timeout: Common.API_TIMEOUT,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: Common.APPLICATION_KEY,
        MobileNo: mobileNo,
      }),
    });

    const json = await response.json();
    console.log('anonymous authenticate json : ');
    console.log(json);

    return json;
  } catch (error) {
    console.log('OHApi_Component catch getAuthenticateAnonymousToken method : ');
    console.log(error);
    throw error;
  }
}
//---------
export const getAuthenticateToken = async (anonymousToken, mobileNo) => {
  try {
    console.log('SAMAN : ');
    console.log(anonymousToken);
    
    const response = await fetch(REGISTER_URL, {
      timeout: Common.API_TIMEOUT,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonymousToken}` 
      },
      body: JSON.stringify({
        MobileNo: mobileNo,
      }),
    });

    const json = await response.json();
    console.log('main authenticate json : ');
    console.log(json);

    return json;
  } catch (error) {
    console.log('OHApi_Component catch getAuthenticateToken method : ');
    console.log(error);
    throw error;
  }
}
//---------
export const getKavimoAuthenticate = async () => {
  try {
    console.log('kavimo authenticate : ' + AUTHENTICATE_KAVIMO_URL);
    const response = await fetch(AUTHENTICATE_KAVIMO_URL, {
      timeout: Common.API_TIMEOUT,
    });
    const json = await response.json();
    console.log('kavimo auth json : ');
    console.log(json);

    return json;
  } catch (error) {
    console.log('OHApi_Component catch getKavimoAuthenticate method : ');
    console.log(error);
    throw error;
  }
}
//----------
export const getKavimoMedia = async (media_id) => {
  try {
    const response = await fetch(MEDIA_KAVIMO_URL, {
      timeout: Common.API_TIMEOUT,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': 'http://www.ostadhamrah.com',
        'User-Agent': 'MY-UA-STRING',
        'Accept-Language': 'en-US',
      },
      body: JSON.stringify({
        media_id: media_id,
      }),
    });

    const json = await response.json();
    console.log('getKavimoMedia json : ');
    console.log(json);

    return json;
  } catch (error) {
    console.log('OHApi_Component catch getAuthenticateToken method : ');
    console.log(error);
    throw error;
  }
}
//----------
export const getFavoriteList = async (userToken) => {
  try {
    console.log(FAVORITE);
    console.log(userToken);

    console.log("Bearer " + userToken.replace('"','').replace('"',''));

    const response = await fetch(FAVORITE, {
      timeout: Common.API_TIMEOUT,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':  "Bearer " + userToken.replace('"','').replace('"','') // `Bearer ${userToken}`
      }
    });

    const json = await response.json();
    console.log('favorite list json : ');
    console.log(json);

    return json;
  } catch (error) {
    console.log('OHApi_Component catch getFavoriteList method : ');
    console.log(error);
    throw error;
  }
}
//---------
export const onUserFavorite = async (favoriteId,userToken) => {
    try {
    console.log('onUserFavorite userToken passed : '+userToken);
    const decoded = jwt_decode(userToken);
    console.log('userToken Decode is : ');
    console.log(decoded);

    const response = await fetch(ONUSERFAVORITE, {
      timeout: Common.API_TIMEOUT,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + userToken.replace('"','').replace('"','')
      },
      body: JSON.stringify({
        UserId: decoded.nameid,
        FavoriteId:favoriteId
      }),
    });

    const json = await response.json();
    console.log('onUserFavorite json : ');
    console.log(json);

    return json;
  } catch (error) {
    console.log('OHApi_Component catch onUserFavorite method : ');
    console.log(error);
    throw error;
  }
}
//---------
export const offUserFavorite = async (favoriteId,userToken) => {
    try {
    const decoded = jwt_decode(userToken);
    console.log('userToken Decode is : ');
    console.log(decoded);

    const response = await fetch(OFFUSERFAVORITE, {
      timeout: Common.API_TIMEOUT,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + userToken.replace('"','').replace('"','')
      },
      body: JSON.stringify({
        UserId: decoded.nameid,
        FavoriteId:favoriteId
      }),
    });

    const json = await response.json();
    console.log('offUserFavorite json : ');
    console.log(json);

    return json;
  } catch (error) {
    console.log('OHApi_Component catch offUserFavorite method : ');
    console.log(error);
    throw error;
  }
}
//---------
export const getPagedVideoList = async (userToken,pageNumber,courseId) => {
  try {
    console.log(`getPagedVideoList userToken : ${userToken} pageNumber : ${pageNumber} courseId : ${courseId}`);
    const decoded = jwt_decode(userToken);
    console.log('getPagedVideoList userToken Decode is : ');
    console.log(decoded);

    const response = await fetch(`${PAGEDVIDEOLIST}?PageNumber=${pageNumber}&CourseId=${3}&UserId=${decoded.nameid}`, { // courseId  63
      timeout: Common.API_TIMEOUT,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':  "Bearer " + userToken.replace('"','').replace('"','')
      }
    });

    const json = await response.json();
    console.log('getPagedVideoList list json : ');
    console.log(json);

    return json;
  } catch (error) {
    console.log('OHApi_Component catch getPagedVideoList method : ');
    console.log(error);
    throw error;
  }
}
//---------
export const likeContent = async (lessonContentId,userToken) => {
    try {
    const decoded = jwt_decode(userToken);
    console.log('likeContent userToken Decode is : ');
    console.log(decoded);

    const response = await fetch(LIKECONTENT, {
      timeout: Common.API_TIMEOUT,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + userToken.replace('"','').replace('"','')
      },
      body: JSON.stringify({
        UserId: decoded.nameid,
	      LessonContentId:lessonContentId
      }),
    });

    const json = await response.json();
    console.log('likeContent json : ');
    console.log(json);

    return json;
  } catch (error) {
    console.log('OHApi_Component catch likeContent method : ');
    console.log(error);
    throw error;
  }
}
//----------
export const disLikeContent = async (lessonContentId,userToken) => {
    try {
    const decoded = jwt_decode(userToken);
    console.log('disLikeContent userToken Decode is : ');
    console.log(decoded);

    const response = await fetch(DISLIKECONTENT, {
      timeout: Common.API_TIMEOUT,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + userToken.replace('"','').replace('"','')
      },
      body: JSON.stringify({
        UserId: decoded.nameid,
	      LessonContentId:lessonContentId
      }),
    });

    const json = await response.json();
    console.log('disLikeContent json : ');
    console.log(json);

    return json;
  } catch (error) {
    console.log('OHApi_Component catch disLikeContent method : ');
    console.log(error);
    throw error;
  }
}

export const getEventList = async () => {
  try {
    // test
    console.log('Fetch Url ');
    let response = await fetch(BASE_URL + 'Event');
    let json = await response.json();
     console.log('getEventList json : ');
     console.log(json);
    return json;
  } catch (error) {
    console.log('OHApi_Component catch getEventList method : ');
    console.log(error);
  }
}
export const getEventList2 = async (userToken) => {
  try {
    // test

    //let tok ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjA5MTkzNDYyNTYxIiwibmFtZWlkIjoiNjMiLCJyb2xlIjoiVXNlciIsIm5iZiI6MTU0NDEwOTc2NywiZXhwIjoxNTc1NjQ1NzY3LCJpYXQiOjE1NDQxMDk3NjcsImlzcyI6ImtpbXlhIiwiYXVkIjoiT3N0YWRIYW1yYWgifQ.Gbz4U3PGQXFyE7CxtLaG9vGQTLb5c3UhBwICRc9bca4';
    console.log('444 token json : ' + userToken);
    
    const decoded = jwt_decode(userToken);
    console.log(decoded);

    const UserId = decoded.nameid;
    console.log(UserId);
     response = await fetch(BASE_URL + 'Event/GetEventsByUserId/'+UserId
    //let response = await fetch(BASE_URL + 'Event'
    // ,{
    //   timeout: Common.API_TIMEOUT,
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //     //'Authorization':  "Bearer " + tok.replace('"','').replace('"','')
    //   }
      
    // }
    );
    
    
    let json = await response.json();
     console.log('getEventList2 json : ');
     console.log(json);
    return json;
  } catch (error) {
    console.log('OHApi_Component catch getEventList method : ');
    console.log(error);
  }
}