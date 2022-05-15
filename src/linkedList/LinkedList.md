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