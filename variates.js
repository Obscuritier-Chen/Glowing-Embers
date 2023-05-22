//producing
var popSpeed=1000,proSpeed=2000,eventSpeed=5000;
var population=0,popLimit=20,lastWorker=3;
var production={product1Num:0,product2Num:20,product3Num:20,jobless:0};
var building={building1:false,building2:false};
var elementBtnAdd={worker1:document.getElementById('btn1ProAdd'),
				   worker2:'xzx',
				   worker3:'xzx'};
var elementBtnSub={worker1:document.getElementById('btn1ProSub'),
				   worker2:'xzx',
				   worker3:'xzx'};
var elementPro={product1Num:document.getElementById('product1s'),//在字典里就获取element,但此时body未加载
				product2Num:document.getElementById('product2s'),
				product3Num:document.getElementById('product3s'),
			 	jobless:document.getElementById('jobless')};
var worker={worker1:0,worker2:0,worker3:0};
var elementWorkNum={worker1:document.getElementById('worker1'),
				    worker2:'xzx',
				    worker3:'xzx'};//有xzx的都是之后创建的元素，需要创建时赋值
var bld2Num={building1:2,
			 building2:3};
var num2WkrName={building1:'worker2Num',
			 	building2:'worker3Num'};
var workersTable={// 注意此变量的一级下标worker1,worker2等等必须与worker完全相同
	worker1:{//二级下标product1Num,product2Num等等必须与production完全相同
		product1Num:5,
		product2Num:0,
		product3Num:0
	},
	worker2:{
		product1Num:0,
		product2Num:2,
		product3Num:0
	},
	worker3:{
		product1Num:0,
		product2Num:-1,
		product3Num:2
	}
};
var buildingsTable={
	building1:{
		product1Num:0,
		product2Num:5,
		product3Num:0
	},
	building2:{
		product1Num:0,
		product2Num:1,
		product3Num:5
	}
};
//---------------------------------------
//events
var randomEventsPr={event1:10,	
                    event2:10,
                    event3:10};
var randomEventsAttribute={
    event1:
    {//事件标题 内容 类型
        title:'event1',
        content:'population-5',
        type:1
    },
    event2:
    {
        title:'event2',
        content:'product1+5',
        type:1
    },
    event3:
    {
        title:'event3',
        content:'test3',
        type:2
    }
};
var eventsBuff={//事件发生概率加权，0.01为单位
                event1:0,
                event2:0,
                event3:0};
var buffsContent={
				 buff1:'buff1',
				 buff2:'buff2'
}
var eventsBuffsEffect={//改变事件发生概率的buff的效果
	buff1:
	{
		eventNum:'event1',
		effect:10
	},
	buff2:
	{
		eventNum:'event2',
		effect:20
	}
}
