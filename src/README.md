
# 추상 자료형
> Abstract Data Type

## 추상 자료형?
> 구체적인 기능의 완성 과정을 언급하지 않고,
> 순수하게 기능이 무엇인지를 나열한 것

```c
// 구조체를 기반으로 Wallet이라는 자료형을 정의
typedef struct _wallet {
    int coin100Num;     // 100원 짜리 동전의 수
    int bill5000Num;    // 5000원짜리 지폐의 수
} Wallet;

// Wallet의 추상 자료형 정의
/// 돈을 꺼내는 연산
int TakeOutMoney( Wallet* pw, int coinNum, int billNum );
/// 돈을 넣는 연산
void PutMoney( Wallet* pw, int coinNum, int billNum );
```

## 자료구조의 학습에 ADT의 정의를 포함한다
### 학습 순서
1. 리스트 자료구조의 ADT를 정의한다
2. ADT를 근거로 리스트 자료구조를 활용하는 main 함수를 정의한다.
3. ADT를 근거로 리스트를 구현한다.

### ADT의 본질을 이해한다
1. 리스트의 사용자에게 사용방법 이외의 불필요한 부분까지 알도록 부담주지 않는다.