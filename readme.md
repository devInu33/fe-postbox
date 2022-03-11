# 우체통 미션 정리

클래스에 대한 설명

1. Scanner

DOM이던, 마을 Model 데이터이던 간에, 탐색하여 뭔가 하는 행위라는 공통점이 있다고 생각해서 Scanner 추상클래스를 만들었습니다.scan 메서드를 탐색할 대상에 따라 다르게 상속받도록 하였습니다. 실제로 사용하는 구상클래스로는 Dom을 selector로 탐색하는 DomScanner와, 마을 데이터를 탐색해서 실제 DOM으로 그려주는 RenderScanner, 마을 데이터를 탐색해서 버튼 클릭시 우체통의 위치를 보여주는 ButtonScanner 구상 클래스 등을 만들었습니다. 여기서 Scanner와 Visitor를 분리하였는데, Scanner는 탐색할 시 실행할 행위인 콜백 함수만 가지고,  탐색 알고리즘은 탐색 대상과 목적에 따라 Visitor라는 클래스로 따로 만들어서 클래스 필드로 의존성을 만들었습니다.

2. Visitor

DOM이나, 마을 데이터를 탐색하는 알고리즘이 서로 다르기 때문에, Visitor 추상클래스를 만들어서 탐색하는 대생에 따라 DomVisitor와 ModelVisitor 구상클래스를 만들어 사용하였습니다 실제로 사용할 때는 Scanner의 생성자에 매개변수로 주입하여 사용하였습니다.  `new Scanner(new Visitor)`

3. Model

마을과 우체통을 모두 하나의 모델로 보고 제어역전을 하기 위해 Model이라는 추상클래스를 만들었습니다. 모든 Model 클래스는 생성 시에  Model.objects라는 전역 셋에 자신을 넣습니다. 재귀를 실행하는 마을과 재귀를 실행하지 않는 우체통에 따라 render() 메서드를 다르게 구현하기 위해 템플릿 메소드 패턴을 사용하여 _render()라는 훅을 만들어 서로 다르게 상속하게 하였습니다. Town 클래스의 _render() 메서드는 제네레이터로, 외부의 this.render() 메소드에서 루프를 돈 결과물을 model.render()하도록 만들었습니다.

- Model에서 구현하지 못한 사항

Town이 상속받은 _render()에서 재귀적으로 다른 Model들을 자신의 자식으로 만들도록 루프를 돌았습니다. 랜덤한 숫자만큼 Model.objects 셋을 루프하면서 마을을 자식으로 만든다음 이를 render()메서드로 위임하여 각각 재귀적으로 render()를 실행하였습니다. 그런데 문제는, render()를 실행하면 재귀적으로 또다시 그 안에서 루프를 돌고 object.render()를 하기 때문에,나머지 for문이 루프를 돌기 전에  재귀함수가 항상 먼저 실행되는 blocking이 발생한다는 점입니다. 따라서 모든 마을이 하나의 자식만을 가지는 현상이 발생하고, 이를 해결하지 못해서 나머지 마을의 위치 계산이나 겹치지 않게하는 뷰 처리 문제등을 해결하지 못하였습니다.

4. 체크 버튼

버튼은 클래스로 만들어 클릭시 base 마을부터 탐색하여 우체통을 모두 출력하게 만들었습니다. 우체통의 정렬을 위한 함수로는 quicksort 함수를 가져와서 model.mailBox.size를 비교하게 하는 compare function을 인자로 받아 정렬하게 하였습니다. querySelector는 Scanner 클래스의 인스턴스로 만들어서 사용하였습니다.

따라서 저희 모델에서 최종적으로 사용하는 코드는 다음과 같습니다.

```jsx
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

리뷰어 분께 질문드리고 싶은 점은, Town 클래스의 재귀와 제네레이터 부분을 보시면 모든 Model들의 부모자식관계를 제네레이터로 설정한 다음 해당 모델을 상위 메서드에서 위임받아 다시 for of 루프에서 render()메서드를 재귀적으로 실행하게 하고 있습니다. 저희 생각에는 이 경우 render() 메서드의 재귀 스택이 우선 실행되어 나머지 for문이 실행되기 전에  자식을 넣는 함수 콜이 계속 시행되는 것이 문제라고 생각했습니다. (따라서 모든 자식이 for문이 돌기 전에 1개 밖에 생성되지 않는 문제 발생) 이 경우 이를 어떻게 해결할 수 있을지, 머리를 맞대도 고민을 해결하지 못해서 그것을 제외하고 PR을 보내 봅니다.

글을 두서없이 써서 요점만 정리하면 재귀함수가 for문 안에 실행되고 있는데 나머지 for문을 blocking하고 재귀함수가 우선 실행되는 바람에 마을의 자식이 하나씩밖에 생성되지 않습니다 ㅜㅜ. 혹시나 조언해주실 부분있으면 감사하겠습니다.