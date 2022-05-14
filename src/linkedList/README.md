
# 윤성우의 열혈 자료구조 - List

## 리스트의 종류
|             |                                             |
| ----------- | ------------------------------------------- |
| 순차 리스트 | 배열을 기반으로 구현된 리스트               |
| 연결 리스트 | 메모리의 동적 할당을 기반으로 구현된 리스트 |

## 리스트 자료구조의 특성
* 데이터를 나란히 정리한다.
* 중복된 데이터의 저장을 막지 않는다.

## 리스트의 ADT
```c
// 초기화할 리스트의 주소 값을 인자로 전달한다
// 리스트 생성 후 제일 먼저 호출되어야 하는 함수이다.
void ListInit(List* plist);

// 리스트에 데이터를 저장한다.
// 매개변수 data에 전달된 값을 저장한다.
void LInsert(List* plist, LData data);

// 첫 번째 데이터가 pdata가 가리키는 메모리에 저장된다.
// 데이터의 참조를 위한 초기화가 진행된다.
// 참조 성공시 True(1), 실패시 False(0) 반환
int LFirst(List* plist, LData* pdata);

// 참조된 데이터의 다음 데이터가 pdata가 가리키는 메모리에 저장된다.
// 순차적인 참조를 위해서 반복 호출이 가능하다.
// 참조를 새로 시작하려면 먼저 LFirst 함수를 호출해야 한다.
// 참조 성공시 True(1), 실패시 False(0) 반환
int LNext(List* plist, LData* pdata);

// LFirst 또는 LNext 함수의 마지막 반환 데이터를 삭제한다.
// 삭제된 데이터는 반환된다.
// 마지막 반환 데이터를 삭제하므로 연이은 반복 호출을 허용하지 않는다.
LData LRemove(List* plist);

// 리스트에 저장되어 있는 데이터의 수를 반환한다.
int LCount(List* plist);
```

## 리스트의 ADT를 기반으로 정의된 main 함수
> main 함수에서는 리스트의 구현과 관련된 어떠한 코드도 등장하지 않음.
```c
#include <stdio.h>
#include "ArrayList.h"

int main(void) {
    // ArrayList 생성 및 초기화
    List list;
    int data;
    ListInit(&list);

    // 5개의 데이터 저장
    LInsert(&list, 11); LInsert(&list, 11);
    LInsert(&list, 22); LInsert(&list, 22);
    LInsert(&list, 33);

    // 저장된 데이터의 전체 출력
    printf("현재 데이터의 수: %d\n", LCount(&list));

    // LFirst -> LNext -> LNext -> LNext -> ...
    if( LFirst(&list, &data) ) {          // 첫 번째 데이터 조회
        printf("%d ", data);

        while( LNext(&list, &data) ) {    // 두 번째 이후의 데이터 조회
            printf("%d ", data);
        }
    }
    printf("\n\n");

    // 숫자 22를 탐색하여 모두 삭제
    if( LFirst(&list, &data) ) {
        if( data == 22 ) {
            LRemove(&list);
        }

        while( LNext(&list, &data) ) {
            if( data == 22 ) {
                LRemove(&list);
            }
        }
    }

    // 삭제 후 남은 데이터 전체 출력
    printf("현재 데이터의 수: %d\n", LCount(&list));
    if( LFirst(&list, &data) ) {          // 첫 번째 데이터 조회
        printf("%d ", data);

        while( LNext(&list, &data) ) {    // 두 번째 이후의 데이터 조회
            printf("%d ", data);
        }
    }
    printf("\n\n");

    return 0;
}
```
```bash
현재 데이터의 수: 5
11 11 22 22 33

현재 데이터의 수: 3
11 11 33
```

## 배열 기반 구현
```c
/* ArrayList.h */
#define TRUE  1
#define FALSE 0

#define LIST_LEN 100
typedef int LData;      // LData에 대한 typedef 선언

typedef struct __ArrayList {    // 배열기반 리스트를 정의한 구조체
    LData arr[LIST_LEN];        // 리스트의 저장소인 배열
    int numOfData;              // 저장된 데이터의 수
    int curPosition;            // 데이터 참조위치를 기록
} ArrayList;

typedef ArrayList List;

void ListInit(List* plist);             // 초기화
void LInsert(List* plist, LData data);  // 데이터 저장

int LFirst(List* plist, LData data);    // 첫 데이터 참조
int LNext(List* plist, LData data);     // 두 번째 이후 데이터 참조

LData LRemove(List* plist);             // 참조한 데이터 삭제
int LCount(List* plist);                // 저장된 데이터의 수 반환
```

```c
/* ArrayList.c */

#include "ArrayList.h"

// 초기화
void ListInit(List* plist) {
    (plist->numOfData) = 0;     // 리스트에 저장된 데이터의 수는 0
    (plist->curPosition) = -1;  // 현재 아무 위치도 가리키지 않음
}

// 데이터 저장
void LInsert(List* plist, LData data) {
    // 더이상 저장할 공간이 없다면
    if(plist->numOfData >= LIST_LEN) {
        puts("저장이 불가능합니다.");
        return ;
    }

    plist->arr[plist->numOfData] = data;    // 데이터 저장
    (plist->numOfData) += 1;                // 저장된 데이터 수 증가
}

// 첫 데이터 참조
void LFirst(List* plist, LData* pdata) {
    // 저장된 데이터가 하나도 없다면
    if( plist->numOfData == 0 ) {
        return FALSE;
    }

    (plist->curPosition) = 0;   // 참조 위치 초기화
    *pdata = plist->arr[0];     // pdata가 가리키는 공간에 데이터 저장
    return TRUE;
}

// 두 번째 이후 데이터 참조
void LNext(List* plist, LData* pdata) {
    // 더 이상 참조할 데이터가 없다면
    if( plist->curPoistion >= (plist->numOfData) - 1 ) {
        return FALSE;
    }

    (plist->curPosition) += 1;                  // 참조 위치 1 증가
    *pdata = plist->arr[plist->curPosition];    // pdata가 가리키는 공간에 데이터 저장
    return TRUE;
}

// 데이터 삭제
// 중간에 데이터가 삭제되면, 
// 뒤에 저장된 데이터들을 한 칸씩 앞으로 이동시켜서 빈 공간을 메워야 한다.
LData LRemove(List* plist) {
    // 삭제할 데이터의 인덱스 값 참조
    int rpos = plist->curPosition;
    int num  = plist->numOfData;
    int i;

    // 삭제할 데이터를 임시로 저장
    LData rdata = plist->arr[rpos];

    // 삭제를 위한 데이터의 이동을 진행하는 반복문
    for( i = rpos; i < num - 1; i++ ) {
        plist->arr[i] = plist->arr[i + 1];
    }

    (plist->numOfData)   -= 1;  // 데이터 수 감소
    (plist->curPosition) -= 1;  // 참조 위치를 하나 되돌린다.
    return rdata;               // 삭제된 데이터의 반환
}

// 데이터의 갯수 반환
int LCount(List* plist) {
    return plist->numOfData;
}
```

## 연결리스트 ADT
```c
// 초기화할 리스트의 주소 값을 인자로 전달한다
// 리스트 생성 후 제일 먼저 호출되어야 하는 함수이다.
void ListInit(List* plist);

// 리스트에 데이터를 저장한다.
// 매개변수 data에 전달된 값을 저장한다.
void LInsert(List* plist, LData data);

// 첫 번째 데이터가 pdata가 가리키는 메모리에 저장된다.
// 데이터의 참조를 위한 초기화가 진행된다.
// 참조 성공시 True(1), 실패시 False(0) 반환
int LFirst(List* plist, LData* pdata);

// 참조된 데이터의 다음 데이터가 pdata가 가리키는 메모리에 저장된다.
// 순차적인 참조를 위해서 반복 호출이 가능하다.
// 참조를 새로 시작하려면 먼저 LFirst 함수를 호출해야 한다.
// 참조 성공시 True(1), 실패시 False(0) 반환
int LNext(List* plist, LData* pdata);

// LFirst 또는 LNext 함수의 마지막 반환 데이터를 삭제한다.
// 삭제된 데이터는 반환된다.
// 마지막 반환 데이터를 삭제하므로 연이은 반복 호출을 허용하지 않는다.
LData LRemove(List* plist);

// 리스트에 저장되어 있는 데이터의 수를 반환한다.
int LCount(List* plist);

// 리스트에 정렬의 기준이 되는 함수를 등록한다.
void SetSortRule(List* plist, int (*comp)(LData d1, LData d2));
```

## 연결리스트 헤더파일
```c
/* LinkedList.h */
#define TRUE  1
#define FALSE 0

typedef int LData;

typedef struct _node {
    LData data;
    struct _node* next;
} Node;

typedef struct _linkedList {
    Node* head;                         // 더미 노드를 가리키는 멤버
    Node* cur;                          // 참조 및 삭제를 돕는 멤버
    Node* before;                       // 삭제를 돕는 멤버
    int numOfData;                      // 저장된 데이터의 수를 기록하기 위한 멤버
    int (*comp)(LData d1, LData d2);    // 정렬의 기준을 등록하기 위한 멤버
} LinkedList;

typedef LinkedList List;

void ListInit(List* plist);             // 초기화
void LInsert(List* plist, LData data);  // 데이터 저장

int LFirst(List* plist, LData data);    // 첫 데이터 참조
int LNext(List* plist, LData data);     // 두 번째 이후 데이터 참조

LData LRemove(List* plist);             // 참조한 데이터 삭제
int LCount(List* plist);                // 저장된 데이터의 수 반환

```

```c
/* LinkedList.c */
void ListInit(List* plist) {
    plist->head = (Node*)malloc(sizeof(Node));
    plist->head->next = NULL;
    plist->comp = NULL;
    plist->numOfData = 0;
}

void LInsert(List* plist, LData data) {
    // 정렬 기준이 마련되지 않았다면
    if( plist->comp == NULL ) {
        // 머리에 노드를 추가
        FInsert(plist, data);
    } 
    
    // 정렬 기준이 마련되어 있다면
    else {
        // 정렬 기준에 근거하여 노드를 추가.
        SInsert(plist, data);
    }
}

// 머리에 노드를 추가
void FInsert(List* plist, LData data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;

    newNode->next = plist->head->next;
    plist->head->next = newNode;

    (plist->numOfData) += 1;
}

// 정렬 기준에 근거하여 노드를 추가.
int SInsert(List* plist, LData data) {

}

// 첫 번째 노드 
int LFirst(List* plist, LData* pdata) {
    if(plist->head->next == NULL) {
        return FALSE;
    }

    plist->before = plist->head;
    plist->cur = plist->head->next;

    *pdata = plist->cur->data;
    return TRUE;
}

// 두 번째 이후 노드
int LNext(List* plist, LData* pdata) {
    if(plist->cur->next == NULL) {
        return FALSE;
    }

    plist->before = plist->cur;
    plist->cur = plist->cur->next;

    *pdata = plist->cur->data;
    return TRUE;
}

// 데이터 삭제
LData LRemove(List* plist) {
    Node* rpos = plist->cur;
    LData rdata = rpos->data;

    plist->before->next = plist->cur->next;
    plist->cur = plist->before;

    free(rpos);
    (plist->numOfData) -= 1;
    return rdata;
}
```