# 자료구조 스터디

## 목적
* 열혈 자료구조는 C언어로 작성되어있다
* C언어로 작성되어 있는 코드를 typescript로 옮기는 작업이 진행된다.
* Jest Library를 이용해 Test Code 작성

## 폴더 구조
/src/ => typescript로 작성된 자료구조
/tests/ => 자료구조 Test Code

## 설치
```
yarn add typescript @types/node
yarn global add ts-node
yarn tsc --init --rootDir src --outDir ./bin --esModuleInterop --lib ES2015 --module commonjs --noImplicitAny true

yarn global add jest
yarn add --dev ts-jest @types/jest
```

## 책
### 윤성우의 열혈 자료구조