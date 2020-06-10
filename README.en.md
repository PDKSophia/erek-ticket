[简体中文](./README.md) | English

<div align='center'>
  <img src='https://github.com/PDKSophia/erek-ticket/raw/master/images/logo.png' width=260 height=130 />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/taro-1.2.13-blue.svg" alt="taro">
  <img src="https://img.shields.io/badge/license-MIT-orange.svg" alt="MIT">
  <img src="https://img.shields.io/badge/react-16.4.1-yellow.svg" alt="react">
  <img src="https://img.shields.io/badge/react--redux-5.0.7-green.svg" alt="redux">
  <img src="https://img.shields.io/badge/redux--logger-3.0.6-red.svg" alt="redux-logger">
  <img src="https://img.shields.io/badge/redux--thunk-2.3.0-yellow.svg" alt="redux-thunk">
</div>

## Introduce

> A micro-program ticket-grabbing system based on Wechat meets the needs of airplane tickets, train tickets, bus tickets, movie tickets and so on. This project is the graduation design of the Peng DaoKuan

> All copyright belongs to `Peng Daokuan`

## Technology Stack

1. [Taro](https://nervjs.github.io/taro/) Frame，Using React style to write WeChat applet
2. React Frame
3. WeChat applet interface invocation
4. Redux Manage applet state
5. prop-types 、 classnames , The third party relies on the library.
6. redux-thunk、redux-logger middleaware
7. ....

## Target function

- [x] Authorize login
- [x] Plane Station
- [x] Train Station
- [x] Bus Station
- [x] Movie List
- [x] Movie Order Code
- [x] Two Dimensional Code Generation
- [ ] WeChat Small Program template Information Push

## Other function

- [x] Sliding Switch Tab Around Swiper
- [x] Getting User Equipment Information
- [ ] Lazy Load Image
- [ ] Earn Integral

## Project Environment

> Node version v10.0 or above , the latest version of WeChat developer tools , the latest version of taro.

## V1 Version Description

```javascript
    1 . Use ' taro init ' Initialization project

    2 . Use Extended language Scss

    3 . Unified sending request, API calls request custom request for interface invocation

    4 : Unified processing of request error codes

    5 : Management of Redux
```

## Usage

```javascript
    1 : git clone          // clone project

    2 : cd ticket          // into project

    3 : npm install        // install package

    4 : npm run dev:weapp  // run it
```

---

### Small Program Code

<img src="https://github.com/PDKSophia/erek-ticket/raw/master/images/ticket.jpg" width=120 height=120>
