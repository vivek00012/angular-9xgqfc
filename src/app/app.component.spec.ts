import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', async() => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    //validate the rolls
    expect(component.rollRounds).toEqual(3);
    expect(component).toBeTruthy();
  });

  describe("OnRoll method test cases",async()=>{
  //on click on play and on round one start rolling the dice
  it('should roll all dice on round 1 and consume 1 out 3 chances', fakeAsync(() => {
    //ACT
    component.rollRounds = 3;
    component.dicesConfig.map(dice=>{
      dice.number =[]
      dice.isRolled=false
    })

    //ARRANGE
    component.onRoll();
    setTimeout(()=>{
      clearInterval(component.interval)
    },10000)
    tick(10000)


    //ASSERT
    expect(component.dicesConfig[1].number).not.toEqual([])
    expect(component.dicesConfig[1].number).not.toEqual([])
    expect(component.dicesConfig[2].number).not.toEqual([])
    expect(component.rollRounds).toEqual(2);
    expect(component.rolling).toBeTruthy();
  }));

  it('should roll 2nd and 3rd dice only on round 2 and consume 2 out 3 chances', fakeAsync(() => {
    //ACT
    component.rollRounds = 2;
    component.dicesConfig[0].number = null;
    component.dicesConfig[0].isRolled = true;

    //ARRANGE
    component.onRoll();
    setTimeout(()=>{
      clearInterval(component.interval)

    },10000)
    tick(10000);


    //ASSERT
    expect(component.dicesConfig[0].number).toBeNull();

    expect(component.dicesConfig[1].number).not.toEqual([])
    expect(component.dicesConfig[2].number).not.toEqual([])
    expect(component.rollRounds).toEqual(1);
    expect(component.rolling).toBeTruthy();
  }));


  it('should roll dice 3rd only on round 3 and consume 3 out 3 chances', fakeAsync(() => {
    //ACT
    component.rollRounds = 1;
    component.dicesConfig[0].number=new Array(2).fill(0);
    component.dicesConfig[1].number=new Array(4).fill(0);
    component.dicesConfig[2].number=[];
    component.dicesConfig[0].isRolled=true;
    component.dicesConfig[1].isRolled=true;

    //ARRANGE
    component.onRoll();

    setTimeout(()=>{
      clearInterval(component.interval)

    },10000)
    tick(10000);


    //ASSERT
    expect(component.dicesConfig[0].number).toEqual(new Array(2).fill(0))
    expect(component.dicesConfig[1].number).toEqual(new Array(4).fill(0))
    expect(component.rollRounds).toEqual(0);
  }));
})

describe("stopRolling method test cases",async()=>{
  it('should fix dice 1st only on round 1 and when dice 1 is clicked on round 1', fakeAsync(() => {
    //ACT
    component.rollRounds = 2;//remaining

    //ARRANGE
    component.stopRolling();

    tick(10000);


    //ASSERT
    expect(component.dicesConfig[0].isRolled).toBeTruthy();
    expect(component.dicesConfig[1].isRolled).toBeFalse();
    expect(component.dicesConfig[2].isRolled).toBeFalse();
  }));

  it('should fix dice 1st and 2nd only', fakeAsync(() => {
    //ACT
    component.rollRounds = 1;//remaining
    component.dicesConfig[0].isRolled = true;

    //ARRANGE
    component.stopRolling();

    tick(10000);


    //ASSERT
    expect(component.dicesConfig[0].isRolled).toBeTruthy();
    expect(component.dicesConfig[1].isRolled).toBeTruthy();
    expect(component.dicesConfig[2].isRolled).toBeFalse();
  }));

  it('should fix all devices only', fakeAsync(() => {
    //ACT
    component.rollRounds = 1;
    component.dicesConfig[0].isRolled=true;
    component.dicesConfig[1].isRolled=true;

    //ARRANGE
    component.onRoll();

    setTimeout(()=>{
      clearInterval(component.interval)

    },10000)
    tick(10000);


    //ASSERT
    expect(component.dicesConfig[0].isRolled).toBeTruthy();
    expect(component.dicesConfig[1].isRolled).toBeTruthy();
    expect(component.dicesConfig[1].isRolled).toBeTruthy();

  }));

});

it('should set all the same number to 3 dices if 2nd and 3rd dice has same no on remaining rounds', fakeAsync(() => {
  //ACT
  component.rollRounds = 1;
  component.dicesConfig[0].isRolled=true;
  component.dicesConfig[1].number = new Array(3).fill(0);
  component.dicesConfig[0].number=new Array(3).fill(0);

  //ARRANGE
  component.stopRolling();

  tick(10000);

  //ASSERT
  expect(component.dicesConfig[0].number).toEqual(new Array(3).fill(0));
  expect(component.dicesConfig[1].number).toEqual(new Array(3).fill(0));
  expect(component.dicesConfig[2].number).toEqual(new Array(3).fill(0));

}));
});