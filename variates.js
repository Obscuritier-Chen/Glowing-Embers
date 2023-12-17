var gameType=0;//教程或是正常游玩
var funcCondition={//有时需要禁用函数
	newBuilding: true
}
//producing
var popSpeed=1000,proSpeed=2000,eventSpeed=5000;
var popUpdating;
var population=3,popLimit=20,popVariationEff=100,popDecreaseEff=100;
var production={product1Num:1000,product2Num:10,product3Num:0,product4Num:0,jobless:0};
var productionZh={
	product1Num:'产品1',
	product2Num:'产品2',
	product3Num:'产品3',
	product4Num:'产品4',
}
var specialResident={//特殊人口
	researcherLv1:2,
	researcherLv2:0,
	researcherLv3:1,
	warrior:0,
	craftman:0,
}
var proDisplay={product1Num:1,product2Num:1,product3Num:0,product4Num:0};
var popNeed={product1Num:-0.1,product2Num:0,product3Num:0,product4Num:0};
var elementBtnAdd={worker1:document.getElementById('btn1ProAdd'),
				   worker2:'xzx',
				   worker3:'xzx'};
var elementBtnSub={worker1:document.getElementById('btn1ProSub'),
				   worker2:'xzx',
				   worker3:'xzx'};
var elementPro={product1Num:document.getElementById('product1Num'),//在字典里就获取element,但此时body未加载
				product2Num:document.getElementById('product2Num'),
				product3Num:'xzx',
				product4Num:'xzx',
			 	jobless:document.getElementById('jobless')};
var worker={worker1:0,worker2:0,worker3:0,builder:0};
var actualWrkNum={worker1:0,worker2:0,worker3:0};
var workingBuilder=0;
var workerEfficient={builder:100,worker1:100,worker2:100,worker3:100};//产出加权
var produceResult={product1Num:0,product2Num:0,product3Num:0,product4Num:0}
var elementWorkNum={builder:document.getElementById('builder'),
					worker1:document.getElementById('worker1'),
				    worker2:'xzx',
				    worker3:'xzx'};//有xzx的都是之后创建的元素，需要创建时赋值
var bld2Num={building1:'worker2',
			 building2:'worker3'};
var num2WkrName={building1:'worker2Num',
			 	building2:'worker3Num'};
var workerZh={
	builder:'建筑工人',
	worker1:'拾荒者',
	worker2:'工人2',
	worker3:'工人3'
}
var workerContent={//介绍
	builder:'建造建筑',
	worker1:'在林子里翻翻找找',
	worker2:'工人2',
	worker3:'工人3'
}
var workersTable={// 注意此变量的一级下标worker1,worker2等等必须与worker完全相同
	builder:{//二级下标product1Num,product2Num等等必须与production完全相同
		product1Num:0,
		product2Num:0,
		product3Num:0,
		product4Num:0
	},
	worker1:{
		product1Num:2,
		product2Num:1,
		product3Num:0,
		product4Num:0
	},
	worker2:{
		product1Num:0,
		product2Num:0,
		product3Num:0,
		product4Num:0
	},
	worker3:{
		product1Num:0,
		product2Num:0,
		product3Num:0,
		product4Num:0
	}
};
var buildingAttribute={
	house:{
		name:'房屋',
		type:1,
		display:1,
		num:0,
		need:{
			product2Num:5,
			},
		preResearch:null,
		preBuilding:[],
		builderNeed:1,
		limit:-1,
		time:10,
		text:'increasePopLimittestetstetstestetstest',
		consume:null,
		condition:0
	},
	building1:{
		name:'建筑1',
		type:2,
		display:0,
		num:0,
		need:{},
		preResearch:null,
		preBuilding:['building4'],
		builderNeed:1,
		limit:1,
		time:5,
		text:'forWorker2',
		consume:null,
		condition:0
	},
	building2:{
		name:'建筑2',
		type:2,
		display:0,
		num:0,
		need:{
			product2Num:1,
			},
		preResearch:['research2'],
		preBuilding:[],
		builderNeed:0,
		limit:1,
		time:30,
		text:'forWorker3',
		consume:null,
		condition:0
	},
	building3:{
		name:'建筑3',
		type:2,
		display:0,
		num:0,
		need:{
			product2Num:1,
			},
		preResearch:['research2'],
		preBuilding:[],
		builderNeed:1,
		limit:1,
		time:30,
		text:'forWorker4',
		consume:null,
		condition:0
	},
	building4:{
		name:'火堆',
		type:4,
		display:1,
		num:0,
		need:{
			product2Num:1,
			},
		preResearch:null,
		preBuilding:[],
		builderNeed:0,
		limit:1,
		time:5,
		text:'forpopIncrement',
		consume:{
			product1Num:-1
		},
		condition:0
	},
	building5:{
		name:'建筑5',
		type:5,
		display:0,
		num:0,
		need:{},
		preResearch:null,
		preBuilding:[],
		builderNeed:0,
		limit:1,
		time:5,
		text:'craftBuildingTest',
		consume:null,
		condition:0,
	}
}
var popDecrementAttribute={
	dcr1:{
		name:'dcr1',
		times:3,
		cnt:[0,1,2,3]
	},
	dcr2:{
		name:'dcr2',
		times:5,
		cnt:[0,0.3,0.3,0.2,0.1,0.1]//记得数组第一个下标为0
	},
	dcr3:{
		name:'dcr3',
		times:-1,
		cnt:0.2
	}
}
//------------------------------------------------------------------------
//events
var eventChainQueue=[];
var eventNameChainQueue=[];
var cTypePr={//content type即天气 营地内部事件 新人事件 外部事件等
	none:50,//没有事件也是事件
	type1:100,
	type2:100,
	type3:100
}
var randomEventList={//这里是cType
	type1:[null,'event1','event2'],
	type2:[null,'event3','event4'],
	type3:[null,'event5']
}
var eventsAttribute={
    event1:
    {//事件标题 内容 类型
        title:'event1',
        content:'population-5',
        fType:1,//form type 即confirm/selective/trade
		cType:'type1',
		probability:100,
		available:1,
		displayed:0,
		preEvent:null
    },
    event2:
    {
        title:'event2',
        content:'product1+5',
        fType:1,
		cType:'type1',
		probability:100,
		available:1,
		displayed:0,
		preEvent:null
    },
    event3:
    {
        title:'event3',
        content:'test3',
        fType:2,
		button:
		{
			btn1:'button1',
			btn2:'button2'
		},
		cType:'type2',
		probability:100,
		available:1,
		displayed:0,
		preEvent:null
    },
	event4:
    {
        title:'event4',
        content:'test4',
        fType:2,
		button:
		{
			btn1:'button1',
			btn2:'button2',
			btn3:'button3'
		},
		cType:'type2',
		probability:100,
		available:1,
		displayed:0,
		preEvent:null
    },
	event5:
	{
		title:'event5',
		content:'tradement',
		fType:3,
		cType:'type3',
		probability:100,
		available:1,
		displayed:0,
		preEvent:null
	},
	event6:
	{
		title:'event6',
		content:'test6',
		fType:1,
		cType:'type1',
		probability:1000,
		available:0,
		displayed:0,
		preEvent:['event1']
	},
	lackProduct1:
	{
		title:'lackProduct1',
		content:'the lack of product1 lead to pop decrease',
		displayed:0,
		fType:1,
	},
	chainEvent1:
	{
		title:'chainEvent1:',
		content:'chainEvent1:',
		displayed:0,
		fType:1,
	},
	chainEvent1_1:
	{
		title:'chainEvent1_1:',
		content:'chainEvent1_1:',
		displayed:0,
		fType:1,
	},
	chainEvent1_2:
	{
		title:'chainEvent1_2:',
		content:'chainEvent1_2:',
		displayed:0,
		fType:1,
	},
	chainEvent1_1_1:
	{
		title:'chainEvent1_1_1:',
		content:'chainEvent1_1_1:',
		displayed:0,
		fType:1,
	},
	chainEvent1_1_2:
	{
		title:'chainEvent1_1_2:',
		content:'chainEvent1_1_2:',
		displayed:0,
		fType:1,
	},
	chainEvent1_2_1:
	{
		title:'chainEvent1_2_1:',
		content:'chainEvent1_2_1:',
		displayed:0,
		fType:1,
	},
	chainEvent2:
	{
		title:'chainEvent2:',
		content:'chainEvent2:',
		displayed:0,
		fType:1,
	}
};
var eventResult={//fType=1/2的时间结果储存在这里
	event1:
	{
		product:{},
		item:{},
		buff:{},//-1删除buff 0disable buff 1创建/able buff
		population:0,
		spResident:
		{
			researcherLv1:1,
			researcherLv3:-1
		}
	},
	event2:
	{
		product:
		{
			product1Num:10
		},
		buff:{},
		population:0,
		spResident:{}
	},
	event3:
	{
		btn1:
		{
			product:{product1Num:10},
			buff:{},
			population:0,
			spResident:{}
		},
		btn2:
		{
			product:{},
			buff:{},
			population:0,
			spResident:{}
		}
	},
	event4:
	{
		btn1:
		{
			product:{},
			buff:{},
			population:0,
			spResident:{}
		},
		btn2:
		{
			product:{},
			buff:{},
			population:0,
			spResident:{}
		},
		btn3:
		{
			product:{},
			buff:{},
			population:0,
			spResident:{}
		},
	},
	event6:
	{
		product:{},
		buff:{},
		population:0,
		spResident:{}
	},
	lackProduct1:
	{
		product:{},
		buff:{},
		population:0,
		spResident:{}
	},
	chainEvent1:
	{
		product:{},
		buff:{},
		population:0,
		spResident:{}
	},
	chainEvent1_1:
	{
		product:{},
		buff:{},
		population:0,
		spResident:{}
	},
	chainEvent1_1_1:
	{
		product:{},
		buff:{},
		population:0,
		spResident:{}
	},
	chainEvent1_1_2:
	{
		product:{},
		buff:{},
		population:0,
		spResident:{}
	},
	chainEvent1_2:
	{
		product:{},
		buff:{},
		population:0,
		spResident:{}
	},
	chainEvent1_2_1:
	{
		product:{},
		buff:{},
		population:0,
		spResident:{}
	},
	chainEvent2:
	{
		product:{},
		buff:{},
		population:0,
		spResident:{}
	}
}
var eventCondition={//事件条件
	chainEvent1:
	{
		preEvent:[],
		minProduct:null,
		preBuilding:[],
		minWorker:null,
		minPop:0,
		preBuff:[]
	},
	chainEvent1_1:
	{
		preEvent:[],
		minProduct:null,
		preBuilding:[],
		minWorker:null,
		minPop:0,
		preBuff:[]
	},
	chainEvent1_1_1:
	{
		preEvent:[],
		minProduct:null,
		preBuilding:[],
		minWorker:null,
		minPop:0,
		preBuff:[]
	},
	chainEvent1_1_2:
	{
		preEvent:[],
		minProduct:null,
		preBuilding:[],
		minWorker:null,
		minPop:0,
		preBuff:[]
	},
	chainEvent1_2:
	{
		preEvent:[],
		minProduct:null,
		preBuilding:[],
		minWorker:null,
		minPop:0,
		preBuff:[]
	},
	chainEvent1_2_1:
	{
		preEvent:[],
		minProduct:null,
		preBuilding:[],
		minWorker:null,
		minPop:0,
		preBuff:[]
	},
	chainEvent2:
	{
		preEvent:[],
		minProduct:null,
		preBuilding:[],
		minWorker:null,
		minPop:0,
		preBuff:[]
	}
}
var eventTree={//{事件链名/一级事件}_{二级事件编号}_......
	chainEvent1:
	{
		chainEvent1_1:
		{
			chainEvent1_1_1:null,
			chainEvent1_1_2:null
		},
		chainEvent1_2:
		{
			chainEvent1_2_1:null
		}
	},
	chainEvent2:null
}
var tradeEventWare={
	event5:
	{
		ware1:
		{
			name:'商品1',
			content:
			{
				type:1,
				productName:'product1Num',
				num:10
			},
			cost:
			{
				product1Num:1,
				product2Num:1
			}
		},
		ware2:
		{
			name:'商品2',
			content:
			{
				type:2,
				itemName:'item1',
				num:1
			},
			cost:
			{
				product1Num:1
			}
		},
		ware3:
		{
			name:'商品3',
			content:{},
			cost:{}
		}
	}
}
var eventsBuff={//事件发生概率加权，0.01为单位
                event1:0,
                event2:0,
                event3:0};
var buffAttribute={
	buff1:
	{
		type:'event',
		name:'加成1',
		content:'event1 pos decrease',
		eventList:{
			event1:-100,
			event2:100
		},
		typeList:{},
		duration:-1,
		condition:0,
		working:0
	},
	buff2:
	{
		type:'event',
		name:'加成2',
		content:'event2 pos increase',
		eventList:{},
		typeList:{
			type1:50
		},
		duration:-1,
		condition:0,
		working:0
	},
	buff3:
	{
		type:'produce',
		name:'加成3',
		content:'increase wrk1 efficient',
		workerName:
		{
			worker1: 100,
			worker2: 100
		},
		duration:-1,
		condition:0,
		working:0
	},
	buff4:
	{
		type:'produce',
		name:'加成4',
		content:'decrease wrk3 efficient',
		workerName:{all:100,worker1:-50},
		effect:-100,
		duration:5,
		condition:0,
		working:0
	},
	buff5:
	{
		type:'population',
		name:'加成5',
		content:'decrease popIncrease speed',
		effect:-50,
		duration:-1,
		condition:0,
		working:0
	},
	buff7:
	{
		type:'population',
		name:'加成7',
		content:'popdecrease',
		effect:-400,
		duration:-1,
		condition:0,
		working:0
	},
	buff8:
	{
		type:'population',
		name:'加成8',
		content:'popincrease',
		effect:20,//>100是增加效率 <100降低效率
		duration:-1,
		condition:0,
		working:0
	},
}
var infoPopupAttribute={
	info1:
	{
		type:'normal',
		title:'alert',
		content:'There is no food'
	},
	info2:
	{
		type:'normal',
		title:'alert',
		content:'product2 is not enough'
	},
	info3:
	{
		type:'normal',
		title:'info3',
		content:'popIncrease begin'
	},
	courseInfo1:
	{
		type:'course',
		title:'courseInfo1',
		content:'the game is started'
	},
	courseInfo2:
	{
		type:'course',
		title:'courseInfo2',
		content:'this is the inhabited land condition'
	},
	courseInfo3:
	{
		type:'course',
		title:'courseInfo3',
		content:'我们需要更多的人口建设聚居地，现在建造一个火堆以吸引流民'
	},
	courseInfo4:
	{
		type:'course',
		title:'courseInfo4',
		content:'3 people come'
	},
	courseInfo5:
	{
		type:'course',
		title:'courseInfo5',
		content:'外来者需要住所 建造一个房屋以增加popLimit'
	},
	courseInfo6:
	{
		type:'course',
		title:'courseInfo6',
		content:'给无业者分配人口以进行生产 我们需要生产食物'
	},
	courseInfo7:
	{
		type:'course',
		title:'courseInfo7',
		content:'必须生产更多木材，建造一个伐木工小屋'
	},
	plot1:
	{
		type:'course',
		title:'the beginning',
		content:'灾难...... 幸存者聚集在了这里'
	}
}
//------------------------------------------------------------------------
//research
var researchProject={
	research1:
	{
		name:'研究1',
		type:'science',
		time:10,
		pre:null,//前置
		display:1,
		condition:0,//是否完成
		text:'research1',
		consume:null,
		unlock:['research2','research3']//可解锁
	},
	research2:
	{
		name:'研究2',
		type:'engineering',
		time:10,
		pre:['research1'],
		display:0,
		condition:0,
		text:'research2',
		consume:
		{
			product2Num:5
		},
		unlock:['research4']
	},
	research3:
	{
		name:'研究3',
		type:'sociology',
		time:10,
		pre:['research1'],
		display:0,
		condition:0,
		text:'research3',
		consume:null,
		unlock:['research4']
	},
	research4:
	{
		name:'研究4',
		type:'engineering',
		time:1000,
		pre:['research2','research3'],
		display:0,
		condition:0,
		text:'research4',
		consume:null,
		unlock:null
	}
}
var researchSpeed={
	researcherLv1:1,
	researcherLv2:3,
	researcherLv3:5
}
var scienceAttribute={
	condition:0,
	researcherLv1:0,
	researcherLv2:0,
	researcherLv3:0
}
var engineeringAttribute={
	condition:0,
	researcherLv1:0,
	researcherLv2:0,
	researcherLv3:0
}
var sociologyAttribute={
	condition:0,
	researcherLv1:0,
	researcherLv2:0,
	researcherLv3:0
}
var freeResearcher={
	researcherLv1:2,
	researcherLv2:0,
	researcherLv3:1
}
var researchDisplayQueue=[];
//------------------------------------------------------------------------
//item
var itemAttribute={
	item1:
	{
		name:'物品1',
		text:'物品1',
		num:0,
		craftBuilding:'simple',
		craftCond:1,//condition
		preResearch:[],
		need:
		{
			product1Num:20
		},
		time:5
	},
	item2:
	{
		name:'物品2',
		text:'物品2',
		num:0,
		craftBuilding:'simple',
		craftCond:1,
		preResearch:[],
		need:
		{
			product1Num:10
		},
		time:-1
	},
	item3:
	{
		name:'物品3',
		text:'物品3',
		num:0,
		craftBuilding:'building5',
		craftCond:0,
		preResearch:[],
		need:{},
		time:-1
	},
	item4:
	{
		name:'物品4',
		text:'物品4',
		num:0,
		craftBuilding:'building5',
		craftCond:0,
		preResearch:['research1'],
		need:{},
		time:-1
	}
}