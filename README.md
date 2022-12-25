# 🐦 Newitter
[1. 🗒️ 프로젝트 설명](#description) <br>
[2. 🌎 프로젝트 소개](#about-project) <br>
[3. 🔫 트러블 슈팅](#trouble-shotting) <br>
[4. 🖥️ 구현 화면](#results)

## Description

**트위터 클론 코딩**

>2022월 12월 (약 2주) <br>
개인 프로젝트 <br>
서비스 링크 : [바로 가기](https://jaeyeong815.github.io/newitter/)

<img width="600" alt="main" src="https://user-images.githubusercontent.com/85178602/209461866-398cb436-fe70-4203-a61a-b2a49c97866b.png">

## About Project

### Skill

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">  <img src="https://img.shields.io/badge/React&nbsp;Router-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=black">  <img src="https://img.shields.io/badge/Font&nbsp;Awesome-528DD7?style=for-the-badge&logo=FontAwesome&logoColor=black">  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=black">

### Function

- **Auth**
	- `Firebase`의 `Authentication` 연결하여 회원 가입/로그인/로그아웃/회원 정보 수정 기능 구현 <br>
  
		- Google 로그인, Github 로그인, Email 로그인 가능

- **Newit**
	- `Firebase`의 `Firestore Database` 연결하여 CRUD 구현
	- `Firebase`의 `Storage` 연결하여 이미지 파일 관리
	- `Firestore`의 `onSnapshot` 메서드를 사용하여 실시간으로 업데이트 데이터 반영
  - 로그인 한 계정의 글만 수정, 삭제 가능 (다른 계정의 글은 읽기만 가능) <br>
  
    <img width="500" alt="newitter2" src="https://user-images.githubusercontent.com/85178602/209461980-83b85e44-5384-4c4f-826b-e8db9ae3c18f.png">

## Trouble Shotting

### 1) Promise 객체 데이터 받기
<br>

**문제 상황** <br> <br>
회원 가입 기능 구현 중 비동기 함수의 데이터를 받아야 하는 상황이었다. <br>
메인 화면에서 회원 가입 버튼을 클릭하면 `Auth.js`의 `onSubmitHandler` 함수가 동작한다. <br>

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
		console.log('🚀 ~ file: Auth.js:21 ~ onSubmitHandler ~ data', data);
	}
	...
};
```

`onSubmitHandler` 함수는 `authFbase.js`의 `createAccount` 함수를 이용하여 계정을 만들고, <br>
반환되는 데이터로 에러가 발생했는지 확인해야 한다. <br>
이때 Promise 객체가 반환되어 데이터를 확인할 수 없는 문제가 있었다. <br> <br>

**해결** <br>
```jsx
// Auth.js
const onSubmitHandler = async (e) => {
	e.preventDefault();
	if (newAccount) {
		const data = await createAccount(loginData.email, loginData.password);
		console.log('🚀 ~ file: Auth.js:21 ~ onSubmitHandler ~ data', data);
	}
	...
};
```
`createAccount` 함수 앞에 `await`을 빠뜨려서 비동기 데이터를 가져오지 못했던 문제였다. <br>
`await`을 작성하니 정상적으로 데이터를 받아올 수 있었다. <br>
`async-await`을 사용하지 않고 데이터를 받으려면 `then` 구문을 사용하면 된다. <br> <br>

### 2) includes() Type 에러
<br>

**문제 상황** <br> <br>
회원 가입/로그인 후 받은 데이터에 `error` 단어가 포함되어있는지 확인한다. <br>
포함되어 있다면 안내 메시지를 띄우고, 포함되지 않았다면 메인 페이지로 이동된다.

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
이때 `TypeError: data.includes is not a function` 에러가 발생하였다. <br> <br>

**해결** <br>
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
로그인이 정상적으로 되면 반환되는 데이터를 `console`에 출력해 보았을 때 객체로 반환되는 것을 확인했다. <br>
`inclues()`는 `String`, `Array` 데이터 타입일 때 동작하기 때문에 `includes()`가 작동을 하지 않았다는 생각이 들었다. <br>
따라서 문자열로 변환해 주는 `toString()`을 먼저 실행하여 `data.toString().includes(ERROR)`로 수정하였고 정상 작동하였다.

## Results

### 1) Newit 등록
<br>

<img width="500" alt="newitter2" src="https://user-images.githubusercontent.com/85178602/209461900-67f725a2-ed5e-45ad-8aaa-130ed3a3533a.gif">

### 2) Newit 수정
<br>

<img width="500" alt="newitter2" src="https://user-images.githubusercontent.com/85178602/209461922-63339cf7-0e8f-4fa8-88c9-0770ebf89498.gif">

### 3) Newit 삭제
<br>

<img width="500" alt="newitter2" src="https://user-images.githubusercontent.com/85178602/209461930-ceab8e39-383a-4623-a843-23a20d0390a0.gif">

