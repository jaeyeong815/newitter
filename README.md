# ๐ฆ Newitter
[1. ๐๏ธ ํ๋ก์ ํธ ์ค๋ช](#description) <br>
[2. ๐ ํ๋ก์ ํธ ์๊ฐ](#about-project) <br>
[3. ๐ซ ํธ๋ฌ๋ธ ์ํ](#trouble-shotting) <br>
[4. ๐ฅ๏ธ ๊ตฌํ ํ๋ฉด](#results)

## Description

**ํธ์ํฐ ํด๋ก  ์ฝ๋ฉ**

>2022์ 12์ (์ฝ 2์ฃผ) <br>
๊ฐ์ธ ํ๋ก์ ํธ <br>
์๋น์ค ๋งํฌ : [๋ฐ๋ก ๊ฐ๊ธฐ](https://jaeyeong815.github.io/newitter/)

<img width="600" alt="main" src="https://user-images.githubusercontent.com/85178602/209461866-398cb436-fe70-4203-a61a-b2a49c97866b.png">

## About Project

### Skill

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">  <img src="https://img.shields.io/badge/React&nbsp;Router-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=black">  <img src="https://img.shields.io/badge/Font&nbsp;Awesome-528DD7?style=for-the-badge&logo=FontAwesome&logoColor=black">  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=black">

### Function

- **Auth**
	- `Firebase`์ `Authentication` ์ฐ๊ฒฐํ์ฌ ํ์ ๊ฐ์/๋ก๊ทธ์ธ/๋ก๊ทธ์์/ํ์ ์ ๋ณด ์์  ๊ธฐ๋ฅ ๊ตฌํ <br>
  
		- Google ๋ก๊ทธ์ธ, Github ๋ก๊ทธ์ธ, Email ๋ก๊ทธ์ธ ๊ฐ๋ฅ

- **Newit**
	- `Firebase`์ `Firestore Database` ์ฐ๊ฒฐํ์ฌ CRUD ๊ตฌํ
	- `Firebase`์ `Storage` ์ฐ๊ฒฐํ์ฌ ์ด๋ฏธ์ง ํ์ผ ๊ด๋ฆฌ
	- `Firestore`์ `onSnapshot` ๋ฉ์๋๋ฅผ ์ฌ์ฉํ์ฌ ์ค์๊ฐ์ผ๋ก ์๋ฐ์ดํธ ๋ฐ์ดํฐ ๋ฐ์
  - ๋ก๊ทธ์ธ ํ ๊ณ์ ์ ๊ธ๋ง ์์ , ์ญ์  ๊ฐ๋ฅ (๋ค๋ฅธ ๊ณ์ ์ ๊ธ์ ์ฝ๊ธฐ๋ง ๊ฐ๋ฅ) <br>
  
    <img width="500" alt="newitter2" src="https://user-images.githubusercontent.com/85178602/209461980-83b85e44-5384-4c4f-826b-e8db9ae3c18f.png">

## Trouble Shotting

### 1) Promise ๊ฐ์ฒด ๋ฐ์ดํฐ ๋ฐ๊ธฐ
<br>

**๋ฌธ์  ์ํฉ** <br> <br>
ํ์ ๊ฐ์ ๊ธฐ๋ฅ ๊ตฌํ ์ค ๋น๋๊ธฐ ํจ์์ ๋ฐ์ดํฐ๋ฅผ ๋ฐ์์ผ ํ๋ ์ํฉ์ด์๋ค. <br>
๋ฉ์ธ ํ๋ฉด์์ ํ์ ๊ฐ์ ๋ฒํผ์ ํด๋ฆญํ๋ฉด `Auth.js`์ `onSubmitHandler` ํจ์๊ฐ ๋์ํ๋ค. <br>

```jsx
// authFbase.js
export const createAccount = async (email, password) => {
	const data = await createUserWithEmailAndPassword(authService, email, password);
	const userInfo = await data.user;
	return userInfo;
};

// Auth.js
const onSubmitHandler = async (e) => {
	e.preventDefault();
	if (newAccount) {
		const data = createAccount(loginData.email, loginData.password);
		console.log('๐ ~ file: Auth.js:21 ~ onSubmitHandler ~ data', data);
	}
	...
};
```

`onSubmitHandler` ํจ์๋ `authFbase.js`์ `createAccount` ํจ์๋ฅผ ์ด์ฉํ์ฌ ๊ณ์ ์ ๋ง๋ค๊ณ , <br>
๋ฐํ๋๋ ๋ฐ์ดํฐ๋ก ์๋ฌ๊ฐ ๋ฐ์ํ๋์ง ํ์ธํด์ผ ํ๋ค. <br>
์ด๋ Promise ๊ฐ์ฒด๊ฐ ๋ฐํ๋์ด ๋ฐ์ดํฐ๋ฅผ ํ์ธํ  ์ ์๋ ๋ฌธ์ ๊ฐ ์์๋ค. <br> <br>

**ํด๊ฒฐ** <br>
```jsx
// Auth.js
const onSubmitHandler = async (e) => {
	e.preventDefault();
	if (newAccount) {
		const data = await createAccount(loginData.email, loginData.password);
		console.log('๐ ~ file: Auth.js:21 ~ onSubmitHandler ~ data', data);
	}
	...
};
```
`createAccount` ํจ์ ์์ `await`์ ๋น ๋จ๋ ค์ ๋น๋๊ธฐ ๋ฐ์ดํฐ๋ฅผ ๊ฐ์ ธ์ค์ง ๋ชปํ๋ ๋ฌธ์ ์๋ค. <br>
`await`์ ์์ฑํ๋ ์ ์์ ์ผ๋ก ๋ฐ์ดํฐ๋ฅผ ๋ฐ์์ฌ ์ ์์๋ค. <br>
`async-await`์ ์ฌ์ฉํ์ง ์๊ณ  ๋ฐ์ดํฐ๋ฅผ ๋ฐ์ผ๋ ค๋ฉด `then` ๊ตฌ๋ฌธ์ ์ฌ์ฉํ๋ฉด ๋๋ค. <br> <br>

### 2) includes() Type ์๋ฌ
<br>

**๋ฌธ์  ์ํฉ** <br> <br>
ํ์ ๊ฐ์/๋ก๊ทธ์ธ ํ ๋ฐ์ ๋ฐ์ดํฐ์ `error` ๋จ์ด๊ฐ ํฌํจ๋์ด์๋์ง ํ์ธํ๋ค. <br>
ํฌํจ๋์ด ์๋ค๋ฉด ์๋ด ๋ฉ์์ง๋ฅผ ๋์ฐ๊ณ , ํฌํจ๋์ง ์์๋ค๋ฉด ๋ฉ์ธ ํ์ด์ง๋ก ์ด๋๋๋ค.

```jsx
const onSubmitHandler = async (e) => {
	e.preventDefault();
	if (newAccount) {
		const data = await createAccount(loginData.email, loginData.password);
		if (data.includes(ERROR)) {
			setErrorMsg(stringReplace(data));
		}
	}
	...
}
```
์ด๋ `TypeError: data.includes is not a function` ์๋ฌ๊ฐ ๋ฐ์ํ์๋ค. <br> <br>

**ํด๊ฒฐ** <br>
```jsx
const onSubmitHandler = async (e) => {
	e.preventDefault();
	if (newAccount) {
		const data = await createAccount(loginData.email, loginData.password);
		if (data.toString().includes(ERROR)) {
			setErrorMsg(stringReplace(data));
		}
	}
	...
}
```
๋ก๊ทธ์ธ์ด ์ ์์ ์ผ๋ก ๋๋ฉด ๋ฐํ๋๋ ๋ฐ์ดํฐ๋ฅผ `console`์ ์ถ๋ ฅํด ๋ณด์์ ๋ ๊ฐ์ฒด๋ก ๋ฐํ๋๋ ๊ฒ์ ํ์ธํ๋ค. <br>
`inclues()`๋ `String`, `Array` ๋ฐ์ดํฐ ํ์์ผ ๋ ๋์ํ๊ธฐ ๋๋ฌธ์ `includes()`๊ฐ ์๋์ ํ์ง ์์๋ค๋ ์๊ฐ์ด ๋ค์๋ค. <br>
๋ฐ๋ผ์ ๋ฌธ์์ด๋ก ๋ณํํด ์ฃผ๋ `toString()`์ ๋จผ์  ์คํํ์ฌ `data.toString().includes(ERROR)`๋ก ์์ ํ์๊ณ  ์ ์ ์๋ํ์๋ค.

## Results

### 1) Newit ๋ฑ๋ก
<br>

<img width="500" alt="newitter2" src="https://user-images.githubusercontent.com/85178602/209461900-67f725a2-ed5e-45ad-8aaa-130ed3a3533a.gif">

### 2) Newit ์์ 
<br>

<img width="500" alt="newitter2" src="https://user-images.githubusercontent.com/85178602/209461922-63339cf7-0e8f-4fa8-88c9-0770ebf89498.gif">

### 3) Newit ์ญ์ 
<br>

<img width="500" alt="newitter2" src="https://user-images.githubusercontent.com/85178602/209461930-ceab8e39-383a-4623-a843-23a20d0390a0.gif">

