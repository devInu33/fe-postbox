# 우체통 미션 정리

각각의 클래스의 의도

1. Scanner
DOM이던, 마을 Model 데이터이던 간에, 탐색하여 뭔가 하는 행위라는 공통점이 있다고 생각해서 Scanner 추상클래스를 만들었습니다.scan 메서드를 탐색할 대상에 따라 다르게 상속받도록 하였습니다. 실제로 사용하는 구상클래스로는 Dom을 selector로 탐색하는 DomScanner와, 마을 데이터를 탐색해서 실제 DOM으로 그려주는 RenderScanner, 마을 데이터를 탐색해서 버튼 클릭시 우체통의 위치를 보여주는 ButtonScanner 구상 클래스 등을 만들었습니다. 여기서 Scanner와 Visitor를 분리하였는데, 그 이유는 Scanner 탐색 대상에 따라 탐색하는 로직이 바뀌고, scan했을 때 해줘야 할 작업인 콜백함수도 전부 바뀌어 클래스가 작동하는 대상에 따라서 좀 더 구분해야 할 필요성을 느꼈기 때문입니다. 따라서 탐색 로직만을 가지는 Visitor 클래스를 Scanner 클래스의 필드로 의존성을 가지게 되었습니다.

2. Visitor
DOM이나, 마을 데이터를 탐색하는 알고리즘이 서로 다르기 때문에, Visitor 추상클래스를 만들어서 탐색하는 대상에 따라 DomVisitor와 ModelVisitor 구상클래스를 만들어 사용하였습니다 실제로 사용할 때는 Scanner의 생성자에 매개변수로 주입하여 사용하였습니다.

3. Model
마을과 우체통을 모두 하나의 모델로 보고 제어역전을 이루기 위해서 Model클래스로 추상화 하였습니다. 모든 Model 클래스는 생성 시에 Model.objects라는 전역 셋에 자신을 넣습니다. 재귀를 실행하는 마을과 재귀를 실행하지 않는 우체통에 따라 render() 메서드를 다르게 구현하기 위해 템플릿 메소드 패턴을 사용하여 render()라는 훅을 만들어 서로 다르게 상속하게 하였습니다.
처음에는 추상 클래스에 각각 children이라는 Set으로 자식 클래스를 가지도록 하였으나, 이를 모두 링크드 리스트로 바꾸고 child라는 헤더만 가지도록 했습니다. 각 단계의 모든 형재 Model은 next 필드에 링크드 리스트로 다음 Model과 연결되며, 이 방식으로 렌더링 하기 위해 기존에 children Set을 루프를 돌며 각각 재귀적으로 render를 호출하던 방식에서, 제네레이터를 사용하여 매번 자식 노드를 전부 연결해주면 형제 노드를 호출해주는 방식을 바꿨습니다. 이렇게 바꾼 이유는 기존에 재귀 방식은 for 루프보다 재귀 호출이 먼저 콜 스택에 호출되어 모든 노드가 자식 셋으로 들어갈 때까지 재귀가 끝나지 않아 형제 노드가 생성되지 않고 1개의 자식만 죽 생성되는 결과가 나왔기 때문입니다. 다만 아직 이 방법도 하나씩만 렌더링 되는 문제는 그대로입니다. 혹시 코드에서 고칠 점을 발견하시면 피드백 해주시면 감사하겠습니다.

- Model에서 구현하지 못한 사항
기존에 children Set을 루프를 돌며 재귀적으로 render를 호출하였을 때, 루프가 마저 실행되지 않고 깊이만 계속해서 깊어지는 결과가 나왔습니다. 이를 해결하기 위해 링크드 리스트를 활용하였으나 아직 렌더링 문제는 해결되지 않은 상황입니다.

4. 정렬로직 & 탐색 로직
우체통의 정렬을 위한 함수로는 quicksort 함수를 가져와서 model.mailBox.size를 비교하게 하는 compare function을 인자로 받아 정렬하게 하였습니다.
탐색 로직은 앞서 만든 Visitor 클래스를 활용하였는데, 간단하게 스택을 하나 두고 노드의 형제노드와 자식노드를 전부 스택에다가 넣으면서 전체를 탐색하는 방식으로 탐색하였습니다.

```javascript
//Model 탐색 클래스, DOM 탐색 클래스의 경우에는 child를 firstElementChild로, next를 nextElementSibling으로 바꿔주기만 하면 됨.
export class ModelVisitor extends Visitor {
visit(action, target) {
const stack= [];
let curr = target.child;
if(!curr)return;
do{
action(curr);
if(curr.child) stack.push(curr.child);
if(curr.next)stack.push(curr.next);
}while((curr=stack.pop()));
}
}
```
최종 사용 코드는 다음과 같습니다.

```javascript
const town = new Town(’base’);
for(let i =0 i<LIMIT; i++){
new Town(chars[i])
}
const onclick = () => new ButtonScanner(new ModelVisitor()).scan(town);
new CheckButton(onclick);
town.render();

const scanner = new RenderScanner(new ModelVisitor());
scanner.scan(town);
```

버튼을 위해 동작하는 콜백함수를 하나 만들고 가장 상위 노드 타운을 하나 만든다음 이를 RenderScanner로 DOM으로 그려주엇습니다. Town은 시작할 때 랜덤한 갯수만큼만 생성되어 그 이상 렌더링이 진행되지 않도록 제한을 두었습니다.